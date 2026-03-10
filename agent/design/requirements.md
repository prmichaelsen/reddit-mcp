# Project Requirements

**Project Name**: reddit-mcp
**Created**: 2026-03-10
**Status**: Active

---

## Overview

An MCP server that wraps the Reddit API, enabling AI agents to browse, post, comment, vote, moderate, and manage Reddit content through the Model Context Protocol. Authenticated via Reddit OAuth 2.0.

---

## Problem Statement

AI agents have no native way to interact with Reddit. Users must manually browse subreddits, post content, manage messages, and moderate communities outside their agent workflows. An MCP server bridging the Reddit API lets agents automate these tasks directly.

---

## Goals and Objectives

### Primary Goals
1. Expose comprehensive Reddit API endpoints as MCP tools (~60+ tools)
2. Implement Reddit OAuth 2.0 authentication with automatic token refresh
3. Support both stdio and streamable HTTP transports

### Secondary Goals
1. Provide clear error messages mapping Reddit API errors
2. Rate-limit-aware usage (respect 100 QPM per OAuth client)
3. Export server factory for multi-tenant use via mcp-auth

---

## Functional Requirements

### Priority 1 — Listings & Search (MVP)

These endpoints ship first — core read-only browsing.

| # | Category | MCP Tool Name | Description | Scope |
|---|----------|---------------|-------------|-------|
| 1 | Listings | `reddit_listings_best` | Get best posts | read |
| 2 | Listings | `reddit_listings_hot` | Get hot posts (frontpage or subreddit) | read |
| 3 | Listings | `reddit_listings_new` | Get newest posts | read |
| 4 | Listings | `reddit_listings_rising` | Get rising posts | read |
| 5 | Listings | `reddit_listings_top` | Get top posts (with time filter) | read |
| 6 | Listings | `reddit_listings_controversial` | Get controversial posts | read |
| 7 | Listings | `reddit_comments_thread` | Get post with full comment tree | read |
| 8 | Listings | `reddit_duplicates` | Get cross-posts / duplicates | read |
| 9 | Search | `reddit_search` | Search all of Reddit | read |
| 10 | Search | `reddit_search_subreddit` | Search within a subreddit | read |
| 11 | Listings | `reddit_info` | Get info about things by fullname | read |

### Priority 2 — Content Interaction

Submit, comment, vote, save — core write operations.

| # | Category | MCP Tool Name | Description | Scope |
|---|----------|---------------|-------------|-------|
| 12 | Posts | `reddit_submit` | Create a new post (link or self) | submit |
| 13 | Posts | `reddit_edit` | Edit a self-post or comment | edit |
| 14 | Posts | `reddit_delete` | Delete a post or comment | edit |
| 15 | Posts | `reddit_hide` | Hide a post | report |
| 16 | Posts | `reddit_unhide` | Unhide a post | report |
| 17 | Posts | `reddit_mark_nsfw` | Mark post as NSFW | modposts |
| 18 | Posts | `reddit_unmark_nsfw` | Unmark post as NSFW | modposts |
| 19 | Posts | `reddit_spoiler` | Mark post as spoiler | modposts |
| 20 | Posts | `reddit_unspoiler` | Unmark post as spoiler | modposts |
| 21 | Comments | `reddit_comment` | Post a comment or reply | submit |
| 22 | Comments | `reddit_more_children` | Load more comments from "more" stubs | read |
| 23 | Voting | `reddit_vote` | Upvote, downvote, or unvote | vote |
| 24 | Save | `reddit_save` | Save a post or comment | save |
| 25 | Save | `reddit_unsave` | Unsave a post or comment | save |
| 26 | Report | `reddit_report` | Report content to moderators | report |

### Priority 3 — Account & Users

| # | Category | MCP Tool Name | Description | Scope |
|---|----------|---------------|-------------|-------|
| 27 | Account | `reddit_me` | Get authenticated user's info | identity |
| 28 | Account | `reddit_me_karma` | Get karma breakdown by subreddit | mysubreddits |
| 29 | Account | `reddit_me_prefs` | Get user preferences | identity |
| 30 | Account | `reddit_me_prefs_update` | Update user preferences | account |
| 31 | Account | `reddit_me_trophies` | Get user's trophies | identity |
| 32 | Account | `reddit_me_friends` | Get friend list | mysubreddits |
| 33 | Account | `reddit_me_blocked` | Get blocked users | mysubreddits |
| 34 | Users | `reddit_user_about` | Get user's public profile | read |
| 35 | Users | `reddit_user_submitted` | Get user's posts | history |
| 36 | Users | `reddit_user_comments` | Get user's comments | history |
| 37 | Users | `reddit_user_overview` | Get user's posts + comments | history |
| 38 | Users | `reddit_user_saved` | Get user's saved items | history |
| 39 | Users | `reddit_user_upvoted` | Get user's upvoted items | history |
| 40 | Users | `reddit_user_downvoted` | Get user's downvoted items | history |
| 41 | Users | `reddit_user_trophies` | Get user's trophies | read |
| 42 | Users | `reddit_block_user` | Block a user | account |

### Priority 4 — Subreddits, Flair & Messages

