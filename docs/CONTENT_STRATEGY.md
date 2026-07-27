# Content Strategy & Positioning

What the site says, who it's for, and how it should read. Check this before writing
or editing any copy, meta tags, or new page content.

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
Senior Software Engineer with 7+ years across full-stack and backend systems, currently
at Odoo R&D in Dubai on ERP product engineering and developer tooling — localization and
e-invoicing are part of that work, not the whole focus, and should not be the lead framing.
Prior experience spans distributed systems at scale (Cefalo/House of Math, 2M+ users),
company-wide frontend architecture (Shohoz), and full-stack delivery (Selise). Also has a
robotics background (founding team lead, BRACU Duburi) and creates long-form technical
tutorials for Bangla-speaking developers.

**Core message (use as anchor for homepage/about copy):**
> Senior Software Engineer with 7+ years building backend systems, distributed
> architectures, and full-stack products — currently at Odoo R&D on ERP product
> engineering and developer tooling. Former robotics team founder and technical educator.

## Tone
Professional, honest, concise, not arrogant. Avoid generic lines like "passionate
developer building scalable solutions." Prefer specific, grounded wording. Avoid
em dashes (`—`) in prose/sentence-level copy — they read as AI-generated; use
commas, periods, or a colon instead. Title-style em dashes (e.g. "Name — Tagline")
are a different, acceptable convention, not this pattern.

## Public links
- Personal GitHub: https://github.com/adnansabbir
- Odoo work GitHub: https://github.com/adns-odoo
- Odoo PRs: https://github.com/odoo/odoo/pulls?q=is%3Apr+author%3Aadns-odoo
- LinkedIn: https://linkedin.com/in/adnansabbir
- YouTube: https://www.youtube.com/c/adnansabbirr
- Facebook coding page: https://fb.com/ilivetocode

## Design direction
Minimal, technical, readable, slightly premium. A serious engineer's website, not a
flashy template. Prioritize typography, spacing, content hierarchy, and speed.

Dark/light theme and the WebGL fluid background are already built — see
`docs/CONVENTIONS.md` for their implementation details. Every component should use
`dark:` variants from the start rather than retrofitting them later.

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

**Bake into every page as it's built, not deferred to a later pass:** a unique
`<title>` and `<meta name="description">` (via `Layout.astro`'s `title`/`description`
props), Open Graph + Twitter Card tags, one semantic `<h1>` per page with a sensible
heading hierarchy below it, and descriptive `alt` text on images.

**Done (site-wide baseline, in `Layout.astro` / `web/public/`):** canonical URLs
(per-page, built from `Astro.site` + the route), a `sitemap.xml` (auto-generated by
`@astrojs/sitemap` from actual routes — never hand-maintained), `robots.txt`
(points to the sitemap), and a `Person` JSON-LD schema (site-wide, appears on every
page automatically, `sameAs` pulled from `data/social.ts`'s active links).

**When adding a new page:** pass a real `title`/`description` to `Layout.astro` —
this alone drives the title, meta description, OG/Twitter tags, and canonical URL
together. The sitemap and Person schema need no manual touch (automatic /
site-wide). Only revisit `robots.txt` if the new page shouldn't be indexed (e.g. a
draft). Blog posts (`/writing/[slug]`) already get `Article` schema and a
per-post `og:image` automatically — see `docs/PROJECT_PLAN.md` milestone 9.

**Still deferred:** RSS feed (milestone 10, see `docs/PROJECT_PLAN.md`).
