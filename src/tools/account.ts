import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { RedditClient } from "../client/reddit.js";

export function registerAccountTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_me",
    "Get the authenticated user's account info (username, karma, etc). Requires 'identity' scope.",
    {},
    async () => {
      const data = await client.get("/api/v1/me");
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_me_karma",
    "Get the authenticated user's karma breakdown by subreddit. Requires 'mysubreddits' scope.",
    {},
    async () => {
      const data = await client.get("/api/v1/me/karma");
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_me_prefs",
    "Get the authenticated user's preferences. Requires 'identity' scope.",
    {},
    async () => {
      const data = await client.get("/api/v1/me/prefs");
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_me_prefs_update",
    "Update the authenticated user's preferences. Requires 'account' scope. Pass a JSON object with preference keys and values.",
    {
      prefs: z
        .record(z.string(), z.unknown())
        .describe(
          "JSON object of preference key-value pairs to update (e.g. {\"over_18\": true, \"hide_downs\": false})",
        ),
    },
    async (input) => {
      const data = await client.patch("/api/v1/me/prefs", input.prefs);
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_me_trophies",
    "Get the authenticated user's trophies. Requires 'identity' scope.",
    {},
    async () => {
      const data = await client.get("/api/v1/me/trophies");
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_me_friends",
    "Get the authenticated user's friends list. Requires 'mysubreddits' scope.",
    {},
    async () => {
      const data = await client.get("/prefs/friends");
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_me_blocked",
    "Get the authenticated user's blocked users list. Requires 'mysubreddits' scope.",
    {},
    async () => {
      const data = await client.get("/prefs/blocked");
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
