# Task 10: Account Tools

**Milestone**: [M3 - Users & Messaging](../../milestones/milestone-3-users-and-messaging.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Implement tools for viewing and managing the authenticated user's account — info, karma, preferences, trophies, friends, and blocked users.

---

## Steps

### 1. Create src/tools/account.ts

Register 7 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_me` | GET /api/v1/me | — | identity |
| `reddit_me_karma` | GET /api/v1/me/karma | — | mysubreddits |
| `reddit_me_prefs` | GET /api/v1/me/prefs | — | identity |
| `reddit_me_prefs_update` | PATCH /api/v1/me/prefs | prefs (JSON object) | account |
| `reddit_me_trophies` | GET /api/v1/me/trophies | — | identity |
| `reddit_me_friends` | GET /prefs/friends | — | mysubreddits |
| `reddit_me_blocked` | GET /prefs/blocked | — | mysubreddits |

---

## Verification

- [ ] `reddit_me` returns user profile data
- [ ] `reddit_me_karma` returns subreddit karma breakdown
- [ ] `reddit_me_prefs_update` accepts and applies preference changes
- [ ] Unit tests for each tool

---

**Next Task**: [Task 11: User Profile Tools](task-11-user-profile-tools.md)
