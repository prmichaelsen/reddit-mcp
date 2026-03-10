import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RedditAuth } from "./auth/oauth.js";
import { RedditClient } from "./client/reddit.js";
import { registerListingTools } from "./tools/listings.js";
import { registerSearchTools } from "./tools/search.js";
import { registerPostTools } from "./tools/posts.js";
import { registerCommentTools } from "./tools/comments.js";

export function createServer(auth?: RedditAuth): McpServer {
  const server = new McpServer({
    name: "reddit-mcp",
    version: "0.1.0",
  });

  if (auth) {
    const client = new RedditClient(auth);
    registerAllTools(server, client);
  }

  return server;
}

export function createServerWithToken(accessToken: string): McpServer {
  const server = new McpServer({
    name: "reddit-mcp",
    version: "0.1.0",
  });

  const client = new RedditClient(accessToken);
  registerAllTools(server, client);

  return server;
}

function registerAllTools(server: McpServer, client: RedditClient): void {
  registerListingTools(server, client);
  registerSearchTools(server, client);
  registerPostTools(server, client);
  registerCommentTools(server, client);
}
