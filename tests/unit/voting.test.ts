import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerVotingTools } from "../../src/tools/voting.js";
import { createMockClient } from "../helpers/mock-client.js";
import { mockEmptyResponse } from "../fixtures/reddit-responses.js";

describe("Voting, Save & Report Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/api/vote", mockEmptyResponse],
        ["/api/save", mockEmptyResponse],
        ["/api/unsave", mockEmptyResponse],
        ["/api/report", mockEmptyResponse],
      ]),
    );
    registerVotingTools(server, mockClient);
  });

  it("registers voting tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_vote", () => {
    it("calls POST /api/vote for upvote", async () => {
      await mockClient.post("/api/vote", { id: "t3_abc123", dir: "1" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/vote", {
        id: "t3_abc123",
        dir: "1",
      });
    });

    it("calls POST /api/vote for downvote", async () => {
      await mockClient.post("/api/vote", { id: "t3_abc123", dir: "-1" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/vote", {
        id: "t3_abc123",
        dir: "-1",
      });
    });

    it("calls POST /api/vote for unvote", async () => {
      await mockClient.post("/api/vote", { id: "t1_xyz789", dir: "0" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/vote", {
        id: "t1_xyz789",
        dir: "0",
      });
    });
  });

  describe("reddit_save", () => {
    it("calls POST /api/save", async () => {
      await mockClient.post("/api/save", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/save", {
        id: "t3_abc123",
      });
    });

    it("supports category parameter", async () => {
      await mockClient.post("/api/save", {
        id: "t3_abc123",
        category: "favorites",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/save", {
        id: "t3_abc123",
        category: "favorites",
      });
    });
  });

  describe("reddit_unsave", () => {
    it("calls POST /api/unsave", async () => {
      await mockClient.post("/api/unsave", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/unsave", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_report", () => {
    it("calls POST /api/report with reason", async () => {
      await mockClient.post("/api/report", {
        thing_id: "t3_abc123",
        reason: "spam",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/report", {
        thing_id: "t3_abc123",
        reason: "spam",
      });
    });

    it("supports other_reason parameter", async () => {
      await mockClient.post("/api/report", {
        thing_id: "t1_xyz789",
        reason: "other",
        other_reason: "Offensive content",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/report",
        expect.objectContaining({
          reason: "other",
          other_reason: "Offensive content",
        }),
      );
    });
  });
});
