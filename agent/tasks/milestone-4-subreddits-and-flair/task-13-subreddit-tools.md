# Task 13: Subreddit Tools

**Milestone**: [M4 - Subreddits & Flair](../../milestones/milestone-4-subreddits-and-flair.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2.5 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Implement tools for subreddit discovery, info, rules, subscription management, and search.

---

## Steps

### 1. Create src/tools/subreddits.ts

Register 8 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_subreddit_about` | GET /r/{subreddit}/about | subreddit | read |
| `reddit_subreddit_rules` | GET /r/{subreddit}/about/rules | subreddit | read |
| `reddit_subscribe` | POST /api/subscribe | sr_name, action=sub | subscribe |
| `reddit_unsubscribe` | POST /api/subscribe | sr_name, action=unsub | subscribe |
| `reddit_subreddits_mine` | GET /subreddits/mine/subscriber | limit, after, before | mysubreddits |
| `reddit_subreddits_popular` | GET /subreddits/popular | limit, after, before | read |
| `reddit_subreddits_new` | GET /subreddits/new | limit, after, before | read |
| `reddit_subreddits_search` | GET /subreddits/search | q, limit, after, before | read |

---

## Verification

- [ ] `reddit_subreddit_about` returns subreddit metadata
- [ ] `reddit_subreddit_rules` returns rules list
- [ ] Subscribe/unsubscribe toggle subscription
- [ ] `reddit_subreddits_mine` lists user's subscriptions
- [ ] `reddit_subreddits_search` finds subreddits by query
- [ ] Unit tests for each tool

---

**Next Task**: [Task 14: Flair Tools](task-14-flair-tools.md)
