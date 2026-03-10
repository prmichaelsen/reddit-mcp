# Milestone 5: Moderation

**Goal**: Implement moderation action tools, mod listing tools, and mod management tools
**Duration**: 1 week
**Dependencies**: M2 - Content Interaction (for approve/remove patterns)
**Status**: Not Started

---

## Overview

This milestone adds the full suite of moderation tools — actions (approve, remove, distinguish, lock), listing views (modqueue, reports, spam, edited, modlog), and user management (moderators, contributors, banned, muted). These tools enable AI agents to assist with subreddit moderation.

---

## Deliverables

### 1. Mod Action Tools (7 tools)
- Approve, remove, distinguish
- Ignore/unignore reports
- Lock/unlock threads

### 2. Mod Listing Tools (5 tools)
- Modqueue, reports, spam, edited items
- Moderation log

### 3. Mod Management Tools (4 tools)
- List moderators, contributors, banned, muted users

---

## Success Criteria

- [ ] `reddit_approve` approves a queued item
- [ ] `reddit_remove` removes content
- [ ] `reddit_modqueue` returns items awaiting review
- [ ] `reddit_modlog` returns moderation log entries
- [ ] `reddit_moderators` lists subreddit mods
- [ ] All mod tools require correct scopes
- [ ] All tools tested with 70%+ coverage

---

## Tasks

1. [Task 16: Mod Action Tools](../tasks/milestone-5-moderation/task-16-mod-action-tools.md) - Approve, remove, distinguish, ignore reports, lock/unlock
2. [Task 17: Mod Listing Tools](../tasks/milestone-5-moderation/task-17-mod-listing-tools.md) - Modqueue, reports, spam, edited, modlog
3. [Task 18: Mod Management Tools](../tasks/milestone-5-moderation/task-18-mod-management-tools.md) - Moderators, contributors, banned, muted

---

**Next Milestone**: [Milestone 6: Advanced Features & Polish](milestone-6-advanced-features-and-polish.md)
**Blockers**: None
