# Task 3: Reddit API Client Wrapper

**Milestone**: [M1 - Foundation + Listings MVP](../../milestones/milestone-1-foundation-listings-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 2
**Status**: Not Started

---

## Objective

Create a Reddit API HTTP client wrapper with proper headers, rate limit handling, error mapping, and retry logic.

---

## Context

Reddit has no official Node.js SDK, so we build a thin HTTP client using fetch. The client must handle Reddit-specific concerns: User-Agent header, OAuth bearer tokens, rate limit headers, and Reddit's JSON response format.

---

## Steps

### 1. Create RedditClient class (src/client/reddit.ts)

```typescript
export class RedditClient {
  constructor(auth: RedditAuth | string)  // auth object or raw access token
  async get<T>(path: string, params?: Record<string, string>): Promise<T>
  async post<T>(path: string, body: Record<string, string>): Promise<T>
}
```

### 2. Base URL and Headers
- Base URL: `https://oauth.reddit.com`
- Headers: `Authorization: Bearer {token}`, `User-Agent: {configured agent}`
- Accept: `application/json`

### 3. Rate Limit Handling
- Parse response headers: `X-Ratelimit-Remaining`, `X-Ratelimit-Reset`, `X-Ratelimit-Used`
- If remaining < 5, delay before next request
- On 429 response, wait for reset period

### 4. Error Mapping
- 400 → RedditApiError (bad request, include Reddit's error message)
- 401 → RedditApiError (unauthorized, token expired)
- 403 → RedditApiError (forbidden, scope missing or banned)
- 404 → RedditApiError (not found)
- 429 → RedditApiError (rate limited, include reset time)
- 5xx → RedditApiError (server error, retryable)

### 5. Retry Logic
- Max 3 retries for 5xx errors and network failures
- Exponential backoff: 1s, 2s, 4s
- No retry for 4xx errors (except 429)

---

## Verification

- [ ] RedditClient created with get/post methods
- [ ] Proper Authorization and User-Agent headers sent
- [ ] Rate limit headers parsed and respected
- [ ] Error mapping works for all status codes
- [ ] Retry logic works for 5xx errors
- [ ] Unit tests cover client, errors, and retry

---

**Next Task**: [Task 4: Listing Tools](task-4-listing-tools.md)
