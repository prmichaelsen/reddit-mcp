import { describe, it, expect } from "@jest/globals";
import { startHttpTransport } from "../../src/transport/http.js";

describe("HTTP Transport", () => {
  it("exports startHttpTransport function", () => {
    expect(typeof startHttpTransport).toBe("function");
  });

  it("accepts server and options parameters", () => {
    // Verify the function signature matches expectations
    expect(startHttpTransport.length).toBeGreaterThanOrEqual(1);
  });
});
