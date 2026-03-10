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

export function registerCommentTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_comment",
    "Post a comment or reply. Use a t3_ fullname as parent for a top-level comment on a post, or a t1_ fullname to reply to another comment. Requires 'submit' scope.",
    {
      parent: z
        .string()
        .describe(
          "Fullname of the parent: t3_ for a post (top-level comment) or t1_ for a comment (reply)",
        ),
      text: z.string().describe("Comment body text (markdown)"),
    },
    async (input) => {
      const data = await client.post("/api/comment", {
        ...buildParams(input),
        api_type: "json",
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_more_children",
    "Load more comments from collapsed 'load more' stubs in a comment thread. Requires 'read' scope.",
    {
      link_id: z
        .string()
        .describe("Fullname of the parent post (t3_)"),
      children: z
        .string()
        .describe(
          "Comma-separated list of comment IDs to expand (from the 'more' object's children array)",
        ),
      sort: z
        .enum(["confidence", "top", "new", "controversial", "old", "qa"])
        .optional()
        .describe("Comment sort order"),
      limit_children: z
        .boolean()
        .optional()
        .describe("If true, only return the children requested (no deeper)"),
    },
    async (input) => {
      const data = await client.get(
        "/api/morechildren",
        {
          ...buildParams(input),
          api_type: "json",
        },
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
