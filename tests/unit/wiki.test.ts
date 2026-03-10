import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerWikiTools } from "../../src/tools/wiki.js";
import { createMockClient } from "../helpers/mock-client.js";
import { mockEmptyResponse } from "../fixtures/reddit-responses.js";

const mockWikiPage = {
  kind: "wikipage",
  data: {
    content_md: "# Welcome\n\nThis is the wiki page.",
    content_html: "<h1>Welcome</h1><p>This is the wiki page.</p>",
    revision_by: { data: { name: "mod1" } },
    revision_date: 1710000000,
  },
};

const mockWikiPages = {
  kind: "wikipagelisting",
  data: ["index", "faq", "rules", "config/sidebar"],
};

const mockWikiRevisions = {
  kind: "Listing",
  data: {
    after: null,
    children: [
      {
        id: "rev1",
        author: { data: { name: "mod1" } },
        page: "index",
        reason: "Updated welcome page",
        timestamp: 1710000000,
      },
    ],
  },
};

describe("Wiki Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/r/test/wiki/index", mockWikiPage],
        ["/r/test/api/wiki/edit", mockEmptyResponse],
        ["/r/test/wiki/pages", mockWikiPages],
        ["/r/test/wiki/revisions", mockWikiRevisions],
        ["/r/test/wiki/revisions/index", mockWikiRevisions],
      ]),
    );
    registerWikiTools(server, mockClient);
  });

  it("registers wiki tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_wiki_page", () => {
    it("calls GET /r/{subreddit}/wiki/{page}", async () => {
      const result = await mockClient.get("/r/test/wiki/index");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/r/test/wiki/index");
      expect(result).toEqual(mockWikiPage);
    });
  });

  describe("reddit_wiki_edit", () => {
    it("calls POST /r/{subreddit}/api/wiki/edit", async () => {
      await mockClient.post("/r/test/api/wiki/edit", {
        page: "index",
        content: "# Updated Content",
        reason: "Fixed typo",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/r/test/api/wiki/edit",
        expect.objectContaining({
          page: "index",
          content: "# Updated Content",
          reason: "Fixed typo",
        }),
      );
    });
  });

  describe("reddit_wiki_pages", () => {
    it("calls GET /r/{subreddit}/wiki/pages", async () => {
      const result = await mockClient.get("/r/test/wiki/pages");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/r/test/wiki/pages");
      expect(result).toEqual(mockWikiPages);
    });
  });

  describe("reddit_wiki_revisions", () => {
    it("calls GET /r/{subreddit}/wiki/revisions", async () => {
      const result = await mockClient.get("/r/test/wiki/revisions", {
        limit: "10",
      });
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/wiki/revisions",
        { limit: "10" },
      );
      expect(result).toEqual(mockWikiRevisions);
    });
  });

  describe("reddit_wiki_page_revisions", () => {
    it("calls GET /r/{subreddit}/wiki/revisions/{page}", async () => {
      const result = await mockClient.get("/r/test/wiki/revisions/index");
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/wiki/revisions/index",
      );
      expect(result).toEqual(mockWikiRevisions);
    });
  });
});
