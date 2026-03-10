# Milestone 1: Foundation + Listings MVP

**Goal**: Establish project infrastructure and implement core read-only Reddit browsing tools
**Duration**: 1 week
**Dependencies**: None
**Status**: Not Started

---

## Overview

This milestone creates the foundational project infrastructure — build system, OAuth authentication, Reddit API client wrapper — and implements the core read-only listing and search tools. This is the MVP that proves the MCP server can authenticate with Reddit and return content.

---

## Deliverables

### 1. Project Infrastructure
- package.json with all metadata, scripts, and dependencies
- TypeScript configuration (tsconfig.json)
- Build system (esbuild.build.js)
- Jest test configuration
- Directory structure: src/, tests/

### 2. Reddit OAuth 2.0 Authentication
- Authorization code flow with PKCE
- Token storage and automatic refresh
- Scope-based access control
- Factory function from environment variables

### 3. Reddit API Client
- HTTP client wrapper using fetch
- Proper User-Agent header
- Rate limit header parsing (X-Ratelimit-Remaining/Reset)
- Error mapping (400, 401, 403, 404, 429, 5xx)
- Retry with exponential backoff

### 4. MCP Server + Listing Tools
- MCP server factory (createServer / createServerWithToken)
- 11 listing and search tools
- stdio transport

---

## Success Criteria

- [ ] `npm run build` completes without errors
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes with 70%+ coverage
- [ ] OAuth flow authenticates with Reddit
- [ ] `reddit_listings_hot` returns posts from a subreddit
- [ ] `reddit_search` returns search results
- [ ] `reddit_comments_thread` returns a post with comments
- [ ] Server starts via stdio transport

---

## Key Files to Create

```
reddit-mcp/
├── package.json
├── tsconfig.json
├── esbuild.build.js
├── jest.config.js
├── .env.example
├── src/
│   ├── index.ts              # Transport selector
│   ├── server.ts             # MCP server factory
│   ├── factory.ts            # Public factory export
│   ├── auth/
│   │   └── oauth.ts          # Reddit OAuth 2.0
│   ├── client/
│   │   └── reddit.ts         # Reddit API HTTP client
│   ├── tools/
│   │   ├── listings.ts       # Listing tools (hot, new, top, etc.)
│   │   └── search.ts         # Search tools
│   ├── transport/
│   │   └── http.ts           # HTTP transport (stubbed)
│   └── types/
│       └── index.ts          # Shared types
└── tests/
    ├── unit/
    │   ├── auth.test.ts
    │   ├── client.test.ts
    │   ├── server.test.ts
    │   ├── listings.test.ts
    │   └── search.test.ts
    ├── fixtures/
    │   └── reddit-responses.ts
    └── helpers/
        └── mock-client.ts
```

---

## Tasks

1. [Task 1: Project Scaffolding](../tasks/milestone-1-foundation-listings-mvp/task-1-project-scaffolding.md) - Set up project structure, config files, dependencies
2. [Task 2: Reddit OAuth 2.0](../tasks/milestone-1-foundation-listings-mvp/task-2-reddit-oauth.md) - Implement OAuth authentication flow
3. [Task 3: Reddit API Client Wrapper](../tasks/milestone-1-foundation-listings-mvp/task-3-reddit-api-client.md) - HTTP client with error handling and retry
4. [Task 4: Listing Tools](../tasks/milestone-1-foundation-listings-mvp/task-4-listing-tools.md) - Implement browsing and comment thread tools
5. [Task 5: Search Tools](../tasks/milestone-1-foundation-listings-mvp/task-5-search-tools.md) - Implement search across Reddit and subreddits
6. [Task 6: Testing & Verification](../tasks/milestone-1-foundation-listings-mvp/task-6-testing-verification.md) - Unit tests, fixtures, CI readiness

---

## Environment Variables

```env
# Reddit OAuth
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_REDIRECT_URI=http://localhost:8080/callback
REDDIT_USER_AGENT=platform:app-id:v0.1.0 (by /u/username)

# Token Storage
TOKEN_STORAGE_PATH=./.tokens/reddit.json

# Transport
TRANSPORT=stdio
HTTP_PORT=3000
HTTP_HOST=localhost
```

---

## Testing Requirements

- [ ] Unit tests for OAuth flow (token exchange, refresh)
- [ ] Unit tests for API client (error mapping, retry logic)
- [ ] Unit tests for each listing tool (parameter validation, response formatting)
- [ ] Unit tests for search tools
- [ ] Mock client for isolated testing
- [ ] Response fixtures for consistent test data

---

**Next Milestone**: [Milestone 2: Content Interaction](milestone-2-content-interaction.md)
**Blockers**: None
