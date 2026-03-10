import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCommentTools } from "../../src/tools/comments.js";
import { createMockClient } from "../helpers/mock-client.js";
import {
  mockCommentResponse,
  mockMoreChildrenResponse,
} from "../fixtures/reddit-responses.js";

describe("Comment Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/api/comment", mockCommentResponse],
        ["/api/morechildren", mockMoreChildrenResponse],
      ]),
    );
    registerCommentTools(server, mockClient);
  });

  it("registers comment tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_comment", () => {
    it("calls POST /api/comment for top-level comment", async () => {
      await mockClient.post("/api/comment", {
        parent: "t3_abc123",
        text: "Great post!",
        api_type: "json",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/comment",
        expect.objectContaining({
          parent: "t3_abc123",
          text: "Great post!",
        }),
      );
    });

    it("calls POST /api/comment for reply", async () => {
      await mockClient.post("/api/comment", {
        parent: "t1_xyz789",
        text: "I agree!",
        api_type: "json",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/comment",
        expect.objectContaining({
          parent: "t1_xyz789",
          text: "I agree!",
        }),
      );
    });
  });

  describe("reddit_more_children", () => {
    it("calls GET /api/morechildren", async () => {
      await mockClient.get("/api/morechildren", {
        link_id: "t3_abc123",
        children: "comment1,comment2,comment3",
        api_type: "json",
      });
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/api/morechildren",
        expect.objectContaining({
          link_id: "t3_abc123",
          children: "comment1,comment2,comment3",
        }),
      );
    });

    it("supports sort parameter", async () => {
      await mockClient.get("/api/morechildren", {
        link_id: "t3_abc123",
        children: "c1",
        sort: "top",
        api_type: "json",
      });
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/api/morechildren",
        expect.objectContaining({
          sort: "top",
        }),
      );
    });
  });
});
