import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { RedditClient } from "../client/reddit.js";

export function registerMultiredditTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_multi_mine",
    "List the authenticated user's multireddits (custom feeds). Requires 'read' scope.",
    {},
    async () => {
      const data = await client.get("/api/multi/mine");
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_multi_get",
    "Get a specific multireddit by path. Requires 'read' scope.",
    {
      multipath: z
        .string()
        .describe("Multireddit path (e.g. /user/username/m/multiname)"),
    },
    async (input) => {
      const data = await client.get(`/api/multi${input.multipath}`);
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_multi_create",
    "Create a new multireddit. Requires 'subscribe' scope.",
    {
      multipath: z
        .string()
        .describe("Multireddit path (e.g. /user/username/m/multiname)"),
      display_name: z.string().describe("Display name for the multireddit"),
      subreddits: z
        .array(z.string())
        .optional()
        .describe("Array of subreddit names to include"),
      visibility: z
        .enum(["private", "public", "hidden"])
        .optional()
        .describe("Visibility (default private)"),
      description_md: z
        .string()
        .optional()
        .describe("Description in markdown"),
    },
    async (input) => {
      const { multipath, display_name, subreddits, visibility, description_md } = input;
      const model = {
        display_name,
        subreddits: subreddits?.map((name) => ({ name })) ?? [],
        visibility: visibility ?? "private",
        description_md: description_md ?? "",
      };
      const data = await client.post(`/api/multi${multipath}`, {
        model: JSON.stringify(model),
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_multi_update",
    "Update an existing multireddit. Requires 'subscribe' scope.",
    {
      multipath: z
        .string()
        .describe("Multireddit path (e.g. /user/username/m/multiname)"),
      display_name: z.string().optional().describe("New display name"),
      subreddits: z
        .array(z.string())
        .optional()
        .describe("Updated array of subreddit names"),
      visibility: z
        .enum(["private", "public", "hidden"])
        .optional()
        .describe("Updated visibility"),
      description_md: z
        .string()
        .optional()
        .describe("Updated description in markdown"),
    },
    async (input) => {
      const { multipath, display_name, subreddits, visibility, description_md } = input;
      const model: Record<string, unknown> = {};
      if (display_name !== undefined) model.display_name = display_name;
      if (subreddits !== undefined) model.subreddits = subreddits.map((name) => ({ name }));
      if (visibility !== undefined) model.visibility = visibility;
      if (description_md !== undefined) model.description_md = description_md;
      const data = await client.put(`/api/multi${multipath}`, { model });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_multi_delete",
    "Delete a multireddit. Requires 'subscribe' scope.",
    {
      multipath: z
        .string()
        .describe("Multireddit path (e.g. /user/username/m/multiname)"),
    },
    async (input) => {
      const data = await client.delete(`/api/multi${input.multipath}`);
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_multi_add_sub",
    "Add a subreddit to a multireddit. Requires 'subscribe' scope.",
    {
      multipath: z
        .string()
        .describe("Multireddit path (e.g. /user/username/m/multiname)"),
      srname: z.string().describe("Subreddit name to add (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.put(
        `/api/multi${input.multipath}/r/${input.srname}`,
        { model: { name: input.srname } },
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_multi_remove_sub",
    "Remove a subreddit from a multireddit. Requires 'subscribe' scope.",
    {
      multipath: z
        .string()
        .describe("Multireddit path (e.g. /user/username/m/multiname)"),
      srname: z
        .string()
        .describe("Subreddit name to remove (without r/ prefix)"),
    },
    async (input) => {
      const data = await client.delete(
        `/api/multi${input.multipath}/r/${input.srname}`,
      );
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
