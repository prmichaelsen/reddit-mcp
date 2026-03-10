# Task 16: Mod Action Tools

**Milestone**: [M5 - Moderation](../../milestones/milestone-5-moderation.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Implement moderator action tools — approve, remove, distinguish, ignore reports, lock/unlock.

---

## Steps

### 1. Create src/tools/moderation.ts

Register 7 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_approve` | POST /api/approve | id (fullname) | modposts |
| `reddit_remove` | POST /api/remove | id, spam? (boolean) | modposts |
| `reddit_distinguish` | POST /api/distinguish | id, how (yes/no/admin/special) | modposts |
| `reddit_ignore_reports` | POST /api/ignore_reports | id | modposts |
| `reddit_unignore_reports` | POST /api/unignore_reports | id | modposts |
| `reddit_lock` | POST /api/lock | id | modposts |
| `reddit_unlock` | POST /api/unlock | id | modposts |

### 2. Distinguish details
- `how`: "yes" = mod distinguish, "no" = remove distinguish, "admin" = admin, "special" = special

---

## Verification

- [ ] All 7 mod action tools registered
- [ ] Each tool requires modposts scope
- [ ] `reddit_remove` supports spam flag
- [ ] `reddit_distinguish` handles all `how` values
- [ ] Unit tests for each tool

---

**Next Task**: [Task 17: Mod Listing Tools](task-17-mod-listing-tools.md)