| # | Category | MCP Tool Name | Description | Scope |
|---|----------|---------------|-------------|-------|
| 43 | Subreddits | `reddit_subreddit_about` | Get subreddit info | read |
| 44 | Subreddits | `reddit_subreddit_rules` | Get subreddit rules | read |
| 45 | Subreddits | `reddit_subscribe` | Subscribe to a subreddit | subscribe |
| 46 | Subreddits | `reddit_unsubscribe` | Unsubscribe from a subreddit | subscribe |
| 47 | Subreddits | `reddit_subreddits_mine` | List my subscriptions | mysubreddits |
| 48 | Subreddits | `reddit_subreddits_popular` | List popular subreddits | read |
| 49 | Subreddits | `reddit_subreddits_new` | List new subreddits | read |
| 50 | Subreddits | `reddit_subreddits_search` | Search for subreddits | read |
| 51 | Flair | `reddit_link_flair` | Get available link flair for subreddit | flair |
| 52 | Flair | `reddit_user_flair` | Get available user flair for subreddit | flair |
| 53 | Flair | `reddit_select_flair` | Set flair on a post or user | flair |
| 54 | Messages | `reddit_inbox` | Get inbox messages | privatemessages |
| 55 | Messages | `reddit_unread` | Get unread messages | privatemessages |
| 56 | Messages | `reddit_sent` | Get sent messages | privatemessages |
| 57 | Messages | `reddit_compose` | Send a private message | privatemessages |
| 58 | Messages | `reddit_read_message` | Mark message as read | privatemessages |
| 59 | Messages | `reddit_unread_message` | Mark message as unread | privatemessages |
| 60 | Messages | `reddit_del_msg` | Delete a message | privatemessages |

### Priority 5 — Moderation

| # | Category | MCP Tool Name | Description | Scope |
|---|----------|---------------|-------------|-------|
| 61 | Mod Actions | `reddit_approve` | Approve a post or comment | modposts |
| 62 | Mod Actions | `reddit_remove` | Remove a post or comment | modposts |
| 63 | Mod Actions | `reddit_distinguish` | Distinguish a comment as mod | modposts |
| 64 | Mod Actions | `reddit_ignore_reports` | Ignore reports on an item | modposts |
| 65 | Mod Actions | `reddit_unignore_reports` | Unignore reports on an item | modposts |
| 66 | Mod Actions | `reddit_lock` | Lock a thread | modposts |
| 67 | Mod Actions | `reddit_unlock` | Unlock a thread | modposts |
| 68 | Mod Listings | `reddit_modqueue` | Get moderation queue | modposts |
| 69 | Mod Listings | `reddit_reports` | Get reported items | modposts |
| 70 | Mod Listings | `reddit_spam` | Get spam items | modposts |
| 71 | Mod Listings | `reddit_edited` | Get recently edited items | modposts |
| 72 | Mod Listings | `reddit_modlog` | Get moderation log | modlog |
| 73 | Mod Mgmt | `reddit_moderators` | List subreddit moderators | read |
| 74 | Mod Mgmt | `reddit_contributors` | List subreddit contributors | modcontributors |
| 75 | Mod Mgmt | `reddit_banned` | List banned users | modcontributors |
| 76 | Mod Mgmt | `reddit_muted` | List muted users | modcontributors |

### Priority 6 — Multireddits & Wiki

| # | Category | MCP Tool Name | Description | Scope |
|---|----------|---------------|-------------|-------|
| 77 | Multis | `reddit_multi_mine` | List my multireddits | read |
| 78 | Multis | `reddit_multi_get` | Get a multireddit | read |
| 79 | Multis | `reddit_multi_create` | Create a multireddit | subscribe |
| 80 | Multis | `reddit_multi_update` | Update a multireddit | subscribe |
| 81 | Multis | `reddit_multi_delete` | Delete a multireddit | subscribe |
| 82 | Multis | `reddit_multi_add_sub` | Add subreddit to multi | subscribe |
| 83 | Multis | `reddit_multi_remove_sub` | Remove subreddit from multi | subscribe |
| 84 | Wiki | `reddit_wiki_page` | Read a wiki page | wikiread |
| 85 | Wiki | `reddit_wiki_edit` | Edit a wiki page | wikiedit |
| 86 | Wiki | `reddit_wiki_pages` | List wiki pages | wikiread |
| 87 | Wiki | `reddit_wiki_revisions` | Get wiki revision history | wikiread |
| 88 | Wiki | `reddit_wiki_page_revisions` | Get page revision history | wikiread |

---

## Non-Functional Requirements

### Performance
- MCP tool calls should add < 100ms overhead on top of Reddit API latency
- Support concurrent tool calls

### Security
- OAuth 2.0 tokens never logged or exposed in tool outputs
- Refresh tokens stored with restrictive file permissions (0o600)
- Request minimum scopes needed per operation

### Reliability
- Graceful handling of rate limit exhaustion (429 responses)
- Retry with exponential backoff on transient 5xx errors (max 3 retries)
- Respect X-Ratelimit-Remaining / X-Ratelimit-Reset headers

---

## Technical Requirements

