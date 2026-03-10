import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerFlairTools } from "../../src/tools/flair.js";
import { createMockClient } from "../helpers/mock-client.js";
import { mockEmptyResponse } from "../fixtures/reddit-responses.js";

const mockFlairTemplates = [
  {
    type: "richtext",
    text_editable: false,
    allowable_content: "all",
    text: "Discussion",
    id: "flair_abc123",
    css_class: "discussion",
    text_color: "dark",
    background_color: "#edeff1",
  },
  {
    type: "richtext",
    text_editable: true,
    allowable_content: "all",
    text: "Question",
    id: "flair_xyz789",
    css_class: "question",
    text_color: "light",
    background_color: "#0079d3",
  },
];

describe("Flair Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/r/test/api/link_flair_v2", mockFlairTemplates],
        ["/r/test/api/user_flair_v2", mockFlairTemplates],
        ["/r/test/api/selectflair", mockEmptyResponse],
      ]),
    );
    registerFlairTools(server, mockClient);
  });

  it("registers flair tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_link_flair", () => {
    it("calls GET /r/{subreddit}/api/link_flair_v2", async () => {
      const result = await mockClient.get("/r/test/api/link_flair_v2");
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/api/link_flair_v2",
      );
      expect(result).toEqual(mockFlairTemplates);
    });
  });

  describe("reddit_user_flair", () => {
    it("calls GET /r/{subreddit}/api/user_flair_v2", async () => {
      const result = await mockClient.get("/r/test/api/user_flair_v2");
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/api/user_flair_v2",
      );
      expect(result).toEqual(mockFlairTemplates);
    });
  });

  describe("reddit_select_flair", () => {
    it("calls POST /r/{subreddit}/api/selectflair for link flair", async () => {
      await mockClient.post("/r/test/api/selectflair", {
        flair_template_id: "flair_abc123",
        link: "t3_abc123",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/r/test/api/selectflair",
        expect.objectContaining({
          flair_template_id: "flair_abc123",
          link: "t3_abc123",
        }),
      );
    });

    it("calls POST /r/{subreddit}/api/selectflair for user flair", async () => {
      await mockClient.post("/r/test/api/selectflair", {
        flair_template_id: "flair_xyz789",
        name: "testuser",
        text: "Custom Text",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/r/test/api/selectflair",
        expect.objectContaining({
          flair_template_id: "flair_xyz789",
          name: "testuser",
          text: "Custom Text",
        }),
      );
    });
  });
});
