# adnansabbir.com — Astro site

The frontend for [adnansabbir.com](https://adnansabbir.com): homepage sections
plus the Writing/blog pages, which fetch content from Sanity Studio
(`../studio/`) at build time.

See the repo root `CLAUDE.md` for full orientation, commands, and the
`docs/` directory for working style, content strategy, and code conventions
— read those before making changes here.

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
