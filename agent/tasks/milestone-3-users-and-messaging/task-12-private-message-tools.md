# Task 12: Private Message Tools

**Milestone**: [M3 - Users & Messaging](../../milestones/milestone-3-users-and-messaging.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Implement tools for reading, sending, and managing private messages.

---

## Steps

### 1. Create src/tools/messages.ts

Register 7 tools:

| Tool | Endpoint | Parameters | Scope |
|------|----------|------------|-------|
| `reddit_inbox` | GET /message/inbox | limit, after, before | privatemessages |
| `reddit_unread` | GET /message/unread | limit, after, before | privatemessages |
| `reddit_sent` | GET /message/sent | limit, after, before | privatemessages |
| `reddit_compose` | POST /api/compose | to, subject, text | privatemessages |
| `reddit_read_message` | POST /api/read_message | id | privatemessages |
| `reddit_unread_message` | POST /api/unread_message | id | privatemessages |
| `reddit_del_msg` | POST /api/del_msg | id | privatemessages |

### 2. Compose details
- `to` is a username (without /u/ prefix)
- `subject` is required
- `text` is markdown-formatted body

---

## Verification

- [ ] `reddit_inbox` returns inbox messages
- [ ] `reddit_compose` sends a private message
- [ ] `reddit_read_message` marks message as read
- [ ] `reddit_del_msg` deletes a message
- [ ] Unit tests for each tool

---

**Next Task**: [Task 13: Subreddit Tools](../milestone-4-subreddits-and-flair/task-13-subreddit-tools.md)
