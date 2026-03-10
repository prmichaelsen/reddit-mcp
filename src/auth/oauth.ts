import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname } from "node:path";
import type { RedditAuthConfig, TokenData } from "../types/index.js";

export class RedditAuth {
  private config: RedditAuthConfig;
  private tokenData: TokenData | null = null;

  constructor(config: RedditAuthConfig) {
    this.config = config;
  }

  getAuthUrl(scopes: string[]): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: "code",
      state: crypto.randomUUID(),
      redirect_uri: this.config.redirectUri,
      duration: "permanent",
      scope: scopes.join(" "),
    });
    return `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<TokenData> {
    const response = await fetch(
      "https://www.reddit.com/api/v1/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString("base64")}`,
          "User-Agent": this.config.userAgent,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: this.config.redirectUri,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Token exchange failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as Record<string, unknown>;

    if (data.error) {
      throw new Error(`Token exchange error: ${data.error}`);
    }

    this.tokenData = {
      access_token: data.access_token as string,
      refresh_token: data.refresh_token as string,
      token_type: data.token_type as string,
      expires_in: data.expires_in as number,
      scope: data.scope as string,
      obtained_at: Date.now(),
    };

    await this.storeTokens();
    return this.tokenData;
  }

  async getAccessToken(): Promise<string> {
    if (!this.tokenData) {
      await this.loadStoredTokens();
    }

    if (!this.tokenData) {
      throw new Error(
        "No credentials available. Run OAuth authorization flow first.",
      );
    }

    // Refresh if token expires within 5 minutes
    const expiresAt =
      this.tokenData.obtained_at + this.tokenData.expires_in * 1000;
    const fiveMinutes = 5 * 60 * 1000;

    if (Date.now() > expiresAt - fiveMinutes) {
      await this.refreshToken();
    }

    return this.tokenData.access_token;
  }

  hasStoredCredentials(): boolean {
    const storagePath =
      this.config.tokenStoragePath || "./.tokens/reddit.json";
    return existsSync(storagePath);
  }

  private async refreshToken(): Promise<void> {
    if (!this.tokenData?.refresh_token) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(
      "https://www.reddit.com/api/v1/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString("base64")}`,
          "User-Agent": this.config.userAgent,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: this.tokenData.refresh_token,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Token refresh failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as Record<string, unknown>;

    if (data.error) {
      throw new Error(`Token refresh error: ${data.error}`);
    }

    this.tokenData = {
      access_token: data.access_token as string,
      refresh_token:
        (data.refresh_token as string) || this.tokenData.refresh_token,
      token_type: data.token_type as string,
      expires_in: data.expires_in as number,
      scope: data.scope as string,
      obtained_at: Date.now(),
    };

    await this.storeTokens();
  }

  private async storeTokens(): Promise<void> {
    if (!this.tokenData) return;

    const storagePath =
      this.config.tokenStoragePath || "./.tokens/reddit.json";
    const dir = dirname(storagePath);

    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    await writeFile(storagePath, JSON.stringify(this.tokenData, null, 2), {
      mode: 0o600,
    });
  }

  private async loadStoredTokens(): Promise<void> {
    const storagePath =
      this.config.tokenStoragePath || "./.tokens/reddit.json";

    if (!existsSync(storagePath)) return;

    try {
      const content = await readFile(storagePath, "utf-8");
      this.tokenData = JSON.parse(content) as TokenData;
    } catch {
      // Corrupted token file, ignore
      this.tokenData = null;
    }
  }
}

export function createAuthFromEnv(): RedditAuth {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const redirectUri =
    process.env.REDDIT_REDIRECT_URI || "http://localhost:8080/callback";
  const userAgent =
    process.env.REDDIT_USER_AGENT ||
    "nodejs:reddit-mcp:v0.1.0 (by /u/unknown)";
  const tokenStoragePath =
    process.env.TOKEN_STORAGE_PATH || "./.tokens/reddit.json";

  if (!clientId || !clientSecret) {
    throw new Error(
      "REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET environment variables are required",
    );
  }

  return new RedditAuth({
    clientId,
    clientSecret,
    redirectUri,
    userAgent,
    tokenStoragePath,
  });
}
