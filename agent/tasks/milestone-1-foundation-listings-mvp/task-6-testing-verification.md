# Task 6: Testing & Verification

**Milestone**: [M1 - Foundation + Listings MVP](../../milestones/milestone-1-foundation-listings-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Tasks 1-5
**Status**: Not Started

---

## Objective

Create comprehensive unit tests, mock client, response fixtures, and verify MVP end-to-end.

---

## Steps

### 1. Create test helpers (tests/helpers/mock-client.ts)
Mock RedditClient that returns fixture data without hitting the API.

### 2. Create response fixtures (tests/fixtures/reddit-responses.ts)
Sample Reddit API responses for listings, search, comments, errors.

### 3. Create unit test suites
- tests/unit/auth.test.ts — OAuth flow, token refresh, error cases
- tests/unit/client.test.ts — HTTP client, error mapping, retry, rate limits
- tests/unit/server.test.ts — Server creation, tool registration count
- tests/unit/listings.test.ts — All listing tool definitions and handlers
- tests/unit/search.test.ts — Search tool definitions and handlers

### 4. Verify end-to-end
- Server creates successfully
- All 11 tools registered
- stdio transport starts without errors

---

## Verification

- [ ] All test suites pass
- [ ] Coverage >= 70% (branches, functions, lines, statements)
- [ ] Mock client properly simulates Reddit API responses
- [ ] Error cases tested (401, 403, 429, 5xx)
- [ ] `npm test` runs cleanly

---

**Next Task**: [Task 7: Post Tools](../milestone-2-content-interaction/task-7-post-tools.md)
