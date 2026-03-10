# Task 19: Multireddit Tools

**Milestone**: [M6 - Advanced Features & Polish](../../milestones/milestone-6-advanced-features-and-polish.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Implement tools for managing multireddits (custom feeds) — list, get, create, update, delete, and manage subreddits within them.

---

## Steps

### 1. Create src/tools/multireddits.ts

Register 7 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_multi_mine` | GET /api/multi/mine | — | read |
| `reddit_multi_get` | GET /api/multi/{multipath} | multipath | read |
| `reddit_multi_create` | POST /api/multi/{multipath} | multipath, model (JSON: display_name, subreddits, visibility) | subscribe |
| `reddit_multi_update` | PUT /api/multi/{multipath} | multipath, model (JSON) | subscribe |
| `reddit_multi_delete` | DELETE /api/multi/{multipath} | multipath | subscribe |
| `reddit_multi_add_sub` | PUT /api/multi/{multipath}/r/{srname} | multipath, srname, model ({name: srname}) | subscribe |
| `reddit_multi_remove_sub` | DELETE /api/multi/{multipath}/r/{srname} | multipath, srname | subscribe |

### 2. Multipath format
- Format: `/user/{username}/m/{multiname}`
- Example: `/user/spez/m/frontpage`

---

## Verification

- [ ] `reddit_multi_mine` returns user's multireddits
- [ ] CRUD operations work on multireddits
- [ ] Add/remove subreddit from multi works
- [ ] Multipath format correctly handled
- [ ] Unit tests for each tool

---

**Next Task**: [Task 20: Wiki Tools](task-20-wiki-tools.md)
