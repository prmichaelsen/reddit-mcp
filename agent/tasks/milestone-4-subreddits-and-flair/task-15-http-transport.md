# Task 15: HTTP Transport

**Milestone**: [M4 - Subreddits & Flair](../../milestones/milestone-4-subreddits-and-flair.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: Task 4
**Status**: Not Started

---

## Objective

Implement the streamable HTTP transport, following the youtube-mcp pattern.

---

## Steps

### 1. Implement src/transport/http.ts

```typescript
export async function startHttpTransport(
  server: McpServer,
  options: { port: number; host: string }
): Promise<void>
```

- Use MCP SDK's `StreamableHTTPServerTransport`
- Per-session transport creation
- Routes:
  - POST /mcp — MCP requests
  - GET /health — health check (`{ status: "ok" }`)
  - Anything else — 404

### 2. Update src/index.ts
- Parse --transport flag (stdio | http)
- Parse --port and --host flags
- Fallback to TRANSPORT, HTTP_PORT, HTTP_HOST env vars
- Default: stdio on port 3000

---

## Verification

- [ ] HTTP transport serves MCP requests on /mcp
- [ ] Health check returns 200 with `{ status: "ok" }`
- [ ] Unknown routes return 404
- [ ] Transport selection works via CLI flags and env vars
- [ ] Unit tests for HTTP transport

---

**Next Task**: [Task 16: Mod Action Tools](../milestone-5-moderation/task-16-mod-action-tools.md)
