# Task 5: Search Tools

**Milestone**: [M1 - Foundation + Listings MVP](../../milestones/milestone-1-foundation-listings-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 1.5 hours
**Dependencies**: Task 4
**Status**: Not Started

---

## Objective

Implement search tools for searching across all of Reddit and within specific subreddits.

---

## Steps

### 1. Create src/tools/search.ts

Register 2 tools:

| Tool | Endpoint | Parameters |
|------|----------|------------|
| `reddit_search` | GET /search | q, sort (relevance/hot/top/new/comments), t (time filter), type (link/sr/user), limit, after, before |
| `reddit_search_subreddit` | GET /r/{subreddit}/search | subreddit, q, restrict_sr=true, sort, t, limit, after, before |

### 2. Register in server.ts
Add search tool registration to the MCP server factory.

---

## Verification

- [ ] Both search tools registered
- [ ] Query parameter (q) is required
- [ ] Sort and time filter parameters validated
- [ ] restrict_sr automatically set for subreddit search
- [ ] Unit tests for search tools

---

**Next Task**: [Task 6: Testing & Verification](task-6-testing-verification.md)
