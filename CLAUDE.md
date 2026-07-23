# Personal Portfolio & Technical Writing Site — Adnan Sabbir

## Documentation map
This file only covers repo orientation (layout, commands, tech stack). Everything
else lives in `docs/` — **read the relevant file before starting related work:**

- `docs/PROJECT_PLAN.md` — working style (this is a mentorship relationship, read
  this before writing any code), site structure, and milestone tracking. Read this
  first, every session.
- `docs/CONTENT_STRATEGY.md` — positioning, tone, SEO goals, and what each page/post
  should say. Read this before writing or editing any copy.
- `docs/CONVENTIONS.md` — code and data patterns (directory structure, content/data
  separation, the `active` flag convention, shared content registries, icon pattern,
  theming, TypeScript, Prettier/formatting conventions, shared CSS classes, etc.).
  Read this before writing code.
- `docs/COMMIT_CONVENTIONS.md` — commit message format and workflow. Read this
  before running `git commit`.

If a decision made while coding isn't captured in the relevant doc yet, add it once
it's confirmed working — these docs exist so patterns aren't relearned or reinvented
each session.

## Repo layout
This is a monorepo-in-waiting — a backend is planned for later.

```
my-portfolio/
├── CLAUDE.md   ← this file (repo orientation only, see "Documentation map" above)
├── docs/        ← working style, content strategy, code/commit conventions
└── web/         ← the Astro site (frontend)
```

When a backend is added later, it will live at root-level `api/` (sibling to `web/`),
not nested under an `apps/` directory — kept flat since there are only two apps.

## Commands
All commands run from `web/` (the Astro app):

```bash
npm install
npm run dev             # dev server at localhost:4321
npm run build           # production build to web/dist/
npm run preview         # preview the production build
npm run lint            # eslint .
npm run format           # prettier --write .
npm run format:check    # prettier --check . (no writes)
npm run astro -- check  # Astro/TS diagnostics
```

No test runner is configured yet. Run the dev server as `astro dev --background`
and manage it with `astro dev stop` / `status` / `logs`.

## Tech stack
- Astro
- Tailwind CSS
- Markdown / MDX for blog posts (planned, not yet added)
- Static-first architecture
- Deployed via GitHub Pages (see `.github/workflows/deploy.yml`), live at
  adnansabbir.com
