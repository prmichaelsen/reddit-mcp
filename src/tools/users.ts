import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { RedditClient } from "../client/reddit.js";

const userListingParams = {
  sort: z
    .enum(["hot", "new", "top", "controversial"])
    .optional()
    .describe("Sort order"),
  t: z
    .enum(["hour", "day", "week", "month", "year", "all"])
    .optional()
    .describe("Time filter (for top/controversial)"),
  limit: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .describe("Number of items to return (1-100, default 25)"),
  after: z.string().optional().describe("Fullname to paginate after"),
  before: z.string().optional().describe("Fullname to paginate before"),
};

function buildParams(
  input: Record<string, unknown>,
): Record<string, string | undefined> {
  const params: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined && value !== null) {
      params[key] = String(value);
    }
  }
  return params;
}

export function registerUserTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_user_about",
    "Get a user's public profile info. Requires 'read' scope.",
    {
      username: z.string().describe("Username (without /u/ prefix)"),
    },
    async (input) => {
      const data = await client.get(`/user/${input.username}/about`);
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_user_overview",
    "Get a user's recent posts and comments. Requires 'history' scope.",
    {
      username: z.string().describe("Username (without /u/ prefix)"),
      ...userListingParams,
    },
    async (input) => {
      const { username, ...rest } = input;
      const data = await client.get(
        `/user/${username}/overview`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_user_submitted",
    "Get a user's submitted posts. Requires 'history' scope.",
    {
      username: z.string().describe("Username (without /u/ prefix)"),
      ...userListingParams,
    },
    async (input) => {
      const { username, ...rest } = input;
      const data = await client.get(
        `/user/${username}/submitted`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_user_comments",
    "Get a user's comments. Requires 'history' scope.",
    {
      username: z.string().describe("Username (without /u/ prefix)"),
      ...userListingParams,
    },
    async (input) => {
      const { username, ...rest } = input;
      const data = await client.get(
        `/user/${username}/comments`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_user_saved",
    "Get a user's saved posts and comments. Only works for the authenticated user. Requires 'history' scope.",
    {
      username: z.string().describe("Username (without /u/ prefix)"),
      ...userListingParams,
    },
    async (input) => {
      const { username, ...rest } = input;
      const data = await client.get(
        `/user/${username}/saved`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_user_upvoted",
    "Get a user's upvoted posts. Only works for the authenticated user. Requires 'history' scope.",
    {
      username: z.string().describe("Username (without /u/ prefix)"),
      ...userListingParams,
    },
    async (input) => {
      const { username, ...rest } = input;
      const data = await client.get(
        `/user/${username}/upvoted`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_user_downvoted",
    "Get a user's downvoted posts. Only works for the authenticated user. Requires 'history' scope.",
    {
      username: z.string().describe("Username (without /u/ prefix)"),
      ...userListingParams,
    },
    async (input) => {
      const { username, ...rest } = input;
      const data = await client.get(
        `/user/${username}/downvoted`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_user_trophies",
    "Get a user's trophies. Requires 'read' scope.",
    {
      username: z.string().describe("Username (without /u/ prefix)"),
    },
    async (input) => {
      const data = await client.get(
        `/api/v1/user/${input.username}/trophies`,
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_block_user",
    "Block a user. Requires 'account' scope.",
    {
      name: z.string().describe("Username to block (without /u/ prefix)"),
    },
    async (input) => {
      const data = await client.post("/api/block_user", {
        name: input.name,
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
