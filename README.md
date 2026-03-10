# reddit-mcp

MCP server wrapping the Reddit API for AI agents. Provides **88 tools** covering listings, search, posts, comments, voting, messaging, moderation, multireddits, wiki, and more.

> Built with [Agent Context Protocol](https://github.com/prmichaelsen/agent-context-protocol)

## Features

- **88 MCP tools** — full Reddit API coverage across 13 categories
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

### Listings (9 tools)

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

### Search (2 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_search` | Search across all of Reddit | read |
| `reddit_search_subreddit` | Search within a specific subreddit | read |

### Posts (9 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_submit` | Create a new post (link or self) | submit |
| `reddit_edit` | Edit a self-post or comment | edit |
| `reddit_delete` | Delete a post or comment | edit |
| `reddit_hide` | Hide a post from listings | report |
| `reddit_unhide` | Unhide a post | report |
| `reddit_mark_nsfw` | Mark a post as NSFW | modposts |
| `reddit_unmark_nsfw` | Remove NSFW mark | modposts |
| `reddit_spoiler` | Mark a post as spoiler | modposts |
| `reddit_unspoiler` | Remove spoiler mark | modposts |

### Comments (2 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_comment` | Post a comment or reply | submit |
| `reddit_more_children` | Load more comments from collapsed threads | read |

### Voting, Save & Report (4 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_vote` | Upvote/downvote/unvote | vote |
| `reddit_save` | Save content | save |
| `reddit_unsave` | Unsave content | save |
| `reddit_report` | Report content | report |

### Account (7 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_me` | Get authenticated user info | identity |
| `reddit_me_karma` | Get karma breakdown by subreddit | mysubreddits |
| `reddit_me_prefs` | Get user preferences | identity |
| `reddit_me_prefs_update` | Update user preferences | account |
| `reddit_me_trophies` | Get user trophies | identity |
| `reddit_me_friends` | Get friends list | mysubreddits |
| `reddit_me_blocked` | Get blocked users list | mysubreddits |

### Users (9 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_user_about` | Get user profile | read |
| `reddit_user_overview` | Get user's recent posts and comments | history |
| `reddit_user_submitted` | Get user's submitted posts | history |
| `reddit_user_comments` | Get user's comments | history |
| `reddit_user_saved` | Get user's saved items | history |
| `reddit_user_upvoted` | Get user's upvoted posts | history |
| `reddit_user_downvoted` | Get user's downvoted posts | history |
| `reddit_user_trophies` | Get user's trophies | read |
| `reddit_block_user` | Block a user | account |

### Messages (7 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_inbox` | Get inbox messages | privatemessages |
| `reddit_unread` | Get unread messages | privatemessages |
| `reddit_sent` | Get sent messages | privatemessages |
| `reddit_compose` | Send a private message | privatemessages |
| `reddit_read_message` | Mark message as read | privatemessages |
| `reddit_unread_message` | Mark message as unread | privatemessages |
| `reddit_del_msg` | Delete a message | privatemessages |

### Subreddits (8 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_subreddit_about` | Get subreddit metadata | read |
| `reddit_subreddit_rules` | Get subreddit rules | read |
| `reddit_subscribe` | Subscribe to a subreddit | subscribe |
| `reddit_unsubscribe` | Unsubscribe from a subreddit | subscribe |
| `reddit_subreddits_mine` | List subscribed subreddits | mysubreddits |
| `reddit_subreddits_popular` | List popular subreddits | read |
| `reddit_subreddits_new` | List newest subreddits | read |
| `reddit_subreddits_search` | Search for subreddits | read |

### Flair (3 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_link_flair` | Get available post flair templates | flair |
| `reddit_user_flair` | Get available user flair templates | flair |
| `reddit_select_flair` | Set flair on a post or user | flair |

### Moderation (16 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_approve` | Approve a post or comment | modposts |
| `reddit_remove` | Remove a post or comment | modposts |
| `reddit_distinguish` | Distinguish as moderator | modposts |
| `reddit_ignore_reports` | Ignore future reports | modposts |
| `reddit_unignore_reports` | Stop ignoring reports | modposts |
| `reddit_lock` | Lock a thread | modposts |
| `reddit_unlock` | Unlock a thread | modposts |
| `reddit_modqueue` | Get mod queue items | modposts |
| `reddit_reports` | Get reported items | modposts |
| `reddit_spam` | Get spam items | modposts |
| `reddit_edited` | Get recently edited items | modposts |
| `reddit_modlog` | Get moderation log | modlog |
| `reddit_moderators` | List moderators | read |
| `reddit_contributors` | List approved contributors | modcontributors |
| `reddit_banned` | List banned users | modcontributors |
| `reddit_muted` | List muted users | modcontributors |

### Multireddits (7 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_multi_mine` | List your multireddits | read |
| `reddit_multi_get` | Get a multireddit | read |
| `reddit_multi_create` | Create a multireddit | subscribe |
| `reddit_multi_update` | Update a multireddit | subscribe |
| `reddit_multi_delete` | Delete a multireddit | subscribe |
| `reddit_multi_add_sub` | Add subreddit to multireddit | subscribe |
| `reddit_multi_remove_sub` | Remove subreddit from multireddit | subscribe |

### Wiki (5 tools)

| Tool | Description | Scope |
|------|-------------|-------|
| `reddit_wiki_page` | Read a wiki page | wikiread |
| `reddit_wiki_edit` | Edit a wiki page | wikiedit |
| `reddit_wiki_pages` | List all wiki pages | wikiread |
| `reddit_wiki_revisions` | Get wiki revision history | wikiread |
| `reddit_wiki_page_revisions` | Get revisions for a specific page | wikiread |

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
│   │   ├── search.ts         # 2 search tools
│   │   ├── posts.ts          # 9 post tools
│   │   ├── comments.ts       # 2 comment tools
│   │   ├── voting.ts         # 4 vote/save/report tools
│   │   ├── account.ts        # 7 account tools
│   │   ├── users.ts          # 9 user profile tools
│   │   ├── messages.ts       # 7 message tools
│   │   ├── subreddits.ts     # 8 subreddit tools
│   │   ├── flair.ts          # 3 flair tools
│   │   ├── moderation.ts     # 16 moderation tools
│   │   ├── multireddits.ts   # 7 multireddit tools
│   │   └── wiki.ts           # 5 wiki tools
│   ├── transport/http.ts     # Streamable HTTP transport
│   └── types/index.ts        # Shared types
├── tests/
│   ├── unit/                 # 17 test suites (135 tests)
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
