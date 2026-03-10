import { jest } from "@jest/globals";
import { RedditClient } from "../../src/client/reddit.js";

export function createMockClient(
  responses: Map<string, unknown> = new Map(),
): RedditClient & {
  mockGet: jest.Mock;
  mockPost: jest.Mock;
} {
  const mockGet = jest.fn().mockImplementation(async (path: string) => {
    if (responses.has(path)) {
      return responses.get(path);
    }
    return { kind: "Listing", data: { children: [], after: null, before: null, dist: 0, modhash: "" } };
  });

  const mockPost = jest.fn().mockImplementation(async (path: string) => {
    if (responses.has(path)) {
      return responses.get(path);
    }
    return { json: { errors: [] } };
  });

  const client = {
    get: mockGet,
    post: mockPost,
    patch: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    getRateLimitInfo: jest.fn().mockReturnValue(null),
    mockGet,
    mockPost,
  } as unknown as RedditClient & { mockGet: jest.Mock; mockPost: jest.Mock };

  return client;
}
