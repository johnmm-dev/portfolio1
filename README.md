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
├── docs/     working style, content strategy, code/commit conventions
├── studio/   Sanity Studio, the blog's content management system
└── web/      the Astro site itself
```

See `CLAUDE.md` for full repo orientation and commands.

## Status

Homepage is complete and live: Hero, Me, Selected Work, Skills, Fun, and Contact.
The Writing section is also live, backed by Sanity for content, including a
Series feature for grouping multi-part posts. A dedicated Production
Contributions page is still in progress.
