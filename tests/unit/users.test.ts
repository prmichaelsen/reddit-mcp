import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerUserTools } from "../../src/tools/users.js";
import { createMockClient } from "../helpers/mock-client.js";
import {
  mockUserProfile,
  mockListing,
  mockTrophiesResponse,
  mockEmptyResponse,
} from "../fixtures/reddit-responses.js";

describe("User Profile Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/user/testuser/about", mockUserProfile],
        ["/user/testuser/overview", mockListing],
        ["/user/testuser/submitted", mockListing],
        ["/user/testuser/comments", mockListing],
        ["/user/testuser/saved", mockListing],
        ["/user/testuser/upvoted", mockListing],
        ["/user/testuser/downvoted", mockListing],
        ["/api/v1/user/testuser/trophies", mockTrophiesResponse],
        ["/api/block_user", mockEmptyResponse],
      ]),
    );
    registerUserTools(server, mockClient);
  });

  it("registers user tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_user_about", () => {
    it("calls GET /user/{username}/about", async () => {
      const result = await mockClient.get("/user/testuser/about");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/user/testuser/about");
      expect(result).toEqual(mockUserProfile);
    });
  });

  describe("reddit_user_overview", () => {
    it("calls GET /user/{username}/overview", async () => {
      await mockClient.get("/user/testuser/overview", { sort: "new", limit: "10" });
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/user/testuser/overview",
        { sort: "new", limit: "10" },
      );
    });
  });

  describe("reddit_user_submitted", () => {
    it("calls GET /user/{username}/submitted", async () => {
      await mockClient.get("/user/testuser/submitted", { sort: "top", t: "week" });
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/user/testuser/submitted",
        { sort: "top", t: "week" },
      );
    });
  });

  describe("reddit_user_comments", () => {
    it("calls GET /user/{username}/comments", async () => {
      await mockClient.get("/user/testuser/comments", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/user/testuser/comments",
        {},
      );
    });
  });

  describe("reddit_user_saved", () => {
    it("calls GET /user/{username}/saved", async () => {
      await mockClient.get("/user/testuser/saved", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/user/testuser/saved",
        {},
      );
    });
  });

  describe("reddit_user_upvoted", () => {
    it("calls GET /user/{username}/upvoted", async () => {
      await mockClient.get("/user/testuser/upvoted", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/user/testuser/upvoted",
        {},
      );
    });
  });

  describe("reddit_user_downvoted", () => {
    it("calls GET /user/{username}/downvoted", async () => {
      await mockClient.get("/user/testuser/downvoted", {});
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/user/testuser/downvoted",
        {},
      );
    });
  });

  describe("reddit_user_trophies", () => {
    it("calls GET /api/v1/user/{username}/trophies", async () => {
      const result = await mockClient.get("/api/v1/user/testuser/trophies");
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/api/v1/user/testuser/trophies",
      );
      expect(result).toEqual(mockTrophiesResponse);
    });
  });

  describe("reddit_block_user", () => {
    it("calls POST /api/block_user", async () => {
      await mockClient.post("/api/block_user", { name: "spammer" });
      expect(mockClient.mockPost).toHaveBeenCalledWith("/api/block_user", {
        name: "spammer",
      });
    });
  });
});
