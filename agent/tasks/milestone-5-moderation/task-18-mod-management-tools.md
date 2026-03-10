# Task 18: Mod Management Tools

**Milestone**: [M5 - Moderation](../../milestones/milestone-5-moderation.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 1.5 hours
**Dependencies**: Task 16
**Status**: Not Started

---

## Objective

Implement tools for listing moderators, approved contributors, banned users, and muted users.

---

## Steps

### 1. Add to src/tools/moderation.ts

Register 4 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_moderators` | GET /r/{subreddit}/about/moderators | subreddit | read |
| `reddit_contributors` | GET /r/{subreddit}/about/contributors | subreddit, limit, after, before | modcontributors |
| `reddit_banned` | GET /r/{subreddit}/about/banned | subreddit, limit, after, before | modcontributors |
| `reddit_muted` | GET /r/{subreddit}/about/muted | subreddit, limit, after, before | modcontributors |

---

## Verification

- [ ] All 4 tools registered with correct scopes
- [ ] `reddit_moderators` returns mod list
- [ ] `reddit_banned` returns banned user list with reasons
- [ ] Pagination works for contributor/banned/muted lists
- [ ] Unit tests for each tool

---

**Next Task**: [Task 19: Multireddit Tools](../milestone-6-advanced-features-and-polish/task-19-multireddit-tools.md)
