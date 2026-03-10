import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { RedditClient } from "../client/reddit.js";

export function registerVotingTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_vote",
    "Upvote, downvote, or remove vote on a post or comment. Requires 'vote' scope.",
    {
      id: z
        .string()
        .describe("Fullname of the post (t3_) or comment (t1_) to vote on"),
      dir: z
        .enum(["1", "0", "-1"])
        .describe("Vote direction: '1' = upvote, '0' = unvote, '-1' = downvote"),
    },
    async (input) => {
      const data = await client.post("/api/vote", {
        id: input.id,
        dir: input.dir,
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_save",
    "Save a post or comment to your saved list. Requires 'save' scope.",
    {
      id: z
        .string()
        .describe("Fullname of the post (t3_) or comment (t1_) to save"),
      category: z
        .string()
        .optional()
        .describe("Save category name (Reddit Gold feature)"),
    },
    async (input) => {
      const params: Record<string, string | undefined> = {
        id: input.id,
        category: input.category,
      };
      const data = await client.post("/api/save", params);
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_unsave",
    "Remove a post or comment from your saved list. Requires 'save' scope.",
    {
      id: z
        .string()
        .describe("Fullname of the post (t3_) or comment (t1_) to unsave"),
    },
    async (input) => {
      const data = await client.post("/api/unsave", { id: input.id });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_report",
    "Report a post or comment to subreddit moderators. Requires 'report' scope.",
    {
      thing_id: z
        .string()
        .describe("Fullname of the post (t3_) or comment (t1_) to report"),
      reason: z
        .string()
        .describe("Subreddit rule violated (from subreddit rules list)"),
      other_reason: z
        .string()
        .optional()
        .describe("Additional explanation (for 'other' reason)"),
    },
    async (input) => {
      const params: Record<string, string | undefined> = {
        thing_id: input.thing_id,
        reason: input.reason,
        other_reason: input.other_reason,
      };
      const data = await client.post("/api/report", params);
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
