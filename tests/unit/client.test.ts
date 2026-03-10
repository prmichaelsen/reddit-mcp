import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { RedditClient, RedditApiError } from "../../src/client/reddit.js";

// Mock global fetch
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe("RedditClient", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("constructor", () => {
    it("accepts a raw access token", () => {
      const client = new RedditClient("test-token");
      expect(client).toBeInstanceOf(RedditClient);
    });
  });

  describe("get", () => {
    it("makes GET request with auth header", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: "test" }),
        headers: new Headers(),
      });

      const client = new RedditClient("test-token");
      const result = await client.get("/test");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://oauth.reddit.com/test",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            Authorization: "Bearer test-token",
          }),
        }),
      );
      expect(result).toEqual({ data: "test" });
    });

    it("appends query parameters", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
        headers: new Headers(),
      });

      const client = new RedditClient("test-token");
      await client.get("/test", { limit: "25", after: "t3_abc" });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("limit=25"),
        expect.anything(),
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("after=t3_abc"),
        expect.anything(),
      );
    });

    it("filters undefined params", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
        headers: new Headers(),
      });

      const client = new RedditClient("test-token");
      await client.get("/test", { limit: "25", after: undefined });

      const calledUrl = mockFetch.mock.calls[0][0] as string;
      expect(calledUrl).toContain("limit=25");
      expect(calledUrl).not.toContain("after");
    });
  });

  describe("post", () => {
    it("makes POST request with form body", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
        headers: new Headers(),
      });

      const client = new RedditClient("test-token");
      await client.post("/api/vote", { id: "t3_abc", dir: "1" });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://oauth.reddit.com/api/vote",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("id=t3_abc"),
        }),
      );
    });
  });

  describe("error handling", () => {
    it("throws RedditApiError on 401", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        json: async () => ({ error: 401, message: "Unauthorized" }),
        headers: new Headers(),
      });

      const client = new RedditClient("bad-token");
      await expect(client.get("/test")).rejects.toThrow(RedditApiError);
    });

    it("throws RedditApiError on 403", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: "Forbidden",
        json: async () => ({ error: 403, message: "Forbidden", reason: "private" }),
        headers: new Headers(),
      });

      const client = new RedditClient("test-token");
      await expect(client.get("/test")).rejects.toThrow(RedditApiError);
    });

    it("throws RedditApiError on 404", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
        json: async () => ({}),
        headers: new Headers(),
      });

      const client = new RedditClient("test-token");
      await expect(client.get("/test")).rejects.toThrow("Not found");
    });

    it("throws RedditApiError on 429 rate limit", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        statusText: "Too Many Requests",
        json: async () => ({ error: 429 }),
        headers: new Headers({
          "x-ratelimit-remaining": "0",
          "x-ratelimit-reset": "1",
          "x-ratelimit-used": "100",
        }),
      });

      const client = new RedditClient("test-token");
      await expect(client.get("/test")).rejects.toThrow("Rate limited");
    });
  });

  describe("rate limit parsing", () => {
    it("parses rate limit headers", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
        headers: new Headers({
          "x-ratelimit-remaining": "95.5",
          "x-ratelimit-used": "5",
          "x-ratelimit-reset": "300",
        }),
      });

      const client = new RedditClient("test-token");
      await client.get("/test");

      const info = client.getRateLimitInfo();
      expect(info).toEqual({
        remaining: 95.5,
        used: 5,
        resetSeconds: 300,
      });
    });
  });

  describe("retry logic", () => {
    it("retries on 5xx errors", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
          json: async () => ({}),
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ recovered: true }),
          headers: new Headers(),
        });

      const client = new RedditClient("test-token");
      const result = await client.get("/test");
      expect(result).toEqual({ recovered: true });
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("does not retry on 400 errors", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        json: async () => ({ error: "bad_request" }),
        headers: new Headers(),
      });

      const client = new RedditClient("test-token");
      await expect(client.get("/test")).rejects.toThrow(RedditApiError);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });
});
