import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { RedditAuth, createAuthFromEnv } from "../../src/auth/oauth.js";

describe("RedditAuth", () => {
  const config = {
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    redirectUri: "http://localhost:8080/callback",
    userAgent: "test:reddit-mcp:v0.1.0 (by /u/test)",
    tokenStoragePath: "/tmp/test-reddit-tokens.json",
  };

  describe("constructor", () => {
    it("creates an instance with config", () => {
      const auth = new RedditAuth(config);
      expect(auth).toBeInstanceOf(RedditAuth);
    });
  });

  describe("getAuthUrl", () => {
    it("generates authorization URL with scopes", () => {
      const auth = new RedditAuth(config);
      const url = auth.getAuthUrl(["read", "submit", "vote"]);

      expect(url).toContain("https://www.reddit.com/api/v1/authorize");
      expect(url).toContain("client_id=test-client-id");
      expect(url).toContain("response_type=code");
      expect(url).toContain("duration=permanent");
      expect(url).toContain("scope=read+submit+vote");
      expect(url).toContain("redirect_uri=");
      expect(url).toContain("state=");
    });

    it("generates URL with single scope", () => {
      const auth = new RedditAuth(config);
      const url = auth.getAuthUrl(["identity"]);
      expect(url).toContain("scope=identity");
    });
  });

  describe("hasStoredCredentials", () => {
    it("returns false when no token file exists", () => {
      const auth = new RedditAuth({
        ...config,
        tokenStoragePath: "/tmp/nonexistent-token-file.json",
      });
      expect(auth.hasStoredCredentials()).toBe(false);
    });
  });

  describe("getAccessToken", () => {
    it("throws when no credentials available", async () => {
      const auth = new RedditAuth({
        ...config,
        tokenStoragePath: "/tmp/nonexistent-token-file.json",
      });
      await expect(auth.getAccessToken()).rejects.toThrow(
        "No credentials available",
      );
    });
  });
});

describe("createAuthFromEnv", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("throws when REDDIT_CLIENT_ID is missing", () => {
    delete process.env.REDDIT_CLIENT_ID;
    delete process.env.REDDIT_CLIENT_SECRET;
    expect(() => createAuthFromEnv()).toThrow(
      "REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET environment variables are required",
    );
  });

  it("creates auth from environment variables", () => {
    process.env.REDDIT_CLIENT_ID = "env-client-id";
    process.env.REDDIT_CLIENT_SECRET = "env-client-secret";
    const auth = createAuthFromEnv();
    expect(auth).toBeInstanceOf(RedditAuth);
  });
});
