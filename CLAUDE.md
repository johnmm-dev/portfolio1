# Personal Portfolio & Technical Writing Site — Adnan Sabbir

## Status
Astro scaffolded (empty template) under `web/`. Nothing else built yet.
**Do not scaffold ahead of the current milestone. Do not generate a full codebase upfront.**
Build block by block, only when explicitly asked.

## Repo layout
This is a monorepo-in-waiting — a backend is planned for later.

```
my-portfolio/
├── CLAUDE.md   ← this file (overall project context)
├── docs/        ← standing conventions (see "Conventions" below)
└── web/         ← the Astro site (frontend)
    └── CLAUDE.md → AGENTS.md  (Astro's own agent guidance, auto-generated, unrelated to this file)
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

No test runner is configured yet. `web/CLAUDE.md` (generated from `web/AGENTS.md`)
adds one Astro-specific note: run the dev server as `astro dev --background` and
manage it with `astro dev stop` / `status` / `logs`.

## Conventions
Standing decisions and patterns live in `docs/`, kept up to date as the project grows.
**Always follow these when writing code or committing in this repo:**
- `docs/CONVENTIONS.md` — code and data patterns (directory structure, content/data
  separation, the `active` flag convention, shared content registries, icon pattern,
  theming, TypeScript conventions, etc.)
- `docs/COMMIT_CONVENTIONS.md` — commit message format and workflow

If a decision made while coding isn't captured there yet, add it once it's confirmed
working — these docs exist so patterns aren't relearned or reinvented each session.

## Working style (read this before doing anything)
The user wants to *learn Astro properly* while building this — treat this as a mentorship
relationship, not a code-generation task.

For each step:
1. Explain what we are building.
2. Explain the Astro concept involved.
3. Give the code only for that block.
4. Mention where the file should go.
5. Keep the implementation simple and maintainable.

Do not jump ahead. Do not build multiple milestones in one go unless explicitly asked.

## Project goal
A clean, fast, SEO-friendly personal portfolio/blog site for Adnan Sabbir.

## Primary purpose
Act as the curated layer of Adnan's online presence. His GitHub is intentionally
exploratory — personal projects, learning notes, robotics work, system design practice,
small tools. The portfolio presents the strongest professional story for recruiters,
interviewers, and technical peers.

**Important framing:** Do not make the personal GitHub look like a polished portfolio.
It's fine to state plainly that GitHub is a mix of real projects, experiments, learning
notes, old robotics work, and small tools. The site is the curated story.

## Positioning
Software Engineer at Odoo R&D, based in Dubai. Focus: backend systems, ERP/localization,
e-invoicing, compliance flows, developer tooling, product engineering. Also has a robotics
background (founding team lead, BRACU Duburi) and creates long-form technical tutorials
for Bangla-speaking developers.

**Core message (use as anchor for homepage/about copy):**
> Backend-focused software engineer at Odoo R&D, working around ERP localization,
> e-invoicing, compliance flows, developer tooling, and product engineering. Former
> robotics team founder and technical educator.

## Tone
Professional, honest, concise, not arrogant. Avoid generic lines like "passionate
developer building scalable solutions." Prefer specific, grounded wording.

## Public links
- Personal GitHub: https://github.com/adnansabbir
- Odoo work GitHub: https://github.com/adns-odoo
- Odoo PRs: https://github.com/odoo/odoo/pulls?q=is%3Apr+author%3Aadns-odoo
- LinkedIn: https://linkedin.com/in/adnansabbir
- YouTube: https://www.youtube.com/c/adnansabbirr
- Facebook coding page: https://fb.com/ilivetocode

## Tech stack (to learn/use)
- Astro
- Tailwind CSS
- Markdown / MDX for blog posts
- Static-first architecture
- Deploy later on Cloudflare Pages or Vercel

Avoid unnecessary animations, heavy JavaScript, or complex backend features unless
explicitly requested. Do not over-engineer.

## Site structure
Hybrid model: the homepage is a single scrolling page with short teaser sections;
each section (except Contact) has a "See more" link to its own dedicated page for
deeper content and SEO indexing.

- Home (scroll sections, each short with big fonts/key stats):
  - Hero — avatar/memoji + name + role, matches a toukoum.fr-style layout (kept
    deliberately — personality signal, not scope creep)
  - Me → "See more" → `/about`
  - Projects / Selected Work → "See more" → `/selected-work` (Production
    Contributions gets its own dedicated page too, linked from here)
  - Skills → "See more" → `/skills` (what he did with each skill, not just a tag list)
  - Fun → "See more" → `/fun`
  - Contact — home section only, no dedicated page (it's already the terminal action)
- Production Contributions (own page, linked from Selected Work)
- Writing / Blog (own pages per post — required for content collections, can't be a
  scroll section)

Quick-nav pills on the hero jump to each home section; a header appears/updates to
show the current section once scrolled past the hero (scroll-spy via a small client-side
island, e.g. IntersectionObserver — doesn't require the page to go dynamic).

## Homepage goal
In the first few seconds, a visitor should understand:
- Backend/product engineer at Odoo R&D.
- Works around ERP, localization, e-invoicing, compliance, and backend systems.
- Has public production contributions via the Odoo development account.
- Has a broader builder background: robotics, teaching, tooling, technical learning.

## Production Contributions page (important)
Explains that Odoo work happens through reviewed pull requests to Odoo's public
repositories, under the dev account **@adns-odoo**. Should link to the public PR query
and eventually highlight selected PRs.

Areas of work to mention:
- ERP localization
- E-invoicing
- Compliance workflows
- Production business logic
- Odoo module development
- Bug fixes and forward-port workflows
- Developer tooling
- Performance/testing experiments

**Do not mention:** private Odoo tickets, internal project details, customer names,
confidential implementation details, or anything not already public.

## Selected Work ideas
- Odoo production contributions through @adns-odoo
- Odoo developer tooling
- TryHackMe / security learning notes
- Locust performance testing
- Ticketing app / backend system design practice
- BRACU Duburi / robotics background
- YouTube frontend tutorial series

## Blog strategy
Focus on technical writing that builds professional credibility. Avoid generic beginner
posts unless they have a personal angle. Good topics:
- How I approach e-invoicing localization in ERP systems
- What makes e-invoicing hard in ERP: XML, UBL, government APIs, validation, edge cases
- Lessons from working on Odoo localization and compliance flows
- How I use small scripts to improve Odoo development workflows
- What TryHackMe taught me as a backend engineer
- From underwater robotics to ERP engineering: what carried over
- Using AI-assisted workflows responsibly as a software engineer
- Debugging large ERP systems: how I approach unknown codebases

**Future case study:** Possible Georgia e-invoicing work may become a major public
contribution later. Do not write about confidential/unreleased details now, but keep
the site structure ready for a safe public case study once the work is public.

## SEO goals
Target queries: Adnan Sabbir, Adnan Sabbir Odoo, Adnan Sabbir Software Engineer,
Adnan Sabbir GitHub, Adnan Sabbir BRACU Duburi, Odoo developer Dubai, Backend engineer
Odoo, ERP localization engineer, E-invoicing Odoo engineer.

Requirements: clean semantic HTML, proper title/meta descriptions, Open Graph tags,
good heading hierarchy, fast static pages, sitemap (later), RSS (later), Person schema
(later), canonical URLs (later).

## Design direction
Minimal, technical, readable, slightly premium. A serious engineer's website, not a
flashy template. Prioritize typography, spacing, content hierarchy, and speed.

**Theme:** dark/light toggle, defaults to system preference (`prefers-color-scheme`),
manual override persisted in `localStorage`. Implemented via Tailwind's class-based
`dark:` variant (not the media-query default) so the toggle can override the system
setting. Set this up in `Layout.astro` before building section components, since every
component built afterward should use `dark:` variants from the start rather than
retrofitting them later.

**Architecture note:** the site stays static-first (Astro default) end to end, with two
planned, deliberate exceptions to the "avoid heavy JS" rule below — everything else
should still default to minimal/static:
1. A future "Ask me anything" section (deferred, not part of current milestones) that
   queries an LLM about Adnan. Built as a dynamic island (client component + server API
   route, likely via the future `api/` app), not a reason to make the rest dynamic.
2. A WebGL fluid animation behind the whole homepage, built ahead of the polish
   milestone at the user's request. Lives at `web/src/components/home/FluidBackground.astro`,
   using the `webgl-fluid-enhanced` npm package (typed, maintained wrapper around the
   same algorithm as Pavel Dobryakov's original WebGL-Fluid-Simulation) rather than
   vendoring raw shader code. Mounted once at the page level in `index.astro` (not inside
   `Hero.astro`), as a `position: fixed`, `inset-0` layer pinned to the viewport, so it
   reacts to mouse movement anywhere on the page and its render cost stays constant
   (viewport-sized) as more homepage sections are added, rather than growing with total
   page height. Each homepage section's content wrapper uses `relative z-10` to stay
   above it. Transparent canvas (`TRANSPARENT: true`) so it inherits the page's
   dark/light background automatically instead of duplicating theme logic. No
   auto-splats (`INITIAL: false`, `SPLAT_KEY: ''`) — reacts to real mouse movement only.
   Loaded via dynamic `import()` so it never blocks initial render, and skipped entirely
   when `prefers-reduced-motion` is set.

## First milestones (in order — do not skip ahead)
1. Understand Astro project structure.
2. Create a basic layout.
3. Build homepage hero section.
4. Add About section.
5. Add Selected Work section.
6. Add Production Contributions section.
7. Add Writing page.
8. Add MDX blog support.
9. Add SEO metadata.
10. Polish design and deploy.
