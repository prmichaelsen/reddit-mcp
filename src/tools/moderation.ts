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

export function registerModerationTools(
  server: McpServer,
  client: RedditClient,
): void {
  // === Mod Action Tools (Task 16) ===

  server.tool(
    "reddit_approve",
    "Approve a post or comment in the mod queue. Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post (t3_) or comment (t1_) to approve"),
    },
    async (input) => {
      const data = await client.post("/api/approve", { id: input.id });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_remove",
    "Remove a post or comment as a moderator. Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post (t3_) or comment (t1_) to remove"),
      spam: z
        .boolean()
        .optional()
        .describe("If true, mark as spam (default false)"),
    },
    async (input) => {
      const data = await client.post("/api/remove", {
        id: input.id,
        spam: input.spam !== undefined ? String(input.spam) : undefined,
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_distinguish",
    "Distinguish a post or comment as a moderator. Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post (t3_) or comment (t1_)"),
      how: z
        .enum(["yes", "no", "admin", "special"])
        .describe("'yes' = mod distinguish, 'no' = remove, 'admin' = admin, 'special' = special"),
    },
    async (input) => {
      const data = await client.post("/api/distinguish", {
        id: input.id,
        how: input.how,
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_ignore_reports",
    "Ignore future reports on a post or comment. Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post (t3_) or comment (t1_)"),
    },
    async (input) => {
      const data = await client.post("/api/ignore_reports", { id: input.id });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_unignore_reports",
    "Stop ignoring reports on a post or comment. Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post (t3_) or comment (t1_)"),
    },
    async (input) => {
      const data = await client.post("/api/unignore_reports", { id: input.id });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_lock",
    "Lock a post or comment thread (prevent new comments). Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post (t3_) or comment (t1_) to lock"),
    },
    async (input) => {
      const data = await client.post("/api/lock", { id: input.id });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_unlock",
    "Unlock a previously locked post or comment thread. Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post (t3_) or comment (t1_) to unlock"),
    },
    async (input) => {
      const data = await client.post("/api/unlock", { id: input.id });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  // === Mod Listing Tools (Task 17) ===

  server.tool(
    "reddit_modqueue",
    "Get items in the mod queue awaiting review. Requires 'modposts' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/about/modqueue`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_reports",
    "Get reported posts and comments. Requires 'modposts' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/about/reports`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_spam",
    "Get items marked as spam. Requires 'modposts' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/about/spam`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_edited",
    "Get recently edited posts and comments. Requires 'modposts' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/about/edited`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_modlog",
    "Get the moderation log. Requires 'modlog' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      type: z
        .string()
        .optional()
        .describe("Filter by action type (e.g. banuser, removelink, approvecomment)"),
      mod: z
        .string()
        .optional()
        .describe("Filter by moderator username"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/about/log`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  // === Mod Management Tools (Task 18) ===

  server.tool(
    "reddit_moderators",
    "List moderators of a subreddit. Requires 'read' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.get(
        `/r/${input.subreddit}/about/moderators`,
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_contributors",
    "List approved contributors of a subreddit. Requires 'modcontributors' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/about/contributors`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_banned",
    "List banned users of a subreddit. Requires 'modcontributors' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/about/banned`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_muted",
    "List muted users of a subreddit. Requires 'modcontributors' scope.",
    {
      subreddit: z.string().describe("Subreddit name (without r/ prefix)"),
      ...paginationParams,
    },
    async (input) => {
      const { subreddit, ...rest } = input;
      const data = await client.get(
        `/r/${subreddit}/about/muted`,
        buildParams(rest),
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
