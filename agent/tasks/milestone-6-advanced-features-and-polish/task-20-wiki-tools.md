# Task 20: Wiki Tools

**Milestone**: [M6 - Advanced Features & Polish](../../milestones/milestone-6-advanced-features-and-polish.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Implement tools for reading, editing, and browsing subreddit wiki pages and their revision history.

---

## Steps

### 1. Create src/tools/wiki.ts

Register 5 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_wiki_page` | GET /r/{subreddit}/wiki/{page} | subreddit, page | wikiread |
| `reddit_wiki_edit` | POST /r/{subreddit}/api/wiki/edit | subreddit, page, content, reason? | wikiedit |
| `reddit_wiki_pages` | GET /r/{subreddit}/wiki/pages | subreddit | wikiread |
| `reddit_wiki_revisions` | GET /r/{subreddit}/wiki/revisions | subreddit, limit, after, before | wikiread |
| `reddit_wiki_page_revisions` | GET /r/{subreddit}/wiki/revisions/{page} | subreddit, page, limit, after, before | wikiread |

### 2. Wiki edit details
- `content` is the full wiki page content (markdown)
- `reason` is an optional edit reason (like a commit message)

---

## Verification

- [ ] `reddit_wiki_page` returns wiki page content
- [ ] `reddit_wiki_edit` updates a wiki page
- [ ] `reddit_wiki_pages` lists all wiki pages in a subreddit
- [ ] Revision history tools return edit history
- [ ] Unit tests for each tool

---

**Next Task**: [Task 21: Documentation & Polish](task-21-documentation-polish.md)
