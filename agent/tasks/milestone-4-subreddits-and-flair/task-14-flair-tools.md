# Task 14: Flair Tools

**Milestone**: [M4 - Subreddits & Flair](../../milestones/milestone-4-subreddits-and-flair.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 1.5 hours
**Dependencies**: Task 13
**Status**: Not Started

---

## Objective

Implement tools for reading and setting flair on posts and users.

---

## Steps

### 1. Create src/tools/flair.ts

Register 3 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_link_flair` | GET /r/{subreddit}/api/link_flair_v2 | subreddit | flair |
| `reddit_user_flair` | GET /r/{subreddit}/api/user_flair_v2 | subreddit | flair |
| `reddit_select_flair` | POST /r/{subreddit}/api/selectflair | subreddit, flair_template_id, link? (fullname), name? (username), text? | flair |

### 2. Select flair details
- If `link` provided: sets link flair on a post
- If `name` provided: sets user flair
- `flair_template_id` from the link_flair or user_flair listing
- Optional `text` to customize flair text

---

## Verification

- [ ] `reddit_link_flair` returns available post flair templates
- [ ] `reddit_user_flair` returns available user flair templates
- [ ] `reddit_select_flair` sets flair on a post or user
- [ ] Unit tests for each tool

---

**Next Task**: [Task 15: HTTP Transport](task-15-http-transport.md)
