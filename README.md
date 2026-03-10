# reddit-mcp

MCP server wrapping the Reddit API for AI agents. Provides 11 tools (MVP) with 88 planned, covering listings, search, posts, comments, voting, messaging, moderation, and more.

> Built with [Agent Context Protocol](https://github.com/prmichaelsen/agent-context-protocol)

## Features

- **11 MCP tools** implemented (88 planned across 6 milestones)
- **Reddit OAuth 2.0** authentication with automatic token refresh
- **Dual transport**: stdio (default) and Streamable HTTP
- **Rate-limit aware**: respects Reddit's X-Ratelimit headers (100 QPM)
- **Retry logic**: automatic retry with exponential backoff for transient errors
- **Error mapping**: clear, actionable error messages for all API errors
- **Factory export**: for multi-tenant use via mcp-auth

## Quick Start

### 1. Install

```bash
npm install
npm run build
```

### 2. Configure OAuth

Create a Reddit app at https://www.reddit.com/prefs/apps and set these environment variables:

```env
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_REDIRECT_URI=http://localhost:8080/callback
REDDIT_USER_AGENT=platform:app-id:v0.1.0 (by /u/username)
```

### 3. Run

```bash
# stdio transport (default)
npm start

# HTTP transport
node dist/index.js --transport http --port 3000
```

### 4. Claude Desktop Configuration

```json
{
  "mcpServers": {
    "reddit": {
      "command": "node",
      "args": ["/path/to/reddit-mcp/dist/index.js"],
      "env": {
        "REDDIT_CLIENT_ID": "your_client_id",
        "REDDIT_CLIENT_SECRET": "your_client_secret",
        "REDDIT_USER_AGENT": "platform:app-id:v0.1.0 (by /u/username)"
      }
    }
  }
}
```

## Transport Options

| Transport | Flag | Default |
|-----------|------|---------|
| stdio | `--transport stdio` | Yes |
| HTTP | `--transport http` | No |

| Option | CLI | Env Var | Default |
|--------|-----|---------|---------|
| Port | `--port 3000` | `HTTP_PORT` | 3000 |
| Host | `--host localhost` | `HTTP_HOST` | localhost |

## Tools Reference

### Listings (9 tools) — Implemented

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_listings_best` | Get best posts | read |
| `reddit_listings_hot` | Get hot posts (frontpage or subreddit) | read |
| `reddit_listings_new` | Get newest posts | read |
| `reddit_listings_rising` | Get rising posts | read |
| `reddit_listings_top` | Get top posts (with time filter) | read |
| `reddit_listings_controversial` | Get controversial posts | read |
| `reddit_comments_thread` | Get post with full comment tree | read |
| `reddit_duplicates` | Get cross-posts / duplicates | read |
| `reddit_info` | Get info about things by fullname | read |

### Search (2 tools) — Implemented

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_search` | Search across all of Reddit | read |
| `reddit_search_subreddit` | Search within a specific subreddit | read |

### Posts (9 tools) — Planned (M2)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_submit` | Create a new post (link or self) | submit |
| `reddit_edit` | Edit a self-post or comment | edit |
| `reddit_delete` | Delete a post or comment | edit |
| `reddit_hide` / `reddit_unhide` | Hide/unhide a post | report |
| `reddit_mark_nsfw` / `reddit_unmark_nsfw` | Toggle NSFW | modposts |
| `reddit_spoiler` / `reddit_unspoiler` | Toggle spoiler | modposts |

### Comments (2 tools) — Planned (M2)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_comment` | Post a comment or reply | submit |
| `reddit_more_children` | Load more comments | read |

### Voting, Save & Report (4 tools) — Planned (M2)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_vote` | Upvote/downvote/unvote | vote |
| `reddit_save` / `reddit_unsave` | Save/unsave content | save |
| `reddit_report` | Report content | report |

### Account (7 tools) — Planned (M3)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_me` | Get authenticated user info | identity |
| `reddit_me_karma` | Get karma breakdown | mysubreddits |
| `reddit_me_prefs` / `reddit_me_prefs_update` | Get/update preferences | identity/account |
| `reddit_me_trophies` | Get trophies | identity |
| `reddit_me_friends` / `reddit_me_blocked` | Get friends/blocked | mysubreddits |

### Users (9 tools) — Planned (M3)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_user_about` | Get user profile | read |
| `reddit_user_overview` / `submitted` / `comments` | User history | history |
| `reddit_user_saved` / `upvoted` / `downvoted` | User saved/voted | history |
| `reddit_user_trophies` | User trophies | read |
| `reddit_block_user` | Block a user | account |

### Messages (7 tools) — Planned (M3)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_inbox` / `reddit_unread` / `reddit_sent` | Read messages | privatemessages |
| `reddit_compose` | Send private message | privatemessages |
| `reddit_read_message` / `reddit_unread_message` | Toggle read status | privatemessages |
| `reddit_del_msg` | Delete a message | privatemessages |

### Subreddits (8 tools) — Planned (M4)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_subreddit_about` / `reddit_subreddit_rules` | Subreddit info | read |
| `reddit_subscribe` / `reddit_unsubscribe` | Manage subscriptions | subscribe |
| `reddit_subreddits_mine` / `popular` / `new` / `search` | Discover subreddits | mysubreddits/read |

### Flair (3 tools) — Planned (M4)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_link_flair` / `reddit_user_flair` | Get flair options | flair |
| `reddit_select_flair` | Set flair | flair |

### Moderation (16 tools) — Planned (M5)

Approve, remove, distinguish, lock/unlock, mod queue, reports, spam, modlog, and user management tools.

### Multireddits (7 tools) — Planned (M6)

CRUD operations for custom feeds and managing subreddits within them.

### Wiki (5 tools) — Planned (M6)

Read, edit, list pages, and browse revision history.

## Roadmap

| Milestone | Status | Tools |
|-----------|--------|-------|
| M1: Foundation + Listings MVP | **Complete** | 11 |
| M2: Content Interaction | Planned | 15 |
| M3: Users & Messaging | Planned | 23 |
| M4: Subreddits & Flair | Planned | 11 |
| M5: Moderation | Planned | 16 |
| M6: Advanced Features & Polish | Planned | 12 |

## Reddit API Rate Limits

- **100 queries per minute** per OAuth client ID (averaged over 10-minute window)
- Rate limit headers are automatically parsed and respected
- 429 responses trigger automatic backoff and retry

## Project Structure

```
reddit-mcp/
├── src/
│   ├── index.ts              # Transport selector (stdio/HTTP)
│   ├── server.ts             # MCP server factory
│   ├── factory.ts            # Public factory export (for mcp-auth)
│   ├── auth/oauth.ts         # Reddit OAuth 2.0
│   ├── client/reddit.ts      # Reddit API HTTP client
│   ├── tools/
│   │   ├── listings.ts       # 9 listing tools
│   │   └── search.ts         # 2 search tools
│   ├── transport/http.ts     # Streamable HTTP transport
│   └── types/index.ts        # Shared types
├── tests/
│   ├── unit/                 # 5 test suites (36 tests)
│   ├── fixtures/             # Mock Reddit API responses
│   └── helpers/              # Mock client
├── package.json
├── tsconfig.json
├── esbuild.build.js
└── jest.config.js
```

## License

MIT

## Author

Patrick Michaelsen
