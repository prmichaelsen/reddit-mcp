import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { RedditClient } from "../client/reddit.js";

const paginationParams = {
  limit: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .describe("Number of messages to return (1-100, default 25)"),
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

export function registerMessageTools(
  server: McpServer,
  client: RedditClient,
): void {
  server.tool(
    "reddit_inbox",
    "Get the authenticated user's inbox messages. Requires 'privatemessages' scope.",
    { ...paginationParams },
    async (input) => {
      const data = await client.get("/message/inbox", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_unread",
    "Get the authenticated user's unread messages. Requires 'privatemessages' scope.",
    { ...paginationParams },
    async (input) => {
      const data = await client.get("/message/unread", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_sent",
    "Get the authenticated user's sent messages. Requires 'privatemessages' scope.",
    { ...paginationParams },
    async (input) => {
      const data = await client.get("/message/sent", buildParams(input));
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_compose",
    "Send a private message to a user. Requires 'privatemessages' scope.",
    {
      to: z.string().describe("Recipient username (without /u/ prefix)"),
      subject: z.string().describe("Message subject"),
      text: z.string().describe("Message body (markdown)"),
    },
    async (input) => {
      const data = await client.post("/api/compose", {
        ...buildParams(input),
        api_type: "json",
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_read_message",
    "Mark a message as read. Requires 'privatemessages' scope.",
    {
      id: z
        .string()
        .describe("Fullname of the message to mark as read (t4_)"),
    },
    async (input) => {
      const data = await client.post("/api/read_message", {
        id: input.id,
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_unread_message",
    "Mark a message as unread. Requires 'privatemessages' scope.",
    {
      id: z
        .string()
        .describe("Fullname of the message to mark as unread (t4_)"),
    },
    async (input) => {
      const data = await client.post("/api/unread_message", {
        id: input.id,
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );

  server.tool(
    "reddit_del_msg",
    "Delete a message from your inbox. Requires 'privatemessages' scope.",
    {
      id: z
        .string()
        .describe("Fullname of the message to delete (t4_)"),
    },
    async (input) => {
      const data = await client.post("/api/del_msg", {
        id: input.id,
      });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    },
  );
}
