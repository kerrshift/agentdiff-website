<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# agentdiff-website working rules

- **This repo is site-only.** Product code lives in
  [`kerrshift/agentdiff`](https://github.com/kerrshift/agentdiff) — never mix
  the two in one PR.
- Branch + PR for every change (`feat|fix|chore|content/<kebab-summary>`),
  conventional-commit titles, squash-merge.
- Verification before every push to `main`:
  ```bash
  pnpm run lint    # 0 errors required (warnings: strive to reduce)
  pnpm run build   # static export must be clean
  ```
  `deploy.yml` runs both — a red build means no deploy.
- Deploys are automatic to the `agentdiff` Cloudflare Pages project on every
  merge to `main`. No manual deploys; if agentdiff.app is stale, check the
  workflow first.
- Blog posts go in `content/blog/YYYY-MM-DD-slug.md`; docs content in
  `docs/` (rendered under `/docs`). Keep product claims in sync with the
  version actually on PyPI.