### Technology Stack
- **Language**: TypeScript 5.x
- **Runtime**: Node.js 20+
- **Protocol**: MCP (via @modelcontextprotocol/sdk)
- **API Client**: Raw fetch with Reddit OAuth headers
- **Auth**: Reddit OAuth 2.0 (code grant + refresh tokens)
- **Validation**: zod
- **Build**: esbuild
- **Test**: Jest

### Dependencies
- `@modelcontextprotocol/sdk` — MCP server implementation
- `zod` — Input validation for tool parameters

### Reddit OAuth Scopes Used
- `identity` — /api/v1/me
- `read` — Browse listings, search, subreddit info
- `submit` — Create posts and comments
- `edit` — Edit and delete own content
- `vote` — Upvote/downvote
- `save` — Save/unsave
- `subscribe` — Subscribe/unsubscribe, multireddits
- `mysubreddits` — List my subs, karma
- `history` — User post/comment history
- `privatemessages` — Read/send private messages
- `flair` — Read/set flair
- `report` — Report/hide content
- `modposts` — Mod actions on posts/comments
- `modlog` — Read mod log
- `modcontributors` — Manage contributors/banned/muted
- `wikiread` — Read wiki pages
- `wikiedit` — Edit wiki pages
- `account` — Update prefs, block users

---

## User Stories

### As an AI Agent
1. I want to browse subreddit listings so I can summarize what's trending
2. I want to search Reddit so I can find relevant discussions for users
3. I want to post and comment so I can participate in discussions on behalf of users
4. I want to read and send private messages so I can manage user communications
5. I want to moderate subreddits so I can help manage communities

### As a Developer
1. I want to connect this MCP server to Claude so my agent can interact with Reddit
2. I want clear error messages so I can debug API issues quickly
3. I want both stdio and HTTP transport so I can deploy flexibly

---

## Constraints

### Technical Constraints
- Reddit API rate limit: 100 QPM per OAuth client ID (averaged over 10-min window)
- Reddit requires unique descriptive User-Agent header
- OAuth requires user interaction for initial consent (authorization code flow)
- No official Reddit Node.js SDK — raw HTTP client needed

### Resource Constraints
- Single developer
- Must work within free-tier API access for development

---

## Success Criteria

### MVP Success Criteria
- [ ] OAuth 2.0 flow working (authorize, token refresh)
- [ ] Listing tools return posts from subreddits (hot, new, top, etc.)
- [ ] Search tool returns results
- [ ] Comment thread tool returns full comment trees
- [ ] Server works via stdio transport
- [ ] All Priority 1 endpoints implemented and tested

### Full Release Success Criteria
- [ ] All 88 endpoints implemented
- [ ] Both stdio and streamable HTTP transports working
- [ ] Comprehensive error handling with rate limit awareness
- [ ] Documentation and usage examples
- [ ] Factory export for mcp-auth integration

---

## Out of Scope

1. **Reddit Ads API** — separate API, separate project
2. **Reddit Streaming (websocket)** — not in standard API
3. **OAuth server/auth proxy** — handled by separate mcp-auth/reddit-mcp-server project
4. **Web UI** — this is an MCP server only
5. **Subreddit creation/settings** — complex mod-only operations, future enhancement
6. **Reddit Chat** — uses different protocol, not standard API

---

## Assumptions

1. Users have a registered Reddit OAuth application (script or web type)
2. Users have OAuth client ID and secret configured
3. MCP SDK remains stable
4. Reddit API endpoints remain stable

---

## Risks

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Reddit API rate limiting | Medium | High | Respect rate limit headers, exponential backoff |
| Reddit API access restrictions tightening | High | Medium | Follow Reddit developer guidelines, register app properly |
| No official Node.js SDK | Medium | N/A | Build thin HTTP client wrapper with fetch |
| OAuth flow complexity | Medium | Medium | Follow youtube-mcp OAuth patterns |

---

## Timeline

### Phase 1: Foundation + Listings MVP
- Project setup, OAuth flow, MCP server scaffold
- Priority 1 endpoints (Listings + Search)
- stdio transport

### Phase 2: Content Interaction
- Priority 2 endpoints (Posts, Comments, Voting, Save)

### Phase 3: Account, Users & Messages
- Priority 3 (Account, Users)
- Priority 4 (Subreddits, Flair, Messages)

### Phase 4: Moderation
- Priority 5 (Mod actions, mod listings, mod management)

### Phase 5: Advanced Features & Polish
- Priority 6 (Multireddits, Wiki)
- HTTP transport, documentation, factory export

---

## References

- [Reddit API Documentation](https://www.reddit.com/dev/api/): Official API reference
- [Reddit OAuth2 Wiki](https://github.com/reddit-archive/reddit/wiki/OAuth2): OAuth flow documentation
- [Reddit API Scopes](https://www.reddit.com/api/v1/scopes): Complete scope list
- [Reddit Data API Wiki](https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki): Rate limits and policies
- [MCP Specification](https://modelcontextprotocol.io): Model Context Protocol docs
- [youtube-mcp](../../../youtube-mcp): Reference implementation for MCP server pattern

---

**Status**: Active
**Last Updated**: 2026-03-10
