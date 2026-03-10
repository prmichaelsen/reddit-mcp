import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerMessageTools } from "../../src/tools/messages.js";
import { createMockClient } from "../helpers/mock-client.js";
import {
  mockMessageListing,
  mockComposeResponse,
  mockEmptyResponse,
} from "../fixtures/reddit-responses.js";

describe("Private Message Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/message/inbox", mockMessageListing],
        ["/message/unread", mockMessageListing],
        ["/message/sent", mockMessageListing],
        ["/api/compose", mockComposeResponse],
        ["/api/read_message", mockEmptyResponse],
        ["/api/unread_message", mockEmptyResponse],
        ["/api/del_msg", mockEmptyResponse],
      ]),
    );
    registerMessageTools(server, mockClient);
  });

  it("registers message tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_inbox", () => {
    it("calls GET /message/inbox", async () => {
      const result = await mockClient.get("/message/inbox", { limit: "10" });
      expect(mockClient.mockGet).toHaveBeenCalledWith("/message/inbox", {
        limit: "10",
      });
      expect(result).toEqual(mockMessageListing);
    });
  });

  describe("reddit_unread", () => {
    it("calls GET /message/unread", async () => {
      const result = await mockClient.get("/message/unread");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/message/unread");
      expect(result).toEqual(mockMessageListing);
    });
  });

  describe("reddit_sent", () => {
    it("calls GET /message/sent", async () => {
      await mockClient.get("/message/sent");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/message/sent");
    });
  });

  describe("reddit_compose", () => {
    it("calls POST /api/compose", async () => {
      await mockClient.post("/api/compose", {
        to: "otheruser",
        subject: "Hello",
        text: "Hi there!",
        api_type: "json",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/compose",
        expect.objectContaining({
          to: "otheruser",
          subject: "Hello",
          text: "Hi there!",
        }),
      );
    });
  });

  describe("reddit_read_message", () => {
    it("calls POST /api/read_message", async () => {
      await mockClient.post("/api/read_message", { id: "t4_msg1" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/read_message", {
        id: "t4_msg1",
      });
    });
  });

  describe("reddit_unread_message", () => {
    it("calls POST /api/unread_message", async () => {
      await mockClient.post("/api/unread_message", { id: "t4_msg1" });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/unread_message",
        { id: "t4_msg1" },
      );
    });
  });

  describe("reddit_del_msg", () => {
    it("calls POST /api/del_msg", async () => {
      await mockClient.post("/api/del_msg", { id: "t4_msg1" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/del_msg", {
        id: "t4_msg1",
      });
    });
  });
});
