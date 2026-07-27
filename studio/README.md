# adnansabbir.com Blog — Sanity Studio

Content management for the Writing section of [adnansabbir.com](https://adnansabbir.com).
Blog posts are moving here from git-based `.mdx` files (see
`../docs/SANITY_MIGRATION.md`) because draft posts sitting as files in a
public repo were too exposed before publication.

Project `8iczsrc5`, dataset `production`. Hosted Studio:
https://adnansabbir-blog.sanity.studio/

## Commands

```bash
npm install
npm run dev               # local Studio dev server
npx sanity schema deploy  # push schema changes (schemaTypes/) to the project
npx sanity deploy         # deploy the hosted Studio
```

## Status

Schema and content are live here, but the Astro site (`../web/`) still reads
posts from local `.mdx` files. The fetch-from-Sanity integration on the Astro
side hasn't been built yet — see `../docs/SANITY_MIGRATION.md` for the plan.
