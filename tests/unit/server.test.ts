import { describe, it, expect } from "@jest/globals";
import { createServerWithToken } from "../../src/server.js";

describe("createServerWithToken", () => {
  it("creates an MCP server instance", () => {
    const server = createServerWithToken("test-token");
    expect(server).toBeDefined();
  });

  it("has server property", () => {
    const server = createServerWithToken("test-token");
    expect(server.server).toBeDefined();
  });
});
