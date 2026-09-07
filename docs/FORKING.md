# Forking this site

Everything a fork has to change before it stops being *this* site and starts
being yours. Written to be handed to an AI agent — "read `docs/FORKING.md` and
walk me through it, one step at a time" — but it reads fine on its own.

Work through the steps in order. Step 1 decides things that later steps depend
on.

## Two separate passes

**The setup pass — this doc.** Identity and configuration: name, domain,
deployment target, analytics, branding assets, and the personal strings that
live *outside* `web/src/data/`. Do this once, first, and finish it.

**The content pass — not this doc.** Everything inside `web/src/data/`: work
history, the gallery, contact details, social links, homepage copy. That's
ordinary content editing, and it can happen at your own pace afterwards.

The distinction matters because the two fail differently. If the setup pass is
incomplete, the site won't deploy, or it'll deploy to someone else's domain.
If the content pass is incomplete, the site still works — it just still says
somebody else's job history.

## Ask before editing

An agent working through this doc should collect these answers **first**, in
one pass, and edit nothing until it has them. None of these are content
questions; they're the values wired into config, metadata, and deployment.

1. **Full name**, as it should appear in browser tab titles, social share
   previews, and structured data.
2. **GitHub username.**
3. **The forked repository's current name.**
4. **Deployment target** — see the next section. Ask this *before* touching
   `web/astro.config.mjs`; the answer changes what else has to be edited.
5. **Custom domain**, or none.
6. **Job title and current employer**, for the `Person` structured data.
7. **Career start month and year** — the homepage prints a live "N+ years"
   number computed from it.
