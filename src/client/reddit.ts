import type { RedditAuth } from "../auth/oauth.js";
import type { RateLimitInfo } from "../types/index.js";

export class RedditApiError extends Error {
  constructor(
    public status: number,
    public reason: string,
    message: string,
  ) {
    super(message);
    this.name = "RedditApiError";
  }
}

export class RedditClient {
  private auth: RedditAuth | null;
  private accessToken: string | null;
  private userAgent: string;
  private rateLimitInfo: RateLimitInfo | null = null;

  constructor(auth: RedditAuth | string, userAgent?: string) {
    if (typeof auth === "string") {
      this.auth = null;
      this.accessToken = auth;
    } else {
      this.auth = auth;
      this.accessToken = null;
    }
    this.userAgent =
      userAgent ||
      process.env.REDDIT_USER_AGENT ||
      "nodejs:reddit-mcp:v0.1.0 (by /u/unknown)";
  }

  async get<T>(
    path: string,
    params?: Record<string, string | undefined>,
  ): Promise<T> {
    return this.request<T>("GET", path, params);
  }

  async post<T>(
    path: string,
    body?: Record<string, string | undefined>,
  ): Promise<T> {
    return this.request<T>("POST", path, undefined, body);
  }

  async patch<T>(
    path: string,
    body?: Record<string, unknown>,
  ): Promise<T> {
    return this.requestJson<T>("PATCH", path, body);
  }

  async put<T>(
    path: string,
    body?: Record<string, unknown>,
  ): Promise<T> {
    return this.requestJson<T>("PUT", path, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }

  getRateLimitInfo(): RateLimitInfo | null {
    return this.rateLimitInfo;
  }

  private async getToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;
    if (this.auth) return this.auth.getAccessToken();
    throw new Error("No authentication configured");
  }

  private async request<T>(
    method: string,
    path: string,
    params?: Record<string, string | undefined>,
    body?: Record<string, string | undefined>,
  ): Promise<T> {
    return this.executeWithRetry<T>(async () => {
      const token = await this.getToken();
      let url = `https://oauth.reddit.com${path}`;

      if (params) {
        const filtered = Object.entries(params).filter(
          ([, v]) => v !== undefined,
        ) as [string, string][];
        if (filtered.length > 0) {
          url += `?${new URLSearchParams(filtered).toString()}`;
        }
      }

      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        "User-Agent": this.userAgent,
      };

      const init: RequestInit = { method, headers };

      if (body) {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        const filtered = Object.entries(body).filter(
          ([, v]) => v !== undefined,
        ) as [string, string][];
        init.body = new URLSearchParams(filtered).toString();
      }

      const response = await fetch(url, init);
      this.parseRateLimitHeaders(response);

      if (!response.ok) {
        throw await this.createError(response);
      }

      return (await response.json()) as T;
    });
  }

  private async requestJson<T>(
    method: string,
    path: string,
    body?: Record<string, unknown>,
  ): Promise<T> {
    return this.executeWithRetry<T>(async () => {
      const token = await this.getToken();
      const url = `https://oauth.reddit.com${path}`;

      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        "User-Agent": this.userAgent,
        "Content-Type": "application/json",
      };

      const init: RequestInit = { method, headers };
      if (body) {
        init.body = JSON.stringify(body);
      }

      const response = await fetch(url, init);
      this.parseRateLimitHeaders(response);

      if (!response.ok) {
        throw await this.createError(response);
      }

      return (await response.json()) as T;
    });
  }

  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        if (error instanceof RedditApiError) {
          // Don't retry client errors (except 429)
          if (error.status < 500 && error.status !== 429) {
            throw error;
          }

          // For 429, wait for rate limit reset
          if (error.status === 429 && this.rateLimitInfo) {
            const waitMs = this.rateLimitInfo.resetSeconds * 1000;
            await this.delay(Math.min(waitMs, 30000));
            continue;
          }
        }

        if (attempt < maxRetries) {
          // Exponential backoff: 1s, 2s, 4s
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }

    throw lastError!;
  }

  private parseRateLimitHeaders(response: Response): void {
    const remaining = response.headers.get("x-ratelimit-remaining");
    const used = response.headers.get("x-ratelimit-used");
    const reset = response.headers.get("x-ratelimit-reset");

    if (remaining !== null || used !== null || reset !== null) {
      this.rateLimitInfo = {
        remaining: remaining ? parseFloat(remaining) : 0,
        used: used ? parseInt(used, 10) : 0,
        resetSeconds: reset ? parseInt(reset, 10) : 0,
      };
    }
  }

  private async createError(response: Response): Promise<RedditApiError> {
    let reason = "unknown";
    let message = `Reddit API error: ${response.status} ${response.statusText}`;

    try {
      const body = (await response.json()) as Record<string, unknown>;
      if (body.error) reason = String(body.error);
      if (body.message) message = String(body.message);
      if (body.reason) reason = String(body.reason);
    } catch {
      // Response body not JSON
    }

    switch (response.status) {
      case 400:
        message = `Bad request: ${reason}`;
        break;
      case 401:
        message =
          "Unauthorized: Access token expired or invalid. Re-authenticate.";
        break;
      case 403:
        message = `Forbidden: Missing required OAuth scope or banned. ${reason}`;
        break;
      case 404:
        message = "Not found: The requested resource does not exist.";
        break;
      case 429:
        message = `Rate limited: Too many requests. Reset in ${this.rateLimitInfo?.resetSeconds ?? "unknown"}s.`;
        break;
      default:
        if (response.status >= 500) {
          message = `Reddit server error (${response.status}): Try again later.`;
        }
    }

    return new RedditApiError(response.status, reason, message);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
