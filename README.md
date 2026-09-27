# John Meeker — Portfolio

Personal portfolio for John Meeker, a full-stack developer with 8+ years of
experience across React, TypeScript, Node.js, PostgreSQL (including PL/pgSQL),
and AWS.

**Live at [johnmm-dev.github.io](https://johnmm-dev.github.io)**

## What it covers

- Full-stack SaaS development: multi-tenant PostgreSQL, REST APIs, background
  workflows, React frontends
- Data migration and validation, including a Salesforce to HubSpot migration of
  44,400+ records at 98.7% accuracy
- Healthcare and third-party integrations, including a clearinghouse-to-EHR
  integration for Catholic Health Long Island (via KPMG)
- Incremental frontend modernization from Angular to React
- AI-assisted development with code review and testing on every change

## Tech stack

- [Astro](https://astro.build) + Tailwind CSS, static-first, deployed to GitHub
  Pages
- Optional blog content from [Sanity Studio](https://www.sanity.io/), fetched at
  build time (not set up yet; the Writing section hides itself without it)
- TypeScript throughout

## Repo layout

```
portfolio/
├── docs/     code and commit conventions, forking guide
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

## Credits

Forked from [Adnan Sabbir's portfolio](https://github.com/adnansabbir), which
is MIT licensed. `docs/FORKING.md` is the setup checklist used for the fork.

## License

The code is MIT licensed — see [LICENSE](LICENSE), which keeps the original
copyright notice alongside this fork's. Site copy and images are not covered by
the MIT grant; all rights reserved.
