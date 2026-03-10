import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerModerationTools } from "../../src/tools/moderation.js";
import { createMockClient } from "../helpers/mock-client.js";
import { mockListing, mockEmptyResponse } from "../fixtures/reddit-responses.js";

const mockUserList = {
  kind: "UserList",
  data: {
    children: [
      { name: "mod1", date: 1700000000, id: "t2_mod1" },
    ],
  },
};

const mockModlogResponse = {
  kind: "Listing",
  data: {
    after: null,
    children: [
      {
        kind: "modaction",
        data: {
          id: "ModAction_abc",
          mod: "mod1",
          action: "removelink",
          target_fullname: "t3_abc123",
          created_utc: 1710000000,
        },
      },
    ],
  },
};

describe("Moderation Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/api/approve", mockEmptyResponse],
        ["/api/remove", mockEmptyResponse],
        ["/api/distinguish", mockEmptyResponse],
        ["/api/ignore_reports", mockEmptyResponse],
        ["/api/unignore_reports", mockEmptyResponse],
        ["/api/lock", mockEmptyResponse],
        ["/api/unlock", mockEmptyResponse],
        ["/r/test/about/modqueue", mockListing],
        ["/r/test/about/reports", mockListing],
        ["/r/test/about/spam", mockListing],
        ["/r/test/about/edited", mockListing],
        ["/r/test/about/log", mockModlogResponse],
        ["/r/test/about/moderators", mockUserList],
        ["/r/test/about/contributors", mockUserList],
        ["/r/test/about/banned", mockUserList],
        ["/r/test/about/muted", mockUserList],
      ]),
    );
    registerModerationTools(server, mockClient);
  });

  it("registers moderation tools", () => {
    expect(server).toBeDefined();
  });

  // === Mod Action Tools ===

  describe("reddit_approve", () => {
    it("calls POST /api/approve", async () => {
      await mockClient.post("/api/approve", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/approve", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_remove", () => {
    it("calls POST /api/remove", async () => {
      await mockClient.post("/api/remove", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/remove", {
        id: "t3_abc123",
      });
    });

    it("supports spam flag", async () => {
      await mockClient.post("/api/remove", { id: "t3_abc123", spam: "true" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/remove", {
        id: "t3_abc123",
        spam: "true",
      });
    });
  });

  describe("reddit_distinguish", () => {
    it("calls POST /api/distinguish", async () => {
      await mockClient.post("/api/distinguish", {
        id: "t1_xyz789",
        how: "yes",
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/distinguish", {
        id: "t1_xyz789",
        how: "yes",
      });
    });
  });

  describe("reddit_ignore_reports", () => {
    it("calls POST /api/ignore_reports", async () => {
      await mockClient.post("/api/ignore_reports", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/ignore_reports", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_unignore_reports", () => {
    it("calls POST /api/unignore_reports", async () => {
      await mockClient.post("/api/unignore_reports", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/unignore_reports",
        { id: "t3_abc123" },
      );
    });
  });

  describe("reddit_lock", () => {
    it("calls POST /api/lock", async () => {
      await mockClient.post("/api/lock", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/lock", {
        id: "t3_abc123",
      });
    });
  });

  describe("reddit_unlock", () => {
    it("calls POST /api/unlock", async () => {
      await mockClient.post("/api/unlock", { id: "t3_abc123" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/unlock", {
        id: "t3_abc123",
      });
    });
  });

  // === Mod Listing Tools ===

  describe("reddit_modqueue", () => {
    it("calls GET /r/{subreddit}/about/modqueue", async () => {
      await mockClient.get("/r/test/about/modqueue", { limit: "10" });
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/about/modqueue",
        { limit: "10" },
      );
    });
  });

  describe("reddit_reports", () => {
    it("calls GET /r/{subreddit}/about/reports", async () => {
      await mockClient.get("/r/test/about/reports", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/about/reports",
        {},
      );
    });
  });

  describe("reddit_spam", () => {
    it("calls GET /r/{subreddit}/about/spam", async () => {
      await mockClient.get("/r/test/about/spam", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/about/spam",
        {},
      );
    });
  });

  describe("reddit_edited", () => {
    it("calls GET /r/{subreddit}/about/edited", async () => {
      await mockClient.get("/r/test/about/edited", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/about/edited",
        {},
      );
    });
  });

  describe("reddit_modlog", () => {
    it("calls GET /r/{subreddit}/about/log", async () => {
      const result = await mockClient.get("/r/test/about/log", {
        type: "removelink",
        mod: "mod1",
      });
      expect(mockClient.mockGet).toHaveBeenCalledWith("/r/test/about/log", {
        type: "removelink",
        mod: "mod1",
      });
      expect(result).toEqual(mockModlogResponse);
    });
  });

  // === Mod Management Tools ===

  describe("reddit_moderators", () => {
    it("calls GET /r/{subreddit}/about/moderators", async () => {
      const result = await mockClient.get("/r/test/about/moderators");
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/about/moderators",
      );
      expect(result).toEqual(mockUserList);
    });
  });

  describe("reddit_contributors", () => {
    it("calls GET /r/{subreddit}/about/contributors", async () => {
      await mockClient.get("/r/test/about/contributors", { limit: "25" });
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/about/contributors",
        { limit: "25" },
      );
    });
  });

  describe("reddit_banned", () => {
    it("calls GET /r/{subreddit}/about/banned", async () => {
      await mockClient.get("/r/test/about/banned", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/about/banned",
        {},
      );
    });
  });

  describe("reddit_muted", () => {
    it("calls GET /r/{subreddit}/about/muted", async () => {
      await mockClient.get("/r/test/about/muted", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/r/test/about/muted",
        {},
      );
    });
  });
});
