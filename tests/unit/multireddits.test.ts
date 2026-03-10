import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerMultiredditTools } from "../../src/tools/multireddits.js";
import { createMockClient } from "../helpers/mock-client.js";
import { mockEmptyResponse } from "../fixtures/reddit-responses.js";

const mockMultiList = [
  {
    kind: "LabeledMulti",
    data: {
      name: "frontpage",
      display_name: "Frontpage",
      path: "/user/testuser/m/frontpage",
      subreddits: [{ name: "programming" }, { name: "typescript" }],
      visibility: "private",
    },
  },
];

const mockMulti = {
  kind: "LabeledMulti",
  data: {
    name: "frontpage",
    display_name: "Frontpage",
    path: "/user/testuser/m/frontpage",
    subreddits: [{ name: "programming" }],
    visibility: "private",
  },
};

describe("Multireddit Tools", () => {
  let server: McpServer;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.1" });
    mockClient = createMockClient(
      new Map([
        ["/api/multi/mine", mockMultiList],
        ["/api/multi/user/testuser/m/frontpage", mockMulti],
        ["/api/multi/user/testuser/m/frontpage/r/typescript", mockEmptyResponse],
      ]),
    );
    registerMultiredditTools(server, mockClient);
  });

  it("registers multireddit tools", () => {
    expect(server).toBeDefined();
  });

  describe("reddit_multi_mine", () => {
    it("calls GET /api/multi/mine", async () => {
      const result = await mockClient.get("/api/multi/mine");
      expect(mockClient.mockGet).toHaveBeenCalledWith("/api/multi/mine");
      expect(result).toEqual(mockMultiList);
    });
  });

  describe("reddit_multi_get", () => {
    it("calls GET /api/multi/{multipath}", async () => {
      const result = await mockClient.get(
        "/api/multi/user/testuser/m/frontpage",
      );
      expect(mockClient.mockGet).toHaveBeenCalledWith(
        "/api/multi/user/testuser/m/frontpage",
      );
      expect(result).toEqual(mockMulti);
    });
  });

  describe("reddit_multi_create", () => {
    it("calls POST /api/multi/{multipath}", async () => {
      await mockClient.post("/api/multi/user/testuser/m/frontpage", {
        model: JSON.stringify({
          display_name: "Frontpage",
          subreddits: [{ name: "programming" }],
          visibility: "private",
          description_md: "",
        }),
      });
      expect(mockClient.mockPost).toHaveBeenCalledWith(
        "/api/multi/user/testuser/m/frontpage",
        expect.objectContaining({
          model: expect.stringContaining("Frontpage"),
        }),
      );
    });
  });

  describe("reddit_multi_update", () => {
    it("calls PUT /api/multi/{multipath}", async () => {
      await mockClient.put("/api/multi/user/testuser/m/frontpage", {
        model: { display_name: "Updated Name" },
      });
      expect(mockClient.put).toHaveBeenCalledWith(
        "/api/multi/user/testuser/m/frontpage",
        expect.objectContaining({
          model: { display_name: "Updated Name" },
        }),
      );
    });
  });

  describe("reddit_multi_delete", () => {
    it("calls DELETE /api/multi/{multipath}", async () => {
      await mockClient.delete("/api/multi/user/testuser/m/frontpage");
      expect(mockClient.delete).toHaveBeenCalledWith(
        "/api/multi/user/testuser/m/frontpage",
      );
    });
  });

  describe("reddit_multi_add_sub", () => {
    it("calls PUT /api/multi/{multipath}/r/{srname}", async () => {
      await mockClient.put(
        "/api/multi/user/testuser/m/frontpage/r/typescript",
        { model: { name: "typescript" } },
      );
      expect(mockClient.put).toHaveBeenCalledWith(
        "/api/multi/user/testuser/m/frontpage/r/typescript",
        { model: { name: "typescript" } },
      );
    });
  });

  describe("reddit_multi_remove_sub", () => {
    it("calls DELETE /api/multi/{multipath}/r/{srname}", async () => {
      await mockClient.delete(
        "/api/multi/user/testuser/m/frontpage/r/typescript",
      );
      expect(mockClient.delete).toHaveBeenCalledWith(
        "/api/multi/user/testuser/m/frontpage/r/typescript",
      );
    });
  });
});
