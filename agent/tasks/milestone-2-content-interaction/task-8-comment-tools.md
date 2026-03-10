# Task 8: Comment Tools

**Milestone**: [M2 - Content Interaction](../../milestones/milestone-2-content-interaction.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: Task 7
**Status**: Not Started

---

## Objective

Implement tools for posting comments/replies and loading collapsed comment threads.

---

## Steps

### 1. Create src/tools/comments.ts

Register 2 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_comment` | POST /api/comment | parent (fullname t1_ or t3_), text | submit |
| `reddit_more_children` | GET /api/morechildren | link_id, children (comma-separated IDs), sort? | read |

### 2. Comment tool details
- `parent` is a fullname: t3_ for posts, t1_ for comments (replies)
- `text` is markdown-formatted
- Returns the created comment data

### 3. More children details
- Used to expand "load more comments" stubs
- `children` is a comma-separated list of comment IDs from the "more" object
- `link_id` is the parent post's fullname

---

## Verification

- [ ] `reddit_comment` posts top-level comments (parent=t3_)
- [ ] `reddit_comment` posts replies (parent=t1_)
- [ ] `reddit_more_children` loads expanded comments
- [ ] Unit tests cover both tools

---

**Next Task**: [Task 9: Vote, Save & Report Tools](task-9-vote-save-report-tools.md)
