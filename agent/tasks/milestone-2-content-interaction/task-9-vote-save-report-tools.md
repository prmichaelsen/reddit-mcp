# Task 9: Vote, Save & Report Tools

**Milestone**: [M2 - Content Interaction](../../milestones/milestone-2-content-interaction.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 1.5 hours
**Dependencies**: Task 7
**Status**: Not Started

---

## Objective

Implement voting, save/unsave, and report tools.

---

## Steps

### 1. Create src/tools/voting.ts

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_vote` | POST /api/vote | id (fullname), dir (1=up, 0=unvote, -1=down) | vote |

### 2. Create src/tools/save.ts

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_save` | POST /api/save | id, category? | save |
| `reddit_unsave` | POST /api/unsave | id | save |

### 3. Create src/tools/report.ts

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_report` | POST /api/report | thing_id, reason, other_reason? | report |

---

## Verification

- [ ] `reddit_vote` handles upvote (1), downvote (-1), unvote (0)
- [ ] `reddit_save` and `reddit_unsave` toggle save state
- [ ] `reddit_report` sends report with reason
- [ ] All parameters validated with zod
- [ ] Unit tests for each tool

---

**Next Task**: [Task 10: Account Tools](../milestone-3-users-and-messaging/task-10-account-tools.md)
