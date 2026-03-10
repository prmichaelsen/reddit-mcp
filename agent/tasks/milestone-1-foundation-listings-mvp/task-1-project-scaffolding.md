# Task 1: Project Scaffolding

**Milestone**: [M1 - Foundation + Listings MVP](../../milestones/milestone-1-foundation-listings-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: None
**Status**: Not Started

---

## Objective

Set up the project directory structure, package.json, TypeScript config, build system, test config, and install all dependencies. Following the youtube-mcp pattern.

---

## Context

This task creates the foundation that all subsequent development builds upon. The structure follows the youtube-mcp reference project pattern — ESM TypeScript with esbuild bundling, Jest for tests, and MCP SDK for the server.

---

## Steps

### 1. Create package.json
- Name: `@prmichaelsen/reddit-mcp`
- Type: `module` (ESM)
- Exports: `.` → `dist/server.js`, `./factory` → `dist/factory.js`
- Scripts: build, dev, test, typecheck
- Dependencies: `@modelcontextprotocol/sdk`, `zod`
- Dev deps: `typescript`, `jest`, `ts-jest`, `esbuild`, `tsx`

### 2. Create tsconfig.json
- Target: ES2022, Module: Node16
- Strict mode, declaration generation, source maps
- Include src/, exclude node_modules, dist, tests

### 3. Create esbuild.build.js
- Entry points: src/index.ts, src/server.ts, src/factory.ts
- Bundle: true, target: node20, format: esm
- Generate .d.ts via tsc

### 4. Create jest.config.js
- Preset: ts-jest/presets/default-esm
- Coverage threshold: 70%
- Test pattern: tests/**/*.test.ts

### 5. Create directory structure
```
src/auth/, src/client/, src/tools/, src/transport/, src/types/
tests/unit/, tests/fixtures/, tests/helpers/
```

### 6. Create .env.example
Document all required environment variables.

### 7. Create .gitignore
Add dist/, node_modules/, .env*, .tokens/, coverage/

### 8. Install dependencies
Run `npm install`

---

## Verification

- [ ] `npm install` completes without errors
- [ ] `npm run build` completes without errors
- [ ] `npm run typecheck` passes
- [ ] Directory structure matches specification
- [ ] package.json has correct exports configuration

---

**Next Task**: [Task 2: Reddit OAuth 2.0](task-2-reddit-oauth.md)
