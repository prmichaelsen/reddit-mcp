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
  after: z.string().optional().describe("Fullname of item to paginate after"),
  before: z
    .string()
    .optional()
    .describe("Fullname of item to paginate before"),
};

const timeFilter = z
  .enum(["hour", "day", "week", "month", "year", "all"])
  .optional()
  .describe("Time filter for top/controversial listings");

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

export function registerListingTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_listings_best",
    "Get the best posts from Reddit. Requires 'read' scope.",
    { ...paginationParams },
    async (input) => {
      const data = await client.get("/best", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_listings_hot",
    "Get hot posts from Reddit frontpage or a specific subreddit. Requires 'read' scope.",
    {
      subreddit: z
        .string()
        .optional()
        .describe("Subreddit name (without r/ prefix). Omit for frontpage."),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const path = subreddit ? `/r/${subreddit}/hot` : "/hot";
      const data = await client.get(path, buildParams(rest));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_listings_new",
    "Get newest posts from Reddit frontpage or a specific subreddit. Requires 'read' scope.",
    {
      subreddit: z
        .string()
        .optional()
        .describe("Subreddit name (without r/ prefix). Omit for frontpage."),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const path = subreddit ? `/r/${subreddit}/new` : "/new";
      const data = await client.get(path, buildParams(rest));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_listings_rising",
    "Get rising posts from Reddit frontpage or a specific subreddit. Requires 'read' scope.",
    {
      subreddit: z
        .string()
        .optional()
        .describe("Subreddit name (without r/ prefix). Omit for frontpage."),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const path = subreddit ? `/r/${subreddit}/rising` : "/rising";
      const data = await client.get(path, buildParams(rest));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_listings_top",
    "Get top posts from Reddit frontpage or a specific subreddit. Requires 'read' scope.",
    {
      subreddit: z
        .string()
        .optional()
        .describe("Subreddit name (without r/ prefix). Omit for frontpage."),
      t: timeFilter,
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const path = subreddit ? `/r/${subreddit}/top` : "/top";
      const data = await client.get(path, buildParams(rest));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_listings_controversial",
    "Get controversial posts from Reddit frontpage or a specific subreddit. Requires 'read' scope.",
    {
      subreddit: z
        .string()
        .optional()
        .describe("Subreddit name (without r/ prefix). Omit for frontpage."),
      t: timeFilter,
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const path = subreddit
        ? `/r/${subreddit}/controversial`
        : "/controversial";
      const data = await client.get(path, buildParams(rest));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_comments_thread",
    "Get a post with its full comment tree. Requires 'read' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      article: z.string().describe("Post ID (without t3_ prefix)"),
      sort: z
        .enum(["confidence", "top", "new", "controversial", "old", "qa"])
        .optional()
        .describe("Comment sort order"),
      limit: z
        .number()
        .optional()
        .describe("Maximum number of comments to return"),
      depth: z.number().optional().describe("Maximum comment depth"),
    },
    async (input) => {
      const { subreddit, article, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/comments/${article}`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_duplicates",
    "Get cross-posts and duplicates of a post. Requires 'read' scope.",
    {
      article: z.string().describe("Post ID (without t3_ prefix)"),
      ...paginationParams,
    },
    async (input) => {
      const { article, ...rest } = input;
      const data = await client.get(
        `/duplicates/${article}`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_info",
    "Get info about things by fullname (e.g. t3_abc123, t1_xyz789). Requires 'read' scope.",
    {
      id: z
        .string()
        .describe(
          "Comma-separated fullnames (e.g. t3_abc123,t1_xyz789)",
        ),
    },
    async (input) => {
      const data = await client.get("/api/info", { id: input.id });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
