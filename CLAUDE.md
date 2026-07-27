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
├── studio/      ← Sanity Studio (blog content management, see docs/CONVENTIONS.md)
└── web/         ← the Astro site (frontend)
```

When a backend is added later, it will live at root-level `api/` (sibling to `web/`),
not nested under an `apps/` directory — kept flat since there are only two apps
(plus `studio/`, which is schema/content tooling rather than an app).

## Commands
Astro site commands run from `web/`:

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

Sanity Studio commands run from `studio/`:

```bash
npm install
npm run dev       # local Studio dev server
npx sanity deploy # deploy both the schema and the hosted Studio app
```

## Tech stack
- Astro
- Tailwind CSS
- Blog content lives in Sanity (`studio/`), fetched at build time via a
  custom Content Collection loader — no local Markdown/MDX files, see
  `docs/CONVENTIONS.md`'s "Blog content (Sanity)" section
- Static-first architecture
- Deployed via GitHub Pages (see `.github/workflows/deploy.yml`), live at
  adnansabbir.com
