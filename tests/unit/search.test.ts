import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSearchTools } from "../../src/tools/search.js";
import { createMockClient } from "../helpers/mock-client.js";
import { mockSearchResults } from "../fixtures/reddit-responses.js";

describe("Search Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/search", mockSearchResults],
        ["/r/programming/search", mockSearchResults],
      ]),
    );
    registerSearchTools(server, mockClient);
  });

  it("registers search tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_search", () => {
    it("calls GET /search with query", async () => {
      await mockClient.get("/search", { q: "typescript", sort: "relevance" });
      expect(mockClient.mockGet).toHaveBeenCalledWith("/search", {
        q: "typescript",
        sort: "relevance",
      });
    });

    it("supports type filter", async () => {
      await mockClient.get("/search", { q: "test", type: "sr" });
      expect(mockClient.mockGet).toHaveBeenCalledWith("/search", {
        q: "test",
        type: "sr",
      });
    });
  });

  describe("reddit_search_subreddit", () => {
    it("calls GET /r/{subreddit}/search with restrict_sr", async () => {
      await mockClient.get("/r/programming/search", {
        q: "typescript",
        restrict_sr: "true",
      });
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/programming/search",
        expect.objectContaining({
          q: "typescript",
          restrict_sr: "true",
        }),
      );
    });
  });
});
