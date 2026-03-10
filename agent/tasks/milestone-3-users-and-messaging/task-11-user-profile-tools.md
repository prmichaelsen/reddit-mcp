# Task 11: User Profile Tools

**Milestone**: [M3 - Users & Messaging](../../milestones/milestone-3-users-and-messaging.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2.5 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Implement tools for viewing other users' profiles, post/comment history, saved items, votes, trophies, and blocking users.

---

## Steps

### 1. Create src/tools/users.ts

Register 9 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_user_about` | GET /user/{username}/about | username | read |
| `reddit_user_overview` | GET /user/{username}/overview | username, sort?, t?, limit, after, before | history |
| `reddit_user_submitted` | GET /user/{username}/submitted | username, sort?, t?, limit, after, before | history |
| `reddit_user_comments` | GET /user/{username}/comments | username, sort?, t?, limit, after, before | history |
| `reddit_user_saved` | GET /user/{username}/saved | username, sort?, t?, limit, after, before | history |
| `reddit_user_upvoted` | GET /user/{username}/upvoted | username, sort?, t?, limit, after, before | history |
| `reddit_user_downvoted` | GET /user/{username}/downvoted | username, sort?, t?, limit, after, before | history |
| `reddit_user_trophies` | GET /api/v1/user/{username}/trophies | username | read |
| `reddit_block_user` | POST /api/block_user | name | account |

### 2. Listing parameters pattern
All user listing endpoints share: sort (hot/new/top/controversial), t (time filter), limit, after, before. Create a shared zod schema for these.

---

## Verification

- [ ] `reddit_user_about` returns public profile info
- [ ] User listing tools return paginated results
- [ ] `reddit_block_user` blocks a user
- [ ] Shared listing parameters work correctly
- [ ] Unit tests for each tool

---

**Next Task**: [Task 12: Private Message Tools](task-12-private-message-tools.md)
