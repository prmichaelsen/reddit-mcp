# Milestone 6: Advanced Features & Polish

**Goal**: Implement multireddit and wiki tools, finalize documentation, publish-ready
**Duration**: 1 week
**Dependencies**: M1 - Foundation
**Status**: Not Started

---

## Overview

This milestone adds multireddit management tools, wiki tools, comprehensive documentation, and the factory export for mcp-auth integration. This completes the full Reddit API coverage and makes the package publish-ready.

---

## Deliverables

### 1. Multireddit Tools (7 tools)
- List, get, create, update, delete multireddits
- Add/remove subreddits from multis

### 2. Wiki Tools (5 tools)
- Read, edit, list pages
- Revision history

### 3. Documentation & Polish
- Complete README with all 88 tools documented
- CHANGELOG with release history
- Factory export for mcp-auth
- Claude Desktop configuration example

---

## Success Criteria

- [ ] `reddit_multi_mine` returns user's multireddits
- [ ] `reddit_multi_create` creates a multireddit
- [ ] `reddit_wiki_page` reads a wiki page
- [ ] `reddit_wiki_edit` edits a wiki page
- [ ] Factory export works with mcp-auth
- [ ] README documents all tools
- [ ] All tools tested with 70%+ coverage
- [ ] Package publishable to npm

---

## Tasks

1. [Task 19: Multireddit Tools](../tasks/milestone-6-advanced-features-and-polish/task-19-multireddit-tools.md) - Mine, get, create, update, delete, add/remove sub
2. [Task 20: Wiki Tools](../tasks/milestone-6-advanced-features-and-polish/task-20-wiki-tools.md) - Read, edit, pages, revisions
3. [Task 21: Documentation & Polish](../tasks/milestone-6-advanced-features-and-polish/task-21-documentation-polish.md) - README, CHANGELOG, factory export, publish readiness

---

**Blockers**: None
**Notes**: After this milestone, the companion reddit-mcp-server project can be built following the youtube-mcp-server pattern.
