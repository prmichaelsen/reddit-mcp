import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { RedditClient } from "../client/reddit.js";

const paginationParams = {
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

export function registerSubredditTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_subreddit_about",
    "Get a subreddit's metadata (description, subscribers, rules summary, etc). Requires 'read' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.get(`/r/${input.subreddit}/about`);
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_subreddit_rules",
    "Get a subreddit's rules list. Requires 'read' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.get(`/r/${input.subreddit}/about/rules`);
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_subscribe",
    "Subscribe to a subreddit. Requires 'subscribe' scope.",
    {
      sr_name: z.string().describe("Subreddit name to subscribe to (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.post("/api/subscribe", {
        sr_name: input.sr_name,
        action: "sub",
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_unsubscribe",
    "Unsubscribe from a subreddit. Requires 'subscribe' scope.",
    {
      sr_name: z.string().describe("Subreddit name to unsubscribe from (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.post("/api/subscribe", {
        sr_name: input.sr_name,
        action: "unsub",
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_subreddits_mine",
    "List subreddits the authenticated user is subscribed to. Requires 'mysubreddits' scope.",
    { ...paginationParams },
    async (input) => {
      const data = await client.get(
        "/subreddits/mine/subscriber",
        buildParams(input),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_subreddits_popular",
    "List popular subreddits. Requires 'read' scope.",
    { ...paginationParams },
    async (input) => {
      const data = await client.get(
        "/subreddits/popular",
        buildParams(input),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_subreddits_new",
    "List newest subreddits. Requires 'read' scope.",
    { ...paginationParams },
    async (input) => {
      const data = await client.get("/subreddits/new", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_subreddits_search",
    "Search for subreddits by name or topic. Requires 'read' scope.",
    {
      q: z.string().describe("Search query"),
      ...paginationParams,
    },
    async (input) => {
      const data = await client.get(
        "/subreddits/search",
        buildParams(input),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
