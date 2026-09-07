# adnansabbir.com — Astro site

The frontend for [adnansabbir.com](https://adnansabbir.com): homepage sections
plus the Writing/blog pages, which fetch content from Sanity Studio
(`../studio/`) at build time.

See the repo root `CLAUDE.md` for full orientation, commands, and the
`docs/` directory for working style, content strategy, and code conventions
— read those before making changes here.

## Setup

```bash
npm install
cp .env.example .env    # Sanity + analytics config; empty values are fine
```

`web/src/lib/sanity.ts` returns a null client when `SANITY_PROJECT_ID` and
`SANITY_DATASET` are unset, so the site builds and runs without a Sanity
project — the Writing section and its nav entry hide themselves. Node 22.12+
is required (`package.json` `engines`).

## Where content lives

Page copy and config are typed consts in `src/data/`, never hardcoded in
components — see "Content/data separation" in `../docs/CONVENTIONS.md`.
`src/data/site.ts` holds the site-wide identity (owner name, job title,
employer, page `<title>` strings). Blog posts come from Sanity, not from
files here.

## Commands

```bash
npm install
npm run dev             # dev server at localhost:4321
npm run build            # production build to dist/
npm run preview          # preview the production build
npm run lint             # eslint .
npm run format           # prettier --write .
npm run astro -- check   # Astro/TS diagnostics
```
