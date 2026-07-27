# adnansabbir.com Blog — Sanity Studio

Content management for the Writing section of [adnansabbir.com](https://adnansabbir.com).
Blog posts moved here from git-based `.mdx` files because draft posts sitting
as files in a public repo were too exposed before publication.

Project `8iczsrc5`, dataset `production`. Hosted Studio:
https://adnansabbir-blog.sanity.studio/

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
