import {
  createServer as createHttpServer,
  IncomingMessage,
  ServerResponse,
} from "node:http";
import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface HttpTransportOptions {
  port: number;
  host: string;
}

export async function startHttpTransport(
  server: McpServer,
  options: HttpTransportOptions,
): Promise<void> {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
  });

  const httpServer = createHttpServer(
    (req: IncomingMessage, res: ServerResponse) => {
      if (req.url === "/mcp" || req.url === "/mcp/") {
        transport.handleRequest(req, res);
      } else if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok" }));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not found" }));
      }
    },
  );

  await server.connect(transport);

  return new Promise((resolve, reject) => {
    httpServer.listen(options.port, options.host, () => {
      console.error(
        `Reddit MCP server running on http://${options.host}:${options.port}/mcp`,
      );
      resolve();
    });

    httpServer.on("error", reject);
  });
}
