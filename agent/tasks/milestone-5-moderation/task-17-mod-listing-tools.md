# Task 17: Mod Listing Tools

**Milestone**: [M5 - Moderation](../../milestones/milestone-5-moderation.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: Task 16
**Status**: Not Started

---

## Objective

Implement tools for viewing moderation queues, reports, spam, edited items, and the moderation log.

---

## Steps

### 1. Add to src/tools/moderation.ts (or create src/tools/mod-listings.ts)

Register 5 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_modqueue` | GET /r/{subreddit}/about/modqueue | subreddit, limit, after, before | modposts |
| `reddit_reports` | GET /r/{subreddit}/about/reports | subreddit, limit, after, before | modposts |
| `reddit_spam` | GET /r/{subreddit}/about/spam | subreddit, limit, after, before | modposts |
| `reddit_edited` | GET /r/{subreddit}/about/edited | subreddit, limit, after, before | modposts |
| `reddit_modlog` | GET /r/{subreddit}/about/log | subreddit, type?, mod?, limit, after, before | modlog |

### 2. Modlog details
- `type` filter: banuser, unbanuser, removelink, removecomment, approvelink, approvecomment, etc.
- `mod` filter: moderator username

---

## Verification

- [ ] All 5 mod listing tools registered
- [ ] `reddit_modqueue` returns items awaiting review
- [ ] `reddit_modlog` supports type and mod filters
- [ ] Pagination works correctly
- [ ] Unit tests for each tool

---

**Next Task**: [Task 18: Mod Management Tools](task-18-mod-management-tools.md)
