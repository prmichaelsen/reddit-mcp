# Task 2: Reddit OAuth 2.0

**Milestone**: [M1 - Foundation + Listings MVP](../../milestones/milestone-1-foundation-listings-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 1
**Status**: Not Started

---

## Objective

Implement Reddit OAuth 2.0 authentication with authorization code flow, token storage, and automatic token refresh.

---

## Context

Reddit requires OAuth 2.0 for API access. Unlike YouTube which uses the googleapis library, Reddit has no official Node.js SDK — we implement OAuth directly with fetch. The auth module must support both direct user auth (for stdio) and raw access token injection (for mcp-auth factory pattern).

---

## Steps

### 1. Create RedditAuth class (src/auth/oauth.ts)

```typescript
export class RedditAuth {
  constructor(config: RedditAuthConfig)
  getAuthUrl(scopes: string[]): string
  exchangeCode(code: string): Promise<TokenData>
  getAccessToken(): Promise<string>  // auto-refresh
  hasStoredCredentials(): boolean
}
```

Key behaviors:
- Authorization URL generation with state parameter
- Code exchange via POST to `https://www.reddit.com/api/v1/access_token`
- Basic auth header with client_id:client_secret
- Token refresh 5 minutes before expiry
- File-based token storage with 0o600 permissions

### 2. Create factory function

```typescript
export function createAuthFromEnv(): RedditAuth
```
Reads REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_REDIRECT_URI, REDDIT_USER_AGENT, TOKEN_STORAGE_PATH from environment.

### 3. Reddit-specific OAuth details
- Token endpoint: `https://www.reddit.com/api/v1/access_token`
- Authorization endpoint: `https://www.reddit.com/api/v1/authorize`
- Use `duration=permanent` for refresh tokens
- Basic auth header (not body params) for client credentials
- Reddit returns `expires_in` in seconds (typically 3600)

---

## Verification

- [ ] RedditAuth class created with all methods
- [ ] Token exchange works with Reddit OAuth endpoint
- [ ] Token refresh works before expiry
- [ ] Tokens stored securely (0o600 file permissions)
- [ ] Factory function reads from environment correctly
- [ ] Unit tests cover auth flow, refresh, and error cases

---

**Next Task**: [Task 3: Reddit API Client Wrapper](task-3-reddit-api-client.md)
