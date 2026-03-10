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

export function registerWikiTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_wiki_page",
    "Get the content of a wiki page. Requires 'wikiread' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      page: z.string().describe("Wiki page name (e.g. 'index', 'faq')"),
    },
    async (input) => {
      const data = await client.get(
        `/r/${input.subreddit}/wiki/${input.page}`,
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_wiki_edit",
    "Edit a wiki page. Requires 'wikiedit' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      page: z.string().describe("Wiki page name"),
      content: z.string().describe("Full wiki page content (markdown)"),
      reason: z
        .string()
        .optional()
        .describe("Edit reason (like a commit message)"),
    },
    async (input) => {
      const data = await client.post(
        `/r/${input.subreddit}/api/wiki/edit`,
        {
          page: input.page,
          content: input.content,
          reason: input.reason,
        },
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_wiki_pages",
    "List all wiki pages in a subreddit. Requires 'wikiread' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.get(`/r/${input.subreddit}/wiki/pages`);
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_wiki_revisions",
    "Get revision history for all wiki pages in a subreddit. Requires 'wikiread' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/wiki/revisions`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_wiki_page_revisions",
    "Get revision history for a specific wiki page. Requires 'wikiread' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      page: z.string().describe("Wiki page name"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, page, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/wiki/revisions/${page}`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
