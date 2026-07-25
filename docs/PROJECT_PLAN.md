# Project Plan

Working style, site structure, and milestone tracking for the portfolio build.
Read this before starting new build work in this repo.

## Working style (read this before doing anything)
The user wants to *learn Astro properly* while building this — treat this as a
mentorship relationship, not a code-generation task.

For each step:
1. Explain what we are building.
2. Explain the Astro concept involved.
3. Give the code only for that block.
4. Mention where the file should go.
5. Keep the implementation simple and maintainable.

Do not jump ahead. Do not build multiple milestones in one go unless explicitly
asked. Do not scaffold ahead of the current milestone or generate a full codebase
upfront — build block by block, only when explicitly asked.

When a step adds a new page, its "done" includes the per-page SEO basics from
`docs/CONTENT_STRATEGY.md`'s "SEO goals" section (title, description, OG tags,
one `<h1>`) — not just the visual result. Don't defer these to a later cleanup
pass.

Avoid unnecessary animations, heavy JavaScript, or complex backend features
unless explicitly requested. Do not over-engineer.

## Status
Homepage is done: Hero, Me, Selected Work, Skills, Fun, and Contact are all built,
polished, and live at adnansabbir.com (GitHub Pages). The Writing/blog pipeline
(MDX, content collection, `/writing` + `/writing/[slug]` pages, homepage teaser
section) is also built, but the nav link and homepage section stay off
(`active: false` on the Writing nav item in `data/home.ts`) until there's a real
first post — see "First milestones" below for what's next.

## Site structure
Single-page homepage: every section (Me, Selected Work, Skills, Fun, Contact) is a
scroll section only. No dedicated per-section pages, no "See more" links — this was
the original plan but is no longer intended.

- Home (scroll sections, each short with big fonts/key stats):
  - Hero — avatar/memoji + name + role, matches a toukoum.fr-style layout (kept
    deliberately — personality signal, not scope creep)
  - Me
  - Projects / Selected Work (Production Contributions still gets its own
    dedicated page, linked directly from this section)
  - Skills
  - Fun
  - Writing — teaser section listing the latest posts, linking out to `/writing`
    for the full list (same pattern as Selected Work → Production Contributions)
  - Contact — home section only, no dedicated page (it's already the terminal
    action, and all the relevant info already lives on that one card)
- Production Contributions (own page, linked from the Selected Work section)
- Writing / Blog (own pages per post, required for content collections; the
  homepage Writing section is just a teaser, not a substitute)

Quick-nav pills on the hero jump to each home section; a floating nav bar
appears/updates to show the current section once scrolled past the hero
(scroll-spy via a small client-side island, e.g. IntersectionObserver — doesn't
require the page to go dynamic).

**Two deliberate exceptions** to the "static-first, avoid heavy JS" rule (everything
else should still default to minimal/static):
1. A future "Ask me anything" section (deferred, not part of current milestones)
   that queries an LLM about Adnan. Built as a dynamic island (client component +
   server API route, likely via the future `api/` app), not a reason to make the
   rest dynamic.
2. A WebGL fluid animation behind the whole homepage, built ahead of the polish
   milestone at the user's request. See `docs/CONVENTIONS.md`'s "WebGL fluid
   background" section for the implementation details.

## First milestones (in order — do not skip ahead)
1. Understand Astro project structure. ✅
2. Create a basic layout. ✅
3. Build homepage hero section. ✅
4. Add About section. ✅
5. Add Selected Work section. ✅
6. Polish design and deploy homepage. ✅
7. Add Writing page. ✅
8. Add MDX blog support. ✅
9. Write and publish the first real post (flip the Writing nav item's `active`
   to `true` once it's ready). ← next up
   - At this point, also add per-article `og:image`/`og:type="article"` and
     `Article` JSON-LD to `/writing/[slug]` (currently every post uses the
     generic site `og-image.jpg`, `og:type="website"`, and `Person` schema —
     deliberately deferred until a real post exists, per
     `docs/CONTENT_STRATEGY.md`'s SEO goals).
10. Add RSS feed once there's blog content — everything else in
    `docs/CONTENT_STRATEGY.md`'s "SEO goals" (sitemap, Person schema, canonical
    URLs, per-page basics) is already done/baked in per step.
11. Add Production Contributions section (own page, linked from Selected Work) —
    deferred behind the blog for now.
