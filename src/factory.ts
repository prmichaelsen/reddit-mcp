import { createServerWithToken } from "./server.js";

export function createServer(accessToken: string) {
  return createServerWithToken(accessToken);
}
