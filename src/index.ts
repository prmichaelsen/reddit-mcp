import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";
import { createAuthFromEnv } from "./auth/oauth.js";
import { startHttpTransport } from "./transport/http.js";

const args = process.argv.slice(2);

function getArg(name: string): string | undefined {
  const index = args.indexOf(`--${name}`);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return undefined;
}

const transport = getArg("transport") || process.env.TRANSPORT || "stdio";
const port = parseInt(
  getArg("port") || process.env.HTTP_PORT || "3000",
  10,
);
const host = getArg("host") || process.env.HTTP_HOST || "localhost";

const auth = createAuthFromEnv();
const server = createServer(auth);

if (transport === "http") {
  await startHttpTransport(server, { port, host });
} else {
  const stdioTransport = new StdioServerTransport();
  await server.connect(stdioTransport);
}
