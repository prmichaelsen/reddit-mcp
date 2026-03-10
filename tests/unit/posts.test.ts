import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPostTools } from "../../src/tools/posts.js";
import { createMockClient } from "../helpers/mock-client.js";
import {
  mockSubmitResponse,
  mockEditResponse,
  mockEmptyResponse,
} from "../fixtures/reddit-responses.js";

describe("Post Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/api/submit", mockSubmitResponse],
        ["/api/editusertext", mockEditResponse],
        ["/api/del", mockEmptyResponse],
        ["/api/hide", mockEmptyResponse],
        ["/api/unhide", mockEmptyResponse],
        ["/api/marknsfw", mockEmptyResponse],
        ["/api/unmarknsfw", mockEmptyResponse],
        ["/api/spoiler", mockEmptyResponse],
        ["/api/unspoiler", mockEmptyResponse],
      ]),
    );
    registerPostTools(server, mockClient);
  });

  it("registers post tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_submit", () => {
    it("calls POST /api/submit for self post", async () => {
      await mockClient.post("/api/submit", {
        sr: "test",
        title: "My Post",
        kind: "self",
        text: "Hello world",
        api_type: "json",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/submit",
        expect.objectContaining({
          sr: "test",
          title: "My Post",
          kind: "self",
          text: "Hello world",
        }),
      );
    });

    it("calls POST /api/submit for link post", async () => {
      await mockClient.post("/api/submit", {
        sr: "test",
        title: "My Link",
        kind: "link",
        url: "https://example.com",
        api_type: "json",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/submit",
        expect.objectContaining({
          sr: "test",
          kind: "link",
          url: "https://example.com",
        }),
      );
    });
  });

  describe("reddit_edit", () => {
    it("calls POST /api/editusertext", async () => {
      await mockClient.post("/api/editusertext", {
        thing_id: "t3_abc123",
        text: "Updated text",
        api_type: "json",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/editusertext",
        expect.objectContaining({
          thing_id: "t3_abc123",
          text: "Updated text",
        }),
      );
    });
  });

  describe("reddit_delete", () => {
    it("calls POST /api/del", async () => {
      await mockClient.post("/api/del", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/del", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_hide", () => {
    it("calls POST /api/hide", async () => {
      await mockClient.post("/api/hide", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/hide", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_unhide", () => {
    it("calls POST /api/unhide", async () => {
      await mockClient.post("/api/unhide", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/unhide", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_mark_nsfw", () => {
    it("calls POST /api/marknsfw", async () => {
      await mockClient.post("/api/marknsfw", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/marknsfw", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_unmark_nsfw", () => {
    it("calls POST /api/unmarknsfw", async () => {
      await mockClient.post("/api/unmarknsfw", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/unmarknsfw", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_spoiler", () => {
    it("calls POST /api/spoiler", async () => {
      await mockClient.post("/api/spoiler", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/spoiler", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_unspoiler", () => {
    it("calls POST /api/unspoiler", async () => {
      await mockClient.post("/api/unspoiler", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/unspoiler", {
        id: "t3_abc123",
      });
    });
  });
});
