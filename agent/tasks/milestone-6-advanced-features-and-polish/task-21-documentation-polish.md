# Task 21: Documentation & Polish

**Milestone**: [M6 - Advanced Features & Polish](../../milestones/milestone-6-advanced-features-and-polish.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Tasks 1-20
**Status**: Not Started

---

## Objective

Complete README documentation, CHANGELOG, factory export for mcp-auth, and ensure the package is publish-ready.

---

## Steps

### 1. Create comprehensive README.md
- Project overview and description
- Quick start guide (OAuth setup, configuration)
- All 88 tools documented in a reference table
- OAuth scopes per category
- Transport options (stdio/HTTP)
- Claude Desktop configuration example
- Rate limit information
- Environment variables reference

### 2. Create CHANGELOG.md
- Document all milestones as releases
- List tools added per milestone

### 3. Finalize factory export (src/factory.ts)
```typescript
export function createServer(accessToken: string): McpServer
```
- Used by reddit-mcp-server for mcp-auth integration
- Creates server with raw access token (no OAuth flow)

### 4. Package verification
- Ensure package.json exports are correct
- Verify `npm pack` produces clean package
- Check no dev files included in package
- Verify all tools registered (count = 88)

### 5. Final test pass
- Run full test suite
- Verify coverage >= 70%
- Check for any TODO/FIXME items

---

## Verification

- [ ] README documents all 88 tools
- [ ] CHANGELOG covers all milestones
- [ ] Factory export creates server from access token
- [ ] `npm pack` produces clean package
- [ ] All tests pass
- [ ] No TODO/FIXME items remaining
- [ ] Package publishable to npm

---

**Related Design Docs**: [Requirements](../../design/requirements.md)
