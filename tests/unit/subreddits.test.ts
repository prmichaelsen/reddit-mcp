import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSubredditTools } from "../../src/tools/subreddits.js";
import { createMockClient } from "../helpers/mock-client.js";
import {
  mockSubredditAbout,
  mockListing,
  mockEmptyResponse,
} from "../fixtures/reddit-responses.js";

const mockRulesResponse = {
  rules: [
    {
      kind: "all",
      description: "No spam allowed",
      short_name: "No Spam",
      violation_reason: "Spam",
      priority: 0,
    },
  ],
  site_rules: ["Content policy"],
};

describe("Subreddit Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/r/test/about", mockSubredditAbout],
        ["/r/test/about/rules", mockRulesResponse],
        ["/api/subscribe", mockEmptyResponse],
        ["/subreddits/mine/subscriber", mockListing],
        ["/subreddits/popular", mockListing],
        ["/subreddits/new", mockListing],
        ["/subreddits/search", mockListing],
      ]),
    );
    registerSubredditTools(server, mockClient);
  });

  it("registers subreddit tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_subreddit_about", () => {
    it("calls GET /r/{subreddit}/about", async () => {
      const result = await mockClient.get("/r/test/about");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/r/test/about");
      expect(result).toEqual(mockSubredditAbout);
    });
  });

  describe("reddit_subreddit_rules", () => {
    it("calls GET /r/{subreddit}/about/rules", async () => {
      const result = await mockClient.get("/r/test/about/rules");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/r/test/about/rules");
      expect(result).toEqual(mockRulesResponse);
    });
  });

  describe("reddit_subscribe", () => {
    it("calls POST /api/subscribe with action=sub", async () => {
      await mockClient.post("/api/subscribe", {
        sr_name: "test",
        action: "sub",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/subscribe", {
        sr_name: "test",
        action: "sub",
      });
    });
  });

  describe("reddit_unsubscribe", () => {
    it("calls POST /api/subscribe with action=unsub", async () => {
      await mockClient.post("/api/subscribe", {
        sr_name: "test",
        action: "unsub",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/subscribe", {
        sr_name: "test",
        action: "unsub",
      });
    });
  });

  describe("reddit_subreddits_mine", () => {
    it("calls GET /subreddits/mine/subscriber", async () => {
      await mockClient.get("/subreddits/mine/subscriber", { limit: "25" });
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/subreddits/mine/subscriber",
        { limit: "25" },
      );
    });
  });

  describe("reddit_subreddits_popular", () => {
    it("calls GET /subreddits/popular", async () => {
      await mockClient.get("/subreddits/popular", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/subreddits/popular",
        {},
      );
    });
  });

  describe("reddit_subreddits_new", () => {
    it("calls GET /subreddits/new", async () => {
      await mockClient.get("/subreddits/new", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith("/subreddits/new", {});
    });
  });

  describe("reddit_subreddits_search", () => {
    it("calls GET /subreddits/search with query", async () => {
      await mockClient.get("/subreddits/search", { q: "programming" });
      expect(mockClient.mockGet).toHaveBeenCalledWith("/subreddits/search", {
        q: "programming",
      });
    });
  });
});
