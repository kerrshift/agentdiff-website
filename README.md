# agentdiff-website

The source of [agentdiff.app](https://agentdiff.app) — marketing site, docs,
and blog for [AgentDiff](https://github.com/kerrshift/agentdiff)
(`agent-trajectory-diff` on PyPI).

Next.js (static export) + Tailwind, deployed to Cloudflare Pages.

## Develop

```bash
pnpm install
pnpm dev        # local dev server
pnpm run lint   # eslint — must pass with 0 errors
pnpm run build  # static export to out/ — must be clean
```

## Deploy

Automatic: every push to `main` builds and deploys to the `agentdiff`
Cloudflare Pages project (`.github/workflows/deploy.yml`). PRs get a
build-only check. Requires repo secrets `CLOUDFLARE_API_TOKEN` (Pages:Edit)
and `CLOUDFLARE_ACCOUNT_ID`.

Product code lives in [kerrshift/agentdiff](https://github.com/kerrshift/agentdiff);
the hosted identity service (`token.agentdiff.app`) is deployed from that
repo's `worker/`.