8. **One-line site description** for the homepage `<meta name="description">`.
9. **Google Analytics measurement ID**, or none (blank turns analytics off
   cleanly — that's the default).
10. **Whether the Writing section is wanted now or later.** "Later" is the
    normal answer; the site builds and runs fine without it.

If an answer is "I don't know yet", use the placeholder suggested in the
relevant step. Do not leave the original owner's value in place. When the
setup pass is done, nothing in the tree should still say `Adnan Sabbir` or
`adnansabbir.com` — Step 8 checks exactly that.

## Step 1 — Pick the deployment target

This site is built for a **root-level deployment**, i.e. one where the
homepage sits at `/`. That's true for a GitHub Pages *user* site and for a
custom domain. It is **not** true for a Pages *project* site, which serves
from `/<repo-name>/`.

| Target | URL | Verdict |
| --- | --- | --- |
| User site | `<username>.github.io` | **Recommended** |
| Custom domain | `yourdomain.com` | Works |
| Project site | `<username>.github.io/<repo>` | Needs code changes — avoid |

Why the project site is a trap: making it work means setting `base` in
`web/astro.config.mjs`, and once `base` isn't `/`, every root-absolute path in
the codebase breaks. There are roughly 20 asset paths in `web/src/data/`
(`/gallery_images/…`, `/work/…`, `/writing-default.jpg`) and 13 internal links
in components and pages (`href="/"`, `href="/writing"`) that would each need
rewriting through `import.meta.env.BASE_URL`. Only the three favicon links in
`web/src/layouts/Layout.astro` are base-aware today. The site will look
perfect on `localhost` and arrive live with broken images and broken
navigation.

So:

- [ ] **Rename the forked repository to `<username>.github.io`** (GitHub →
      repo → Settings → General → Repository name). Nothing else in this doc
      changes, and you get a shorter URL.

If you own a domain and would rather use it, keep the fork's name and follow
the custom-domain notes in Step 2 instead.

## Step 2 — Domain and site URL

The repo currently hardcodes the original owner's domain in four places that
affect the built output.

- [ ] **Delete `web/public/CNAME`.** It contains `adnansabbir.com`. Left in
      place, your deploy publishes a custom-domain claim for a domain you
      don't own, and your site won't be reachable at your own URL. If you
      *do* have a domain, don't edit this file — delete it and set the domain
      in the repo's Pages settings instead, which writes its own `CNAME`.
- [ ] **`web/astro.config.mjs`** — set `site` to your own URL:
      `https://<username>.github.io`, or `https://yourdomain.com`. This value
      feeds canonical URLs, Open Graph tags, the sitemap, and structured
      data, so a stale value quietly points search engines and social
      previews at the original site.
- [ ] **`web/public/robots.txt`** — update the `Sitemap:` line to the same
      URL.
- [ ] **`README.md`, `web/README.md`, `studio/README.md`** — each opens with
      the original domain. Rewrite or replace them; see Step 6.

## Step 3 — Replace the identity strings

Almost all of these live in one file.

- [ ] **`web/src/data/site.ts`** — `owner.name`, `owner.jobTitle`,
      `owner.employer`, the `pageTitles` entries, and `homeDescription`.
      Everything site-wide that names the owner is here: structured data, the
      `og:site_name` tag, the avatar's accessible label, and every fixed
      page's `<title>`. `pageTitles.writing` is a personal tagline
      ("Robotics to Software"), not a section label — replace the whole
      string. `homeDescription` also names a city, a role, and a list of
      industries; swap in your answer to question 8.
- [ ] **`web/src/lib/experience.ts`** — `CAREER_START` drives the live "N+
      years" number in `homeDescription`. Note the comment: `Date` months are
      0-indexed, so January is `0`.

Then the one that isn't, in `web/src/components/home/Hero.astro`:

- [ ] **The encrypted panel.** `encryptedHex` on line 5 is an inline blob
      holding the original owner's hidden message, and the decode
      instructions further down use `"ADNAN"` as the XOR key. Ship the fork
      as-is and your site carries a stranger's private note, decodable by
      anyone who follows the printed steps. Either write your own message
      through the same pipeline (hex → base64 → XOR with a key of your choice
      → reverse → Caesar +7, applied in reverse to encode) and update both the
      blob and the key in the instruction list, or delete the panel and its
      trigger entirely. Do not leave it half-changed: a new key with the old
      blob decodes to garbage, which looks like a bug rather than a puzzle.

Nothing else under `web/src/components/`, `web/src/pages/`, or
`web/src/layouts/` names the owner — that's deliberate, so this step stays a
config change and never conflicts with "don't edit components" below. If you
find a new hardcoded name there, it's a bug worth fixing at the source rather
than patching in place.

## Step 4 — Replace the branding assets

All under `web/public/`. Replacing the files in place — same names, same
formats — means no code changes.

- [ ] `favicon.svg`, `favicon-48x48.png`, `apple-touch-icon.png` — referenced
      from `Layout.astro`. Note that `favicon.svg` is text, not a binary
      image: it contains a `<title>` element naming the owner, which screen
      readers announce. Replacing the file covers it; editing it by hand
      means changing that element too.
- [ ] `og-image.jpg` — the default social share image.
- [ ] `writing-default.jpg` — fallback image for posts with no thumbnail.
- [ ] `work/*.webp` — employer and project logos, referenced from
      `web/src/data/experience.ts`. Content-pass material, but delete the
      originals now: they're other companies' marks, and some are used under
      terms that belong to the original owner's relationship with them.
- [ ] `gallery_images/*` — personal photos and videos (`.webp` stills, with
      `.mp4` for a few entries). Delete them. These are someone's personal
      photographs; keeping them is the most obviously wrong thing a fork can
      ship. Referenced from `web/src/data/fun.ts`.

## Step 5 — Environment and deployment

Local:

- [ ] `cp web/.env.example web/.env`. Leave `SANITY_PROJECT_ID` and
      `SANITY_DATASET` empty for now — `web/src/lib/sanity.ts` returns a null
      client when they're unset, and the Writing section and its nav entry
      hide themselves automatically. Nothing breaks. `.env` is gitignored.
- [ ] Set `PUBLIC_GA_MEASUREMENT_ID` if you have one, or leave it blank.

On GitHub:

- [ ] **Enable Actions.** Forks have workflows disabled by default: open the
      Actions tab and confirm the prompt, or nothing will ever deploy.
- [ ] **Settings → Pages → Source → GitHub Actions.** Not "Deploy from a
      branch".
- [ ] **Do not write a new workflow.** `.github/workflows/deploy.yml` already
      does lint → build → deploy on every push to `main`. An agent asked to
      "set up GitHub Pages deployment" will happily add a second, competing
      workflow. It only needs enabling.
- [ ] **Settings → Secrets and variables → Actions → Variables** — the
      workflow reads `SANITY_PROJECT_ID`, `SANITY_DATASET`, and
      `PUBLIC_GA_MEASUREMENT_ID` as repository *variables*, not secrets.
      Setting none of them is fine and is the right starting point.

## Step 6 — Repo documentation

`CLAUDE.md` and `docs/` describe the original owner's working relationship,
positioning, and content strategy. An AI agent in your fork will read all of
it and treat it as instructions.

- [ ] **`CLAUDE.md`** — three things. Replace the "Documentation map"
      section rather than appending below it, or your agent will keep being
      told to read docs about someone else's project plan before writing any
      code. Then fix the H1 on line 1 and the "live at …" line at the end of
      "Tech stack", both of which name the original owner. The "Repo layout"
      and "Commands" sections are factual and worth keeping as they are.
- [ ] **`docs/PROJECT_PLAN.md` and `docs/CONTENT_STRATEGY.md`** — delete.
      These are personal: milestone tracking, positioning, tone of voice, and
      a described mentorship relationship.
- [ ] **`docs/CONVENTIONS.md`** — keep, but fix the one reference it still
      carries: the Sanity Studio URL in the "Blog content (Sanity)" section.
      Otherwise it documents how the code is actually organized, and it's
      what stops an agent from reinventing the patterns.
- [ ] **`docs/COMMIT_CONVENTIONS.md`** — keep or replace; it's a style choice.
      If you keep it, note that it forbids AI co-author trailers.
- [ ] **`README.md`, `web/README.md`, `studio/README.md`** — rewrite as your
      own. A line crediting the original repo is appreciated, not required.
- [ ] **`LICENSE`** — the code is MIT, so you may keep, modify, and
      redistribute it, including as part of a site you charge for. Two
      conditions worth being precise about: the MIT text requires the
      original copyright notice to survive somewhere in your distribution, so
      don't simply delete the file — add your own copyright line alongside
      it. And the MIT grant covers *code only*. The written posts, the
      photographs in `web/public/gallery_images/`, and the third-party logos
      in `web/public/work/` are not licensed to you at all; see the License
      section of `README.md`. Steps 3 and 4 already have you removing them.

## Step 7 — The Writing section (optional, later)

Skip this on a first setup. The site builds and deploys without it, and the
Writing section disappears from the homepage and the nav.

One detail to know: Astro can't skip a static route, so `/writing/` and
`/writing/series/` are still *built* — as empty pages with no posts behind
them. They're kept out of the sitemap and marked `noindex` while Sanity is
unconfigured, so search engines won't pick them up, and `pageTitles` in
`site.ts` means their `<title>` is already yours after Step 3. Their body
copy still comes from `web/src/data/writing.ts`, which is content-pass work.
If you never intend to write, delete `web/src/pages/writing/`, the
`/writing` links in `web/src/pages/404.astro`, and the Writing section
component — but that's a structural change, so leave it until after your
first successful deploy.

When you want it, you'll need your own Sanity project — the IDs in `studio/`
point at the original owner's Content Lake, which you cannot write to.

- [ ] `studio/sanity.cli.ts` — `projectId`, and under `deployment`, both
      `studioHost` and `appId`. All three are the original owner's.
- [ ] `studio/sanity.config.ts` — `projectId` and `title`.
- [ ] `studio/package.json` — the `name` field is `adnansabbircom-blog`. The
      matching name in `studio/package-lock.json` updates itself on the next
      `npm install`.
- [ ] `studio/schemaTypes/resume.ts` — cosmetic: the `downloadName` field's
      help text uses the original owner's name as its example, which content
      editors will see in the Studio.
- [ ] Fill `SANITY_PROJECT_ID` and `SANITY_DATASET` in `web/.env`, and set the
      same two as repository variables so deploys can fetch content.

The schema in `studio/schemaTypes/` is reusable as-is.

## Step 8 — Verify before pushing

Run from `web/`. Node **22.12 or newer** is required (`web/package.json`
`engines`); the site lives in `web/`, and there is no root `package.json`, so
`npm install` at the repo root will fail.

```bash
cd web
npm install
npm run format          # prettier --write . — run this, don't skip it
npm run lint
npm run astro -- check
npm run build
npm run dev             # http://localhost:4321
```

`npm run format` is not optional. `.github/workflows/deploy.yml` gates the
build on `prettier --check`, `eslint`, and `astro check`, all of which must
pass before anything deploys. Hand-edited or AI-edited files routinely fail
the formatting check on nothing more than tabs or quote style — and the
failure mode is nasty: the push succeeds, no deploy happens, and the error
you get complains about whitespace in a file you thought you'd finished.

Then confirm nothing personal is left:

```bash
cd ..
grep -rniE 'adnan|adnansabbir\.com' \
  --include='*.astro' --include='*.ts' --include='*.mjs' --include='*.svg' \
  --include='*.md' --include='*.json' --include='*.yml' \
  --include='CNAME' --include='robots.txt' . \
  | grep -v node_modules | grep -v 'docs/FORKING.md'
ls web/public/gallery_images web/public/work
```

This doc quotes the old name throughout, hence the last `grep -v`. Both
commands should come back empty, or return only things you've deliberately
kept. On an untouched fork the first one finds about forty hits. Only ten are
under `web/`: `site` in `astro.config.mjs` (Step 2), `owner.name` in
`site.ts` (Step 3), the `<title>` inside `favicon.svg` (Step 4), the Hero
cipher key (Step 3), and then five that are content-pass work — four social
URLs, the contact email, and the homepage greeting, all in `web/src/data/`.

## Step 9 — Commit and push

```bash
git add -A
git commit
git push origin main
```

The push triggers `deploy.yml`. Watch the Actions tab: if the `lint` job goes
red, fix what it reports and push again — the build and deploy jobs never run
until it's green. When all three pass, your site is live at the URL from
Step 1.

## What not to change

Not rules, just where the tripwires are. Everything in this doc is a config,
metadata, or asset change — none of it touches layout or behavior. Once the
setup pass is done and deployed, you have a known-good version to fall back
to, and *that's* the moment to start redesigning.

Until then, leave alone:

- Component structure and Tailwind classes in `web/src/components/`.
- `web/src/layouts/Layout.astro` beyond the identity strings in Step 3 — it
  carries the meta tags, structured data, and theme bootstrapping.
- The `active` flag pattern (`docs/CONVENTIONS.md`). Hide content by setting
  `active: false`, not by deleting it. `import.meta.env.DEV` makes inactive
  items visible locally and hidden in production, which is how unfinished
  sections stay unpublished.
- `web/src/content.config.ts` — the Sanity loaders and their no-config
  fallbacks. This is what makes a fork with no Sanity project build at all.
- `.github/workflows/deploy.yml`.
