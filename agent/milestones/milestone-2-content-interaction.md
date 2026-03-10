# Milestone 2: Content Interaction

**Goal**: Implement write operations — posting, commenting, voting, saving, and reporting
**Duration**: 1 week
**Dependencies**: M1 - Foundation + Listings MVP
**Status**: Not Started

---

## Overview

This milestone adds all content interaction tools — the ability to create posts, write comments, vote on content, save items, and report content. These are the core write operations that make the MCP server useful for active Reddit participation.

---

## Deliverables

### 1. Post Tools (8 tools)
- Submit new posts (link and self-post)
- Edit self-posts
- Delete posts
- Hide/unhide, NSFW marking, spoiler marking

### 2. Comment Tools (2 tools)
- Post comments and replies
- Load more comments from collapsed threads

### 3. Vote, Save & Report Tools (4 tools)
- Upvote/downvote/unvote
- Save/unsave content
- Report content

---

## Success Criteria

- [ ] `reddit_submit` creates a self-post and link post
- [ ] `reddit_comment` posts a reply to a post
- [ ] `reddit_vote` upvotes/downvotes content
- [ ] `reddit_save` and `reddit_unsave` work correctly
- [ ] All tools have proper zod validation
- [ ] All tools include scope requirements in descriptions
- [ ] Unit tests pass with 70%+ coverage

---

## Tasks

1. [Task 7: Post Tools](../tasks/milestone-2-content-interaction/task-7-post-tools.md) - Submit, edit, delete, hide, NSFW, spoiler
2. [Task 8: Comment Tools](../tasks/milestone-2-content-interaction/task-8-comment-tools.md) - Comment, reply, more_children
3. [Task 9: Vote, Save & Report Tools](../tasks/milestone-2-content-interaction/task-9-vote-save-report-tools.md) - Vote, save/unsave, report

---

**Next Milestone**: [Milestone 3: Users & Messaging](milestone-3-users-and-messaging.md)
**Blockers**: None
