# Task 7: Post Tools

**Milestone**: [M2 - Content Interaction](../../milestones/milestone-2-content-interaction.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Implement tools for creating, editing, deleting, and managing posts — including hide/unhide, NSFW marking, and spoiler marking.

---

## Steps

### 1. Create src/tools/posts.ts

Register 9 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_submit` | POST /api/submit | sr, title, kind (self/link), text/url, nsfw?, spoiler?, flair_id? | submit |
| `reddit_edit` | POST /api/editusertext | thing_id, text | edit |
| `reddit_delete` | POST /api/del | id | edit |
| `reddit_hide` | POST /api/hide | id | report |
| `reddit_unhide` | POST /api/unhide | id | report |
| `reddit_mark_nsfw` | POST /api/marknsfw | id | modposts |
| `reddit_unmark_nsfw` | POST /api/unmarknsfw | id | modposts |
| `reddit_spoiler` | POST /api/spoiler | id | modposts |
| `reddit_unspoiler` | POST /api/unspoiler | id | modposts |

### 2. Submit tool details
- Support both self-posts (text) and link posts (url)
- `kind` parameter: "self" or "link"
- Optional flair_id for post flair
- Return the created post's fullname

### 3. Register in server.ts

---

## Verification

- [ ] `reddit_submit` creates both self and link posts
- [ ] `reddit_edit` updates post/comment text
- [ ] `reddit_delete` removes content
- [ ] Hide/unhide, NSFW, spoiler toggles work
- [ ] All tools validate required parameters
- [ ] Unit tests for each tool

---

**Next Task**: [Task 8: Comment Tools](task-8-comment-tools.md)
