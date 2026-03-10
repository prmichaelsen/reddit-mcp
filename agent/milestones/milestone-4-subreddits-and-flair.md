# Milestone 4: Subreddits & Flair

**Goal**: Implement subreddit discovery, subscription management, flair tools, and HTTP transport
**Duration**: 1 week
**Dependencies**: M1 - Foundation + Listings MVP
**Status**: Not Started

---

## Overview

This milestone adds subreddit management tools (info, rules, subscribe, search, discovery), flair tools (read and set link/user flair), and the streamable HTTP transport for deployment scenarios.

---

## Deliverables

### 1. Subreddit Tools (8 tools)
- Subreddit info and rules
- Subscribe/unsubscribe
- List my subs, popular, new, search

### 2. Flair Tools (3 tools)
- Get link flair options
- Get user flair options
- Set flair on post or user

### 3. Streamable HTTP Transport
- HTTP server with MCP StreamableHTTPServerTransport
- Health check endpoint
- Per-session transport handling

---

## Success Criteria

- [ ] `reddit_subreddit_about` returns subreddit info
- [ ] `reddit_subscribe` subscribes to a subreddit
- [ ] `reddit_subreddits_search` finds subreddits
- [ ] `reddit_link_flair` returns available flair
- [ ] HTTP transport serves MCP requests
- [ ] Health check returns OK
- [ ] All tools tested with 70%+ coverage

---

## Tasks

1. [Task 13: Subreddit Tools](../tasks/milestone-4-subreddits-and-flair/task-13-subreddit-tools.md) - About, rules, subscribe, mine, popular, new, search
2. [Task 14: Flair Tools](../tasks/milestone-4-subreddits-and-flair/task-14-flair-tools.md) - Link flair, user flair, select flair
3. [Task 15: HTTP Transport](../tasks/milestone-4-subreddits-and-flair/task-15-http-transport.md) - Streamable HTTP transport implementation

---

**Next Milestone**: [Milestone 5: Moderation](milestone-5-moderation.md)
**Blockers**: None
