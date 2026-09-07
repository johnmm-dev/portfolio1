# Adnan Sabbir — Portfolio

Personal portfolio and technical writing site for Adnan Sabbir, a backend-focused
software engineer at Odoo R&D working on ERP localization, e-invoicing, compliance
flows, developer tooling, and product engineering.

**Live at [adnansabbir.com](https://adnansabbir.com)**

## Why this exists

GitHub already hosts a broad, exploratory mix of personal projects, learning notes,
robotics work, and small experiments — useful, but not curated. This site is the
curated version: the clearest professional story for recruiters, interviewers, and
technical peers, alongside a public record of Odoo contributions made through
reviewed pull requests under the `@adns-odoo` account.

## What it covers

- Backend/product engineering focus — ERP, localization, e-invoicing, compliance
- Production contributions to Odoo through public, reviewed pull requests
- A broader builder background: underwater robotics (BRACU Duburi, founding team
  lead), technical teaching for Bangla-speaking developers, security learning,
  developer tooling
- Long-form technical writing on ERP localization, e-invoicing, and backend
  engineering practice

## Tech stack

- [Astro](https://astro.build) + Tailwind CSS, static-first, deployed to GitHub
  Pages
- Blog content managed in [Sanity Studio](https://www.sanity.io/) and fetched
  at build time, not hand-authored as local files
- TypeScript throughout

## Repo layout

```
my-portfolio/
├── docs/     working style, content strategy, conventions, forking guide
├── studio/   Sanity Studio, the blog's content management system
└── web/      the Astro site itself
```

See `CLAUDE.md` for full repo orientation and commands.

## Running it locally

Node 22.12+ is required. The site lives in `web/`; there is no root
`package.json`.

```bash
cd web
npm install
cp .env.example .env    # leave the Sanity values empty for now
npm run dev             # http://localhost:4321
```

Without Sanity credentials the site builds and runs fine: the Writing section
and its nav entry hide themselves, and everything else works. The `/writing/`
routes are still built (Astro can't skip a static route) but hold no posts,
and are excluded from the sitemap and marked `noindex` until Sanity is
configured.

## Forking it

You're welcome to. **[`docs/FORKING.md`](docs/FORKING.md)** is a step-by-step
guide to everything a fork has to change — identity, domain, deployment
target, branding assets, Sanity IDs — with the gotchas that will otherwise
bite you (the `CNAME` file, GitHub Pages project-site paths, and the lint gate
in front of the deploy). It's written to be handed to an AI coding agent:
*"read `docs/FORKING.md` and walk me through it, one step at a time."*

## License

The code is MIT licensed — see [LICENSE](LICENSE). Fork it, learn from it,
build your own version of it; `docs/FORKING.md` walks through everything a
fork has to change.

The MIT grant covers the code only. Not included:

- **Written content** — the blog posts and series under Writing, and the site
  copy, all rights reserved.
- **Images and video** — personal photographs and the gallery clips under
  `web/public/gallery_images/`, all rights reserved.
- **Third-party marks** — the employer and project logos under
  `web/public/work/` belong to their respective owners and are used here to
  illustrate work history, not sublicensed.

Replace all three in a fork. `docs/FORKING.md` says where they live.

## Status

Homepage is complete and live: Hero, Work, Writing, Fun, and Contact. The Writing
section is live too, backed by Sanity for content, including multi-part series.
A dedicated Production Contributions page is still to come.
