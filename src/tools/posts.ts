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

export function registerPostTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_submit",
    "Create a new post (self-post or link). Requires 'submit' scope.",
    {
      sr: z.string().describe("Subreddit name to post in (without r/ prefix)"),
      title: z.string().describe("Post title"),
      kind: z
        .enum(["self", "link"])
        .describe("Post type: 'self' for text post, 'link' for URL post"),
      text: z
        .string()
        .optional()
        .describe("Post body text (markdown). Required for self posts."),
      url: z
        .string()
        .optional()
        .describe("URL to submit. Required for link posts."),
      nsfw: z
        .boolean()
        .optional()
        .describe("Mark as NSFW"),
      spoiler: z
        .boolean()
        .optional()
        .describe("Mark as spoiler"),
      flair_id: z
        .string()
        .optional()
        .describe("Flair template ID"),
      flair_text: z
        .string()
        .optional()
        .describe("Flair text (if flair allows custom text)"),
      resubmit: z
        .boolean()
        .optional()
        .describe("Allow resubmitting a previously submitted link"),
      sendreplies: z
        .boolean()
        .optional()
        .describe("Send replies to inbox (default true)"),
    },
    async (input) => {
      const data = await client.post("/api/submit", {
        ...buildParams(input),
        api_type: "json",
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_edit",
    "Edit the body text of a self-post or comment. Requires 'edit' scope.",
    {
      thing_id: z
        .string()
        .describe("Fullname of the post (t3_) or comment (t1_) to edit"),
      text: z.string().describe("New body text (markdown)"),
    },
    async (input) => {
      const data = await client.post("/api/editusertext", {
        ...buildParams(input),
        api_type: "json",
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_delete",
    "Delete a post or comment. Requires 'edit' scope.",
    {
      id: z
        .string()
        .describe("Fullname of the post (t3_) or comment (t1_) to delete"),
    },
    async (input) => {
      const data = await client.post("/api/del", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_hide",
    "Hide a post from your listings. Requires 'report' scope.",
    {
      id: z.string().describe("Fullname of the post to hide (t3_)"),
    },
    async (input) => {
      const data = await client.post("/api/hide", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_unhide",
    "Unhide a previously hidden post. Requires 'report' scope.",
    {
      id: z.string().describe("Fullname of the post to unhide (t3_)"),
    },
    async (input) => {
      const data = await client.post("/api/unhide", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_mark_nsfw",
    "Mark a post as NSFW. Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post to mark NSFW (t3_)"),
    },
    async (input) => {
      const data = await client.post("/api/marknsfw", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_unmark_nsfw",
    "Remove NSFW mark from a post. Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post to unmark NSFW (t3_)"),
    },
    async (input) => {
      const data = await client.post("/api/unmarknsfw", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_spoiler",
    "Mark a post as a spoiler. Requires 'modposts' scope.",
    {
      id: z.string().describe("Fullname of the post to mark as spoiler (t3_)"),
    },
    async (input) => {
      const data = await client.post("/api/spoiler", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_unspoiler",
    "Remove spoiler mark from a post. Requires 'modposts' scope.",
    {
      id: z
        .string()
        .describe("Fullname of the post to remove spoiler mark (t3_)"),
    },
    async (input) => {
      const data = await client.post("/api/unspoiler", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
