import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { RedditClient } from "../client/reddit.js";

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

export function registerSearchTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_search",
    "Search across all of Reddit for posts, subreddits, or users. Requires 'read' scope.",
    {
      q: z.string().describe("Search query"),
      sort: z
        .enum(["relevance", "hot", "top", "new", "comments"])
        .optional()
        .describe("Sort order for results"),
      t: z
        .enum(["hour", "day", "week", "month", "year", "all"])
        .optional()
        .describe("Time filter"),
      type: z
        .enum(["link", "sr", "user"])
        .optional()
        .describe("Type of results: link (posts), sr (subreddits), user"),
      limit: z
        .number()
        .min(1)
        .max(100)
        .optional()
        .describe("Number of results (1-100, default 25)"),
      after: z.string().optional().describe("Pagination cursor (after)"),
      before: z.string().optional().describe("Pagination cursor (before)"),
    },
    async (input) => {
      const data = await client.get("/search", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_search_subreddit",
    "Search for posts within a specific subreddit. Requires 'read' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      q: z.string().describe("Search query"),
      sort: z
        .enum(["relevance", "hot", "top", "new", "comments"])
        .optional()
        .describe("Sort order for results"),
      t: z
        .enum(["hour", "day", "week", "month", "year", "all"])
        .optional()
        .describe("Time filter"),
      limit: z
        .number()
        .min(1)
        .max(100)
        .optional()
        .describe("Number of results (1-100, default 25)"),
      after: z.string().optional().describe("Pagination cursor (after)"),
      before: z.string().optional().describe("Pagination cursor (before)"),
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(`/r/${subreddit}/search`, {
        ...buildParams(rest),
        restrict_sr: "true",
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
