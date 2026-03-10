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

export function registerFlairTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_link_flair",
    "Get available link (post) flair templates for a subreddit. Requires 'flair' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.get(
        `/r/${input.subreddit}/api/link_flair_v2`,
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_user_flair",
    "Get available user flair templates for a subreddit. Requires 'flair' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.get(
        `/r/${input.subreddit}/api/user_flair_v2`,
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_select_flair",
    "Set flair on a post or user in a subreddit. Provide 'link' for post flair or 'name' for user flair. Requires 'flair' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      flair_template_id: z
        .string()
        .describe("Flair template ID (from link_flair or user_flair listing)"),
      link: z
        .string()
        .optional()
        .describe("Post fullname (t3_) to set link flair on"),
      name: z
        .string()
        .optional()
        .describe("Username to set user flair for"),
      text: z
        .string()
        .optional()
        .describe("Custom flair text (if template allows)"),
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.post(
        `/r/${subreddit}/api/selectflair`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
