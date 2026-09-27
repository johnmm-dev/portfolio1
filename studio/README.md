# John Meeker Blog — Sanity Studio

Content management for the Writing section of [johnmm-dev.github.io](https://johnmm-dev.github.io).
Blog posts moved here from git-based `.mdx` files because draft posts sitting
as files in a public repo were too exposed before publication.

**Not set up yet.** `sanity.cli.ts` and `sanity.config.ts` still carry the
original site's `projectId`, `studioHost`, and `appId`; replace them with a new
Sanity project's values before running or deploying the Studio (see
`../docs/FORKING.md`, Step 7).

## Commands

```bash
npm install
npm run dev       # local Studio dev server
npx sanity deploy # deploy both the schema and the hosted Studio app
```

`npx sanity deploy` does both in one step. Running `npx sanity schema
deploy` alone only updates the schema data other tools read — the Studio
*app* itself embeds the schema at build time and won't show a change until
it's redeployed too.

## Status

Schema and content are live here, and the Astro site (`../web/`) fetches
posts from Sanity at build time — see `../docs/CONVENTIONS.md`'s "Blog
content (Sanity)" section for how that's wired up.
