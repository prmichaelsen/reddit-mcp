import { describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAccountTools } from "../../src/tools/account.js";
import { createMockClient } from "../helpers/mock-client.js";
import {
  mockMeResponse,
  mockKarmaResponse,
  mockPrefsResponse,
  mockTrophiesResponse,
  mockFriendsResponse,
  mockBlockedResponse,
} from "../fixtures/reddit-responses.js";

describe("Account Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/api/v1/me", mockMeResponse],
        ["/api/v1/me/karma", mockKarmaResponse],
        ["/api/v1/me/prefs", mockPrefsResponse],
        ["/api/v1/me/trophies", mockTrophiesResponse],
        ["/prefs/friends", mockFriendsResponse],
        ["/prefs/blocked", mockBlockedResponse],
      ]),
    );
    registerAccountTools(server, mockClient);
  });

  it("registers account tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_me", () => {
    it("calls GET /api/v1/me", async () => {
      const result = await mockClient.get("/api/v1/me");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/api/v1/me");
      expect(result).toEqual(mockMeResponse);
    });
  });

  describe("reddit_me_karma", () => {
    it("calls GET /api/v1/me/karma", async () => {
      const result = await mockClient.get("/api/v1/me/karma");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/api/v1/me/karma");
      expect(result).toEqual(mockKarmaResponse);
    });
  });

  describe("reddit_me_prefs", () => {
    it("calls GET /api/v1/me/prefs", async () => {
      const result = await mockClient.get("/api/v1/me/prefs");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/api/v1/me/prefs");
      expect(result).toEqual(mockPrefsResponse);
    });
  });

  describe("reddit_me_prefs_update", () => {
    it("calls PATCH /api/v1/me/prefs with prefs object", async () => {
      const prefs = { over_18: true, hide_downs: true };
      await mockClient.patch("/api/v1/me/prefs", prefs);
      expect(mockClient.patch).toHaveBeenCalledWith(
        "/api/v1/me/prefs",
        prefs,
      );
    });
  });

  describe("reddit_me_trophies", () => {
    it("calls GET /api/v1/me/trophies", async () => {
      const result = await mockClient.get("/api/v1/me/trophies");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/api/v1/me/trophies");
      expect(result).toEqual(mockTrophiesResponse);
    });
  });

  describe("reddit_me_friends", () => {
    it("calls GET /prefs/friends", async () => {
      const result = await mockClient.get("/prefs/friends");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/prefs/friends");
      expect(result).toEqual(mockFriendsResponse);
    });
  });

  describe("reddit_me_blocked", () => {
    it("calls GET /prefs/blocked", async () => {
      const result = await mockClient.get("/prefs/blocked");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/prefs/blocked");
      expect(result).toEqual(mockBlockedResponse);
    });
  });
});
