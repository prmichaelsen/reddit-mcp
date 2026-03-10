# Task 4: Listing Tools

**Milestone**: [M1 - Foundation + Listings MVP](../../milestones/milestone-1-foundation-listings-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 3
**Status**: Not Started

---

## Objective

Implement the core listing tools that allow browsing Reddit — hot, new, top, rising, controversial, best posts, comment threads, duplicates, and info lookup.

---

## Steps

### 1. Create MCP server factory (src/server.ts)

```typescript
export function createServer(auth?: RedditAuth): McpServer
export function createServerWithToken(accessToken: string): McpServer
```

### 2. Create src/tools/listings.ts

Register 9 tools:

| Tool | Endpoint | Parameters |
|------|----------|------------|
| `reddit_listings_best` | GET /best | limit, after, before |
| `reddit_listings_hot` | GET /r/{subreddit}/hot or /hot | subreddit?, limit, after, before |
| `reddit_listings_new` | GET /r/{subreddit}/new or /new | subreddit?, limit, after, before |
| `reddit_listings_rising` | GET /r/{subreddit}/rising or /rising | subreddit?, limit, after, before |
| `reddit_listings_top` | GET /r/{subreddit}/top or /top | subreddit?, t (hour/day/week/month/year/all), limit, after, before |
| `reddit_listings_controversial` | GET /r/{subreddit}/controversial | subreddit?, t, limit, after, before |
| `reddit_comments_thread` | GET /r/{subreddit}/comments/{article} | subreddit, article, sort?, limit?, depth? |
| `reddit_duplicates` | GET /duplicates/{article} | article, limit, after, before |
| `reddit_info` | GET /api/info | id (fullname, e.g. t3_abc123) |

### 3. Tool pattern
Each tool:
- Define zod schema for input validation
- Register via `server.tool(name, description, schema, handler)`
- Include scope requirement in description
- Return JSON-serialized API response

### 4. Create src/index.ts
Transport selector: parse --transport flag, default to stdio.

---

## Verification

- [ ] All 9 listing tools registered on MCP server
- [ ] Each tool validates input with zod
- [ ] Tools correctly build Reddit API URLs
- [ ] Subreddit parameter is optional for frontpage listings
- [ ] Comment thread tool supports sort and depth
- [ ] Unit tests for each tool

---

**Next Task**: [Task 5: Search Tools](task-5-search-tools.md)
