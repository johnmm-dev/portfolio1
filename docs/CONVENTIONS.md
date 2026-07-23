# Conventions

Patterns actually established while building this site, kept up to date as
development continues.

## Directory structure

```
web/src/
├── components/
│   ├── common/          shared, feature-agnostic components (like an Angular
│   │   │                SharedModule) — usable from any page
│   │   ├── icons/        one .astro component per icon
│   │   ├── IconCard.astro
│   │   └── ThemeToggle.astro
│   └── home/             components only the homepage uses
│       ├── Hero.astro
│       ├── Me.astro
│       └── FluidBackground.astro
├── data/                 typed .ts files holding page content/config (see below)
├── layouts/               page shells (Layout.astro)
└── pages/                 file-based routes
```

`web/src/data/` is deliberately separate from Astro's `web/src/content/` —
the latter is reserved for Content Collections (schema-validated
Markdown/MDX), not yet used. Plain page copy/config that doesn't need that
machinery goes in `web/src/data/` as a typed exported const.

## Content/data separation

Page copy and structured content (greeting text, headline, nav items, theme
palettes) live in typed `.ts` files under `web/src/data/`, imported into
`.astro` components — never hardcoded directly in a component's template. One
place to edit text without touching component code.

## Content visibility (`active` flag)

List-based content items (nav cards, CTAs, tags, stats, etc.) carry an
`active: boolean` field rather than being deleted or commented out to hide
them. Every render site does `.filter((item) => item.active).map(...)`
before rendering. Toggling content on/off is then a one-line data change —
reversible and visible in `git diff` — instead of editing component code or
losing the content entirely.

## Shared content registries

Content reused across multiple pages (e.g. tags) lives in its own keyed
registry file (`data/tags.ts`), not duplicated inline wherever it's used.
Each entry is referenced by key (`tags.backendSystems`) rather than
redeclared as a literal object, so renaming or restyling a shared piece of
content is a one-file change. Pages import the registry and pick the subset
they need, rather than each page owning its own copy of the same content.

## Icon pattern

Icons are `.astro` components, not raw `.svg` files — a raw `<img src="icon.svg">`
can't be recolored via CSS/props, which breaks the multi-colored icon design.

- `components/common/icons/IconBase.astro` holds the shared `<svg>` wrapper
  (size, stroke attributes) and exposes a `<slot />` for the inner path markup.
- Each icon (`UserIcon.astro`, `FolderIcon.astro`, etc.) wraps `IconBase` and
  supplies only its own path/shape.
- Consumers (e.g. `IconCard.astro`) resolve an icon from a string key (e.g.
  `icon: 'user'`) via a local lookup object, keeping `data/` files as pure
  content with no component imports.

## Mobile-first responsive rule

Unprefixed Tailwind utility classes are the mobile/base style; `sm:`, `md:`,
`lg:` progressively layer on larger-screen overrides — never the reverse
(never write desktop-first and retrofit down).

Example: `IconCard` renders as a horizontal row (icon left, label right, full
width) on mobile, and switches to a square tile (icon top, label below) inside
a grid at `sm:` and up.

## Dark/light theme

- Class-based dark mode: a `.dark` class on `<html>` drives Tailwind's `dark:`
  variant (via a `@custom-variant` in `global.css`), not the media-query
  default — this is what lets a manual toggle override the system preference.
- Initial theme is resolved by a FOUC-safe **inline** (`is:inline`) script in
  `Layout.astro`, which must run before first paint: checks `localStorage`
  first, falls back to `prefers-color-scheme`.
- `ThemeToggle.astro` flips the class, persists the choice to `localStorage`,
  and dispatches a `theme-change` window event so other components (e.g.
  `FluidBackground`) can react without being directly coupled to the toggle.

## WebGL fluid background

`FluidBackground.astro` uses the `webgl-fluid-enhanced` npm package rather
than vendoring raw shader code. It's loaded via a dynamic `import()` so it
never blocks initial page render, skipped entirely when
`prefers-reduced-motion` is set, and mounted once at the page level
(`index.astro`) as a `position: fixed`, `inset-0` layer pinned to the
viewport — not scoped to a single section — so its render cost stays
constant as more homepage sections are added. Each homepage section's
content wrapper uses `relative z-10` so its content stacks above the fixed
canvas (a fixed element always creates its own stacking context and paints
above non-positioned content when `z-index` is left `auto`). Its color
palettes live in `data/home.ts`'s `fluidThemes`, not hardcoded inline in the
component.

## TypeScript

- Astro's `astro/tsconfigs/strict` preset is used as-is.
- Component inputs are typed via a local `interface Props`.
- Content data files export typed consts (e.g. `NavItem[]`, `FluidTheme`).

## Prettier: `bracketSameLine`

`.prettierrc.json` sets `bracketSameLine: true`, so a multi-line tag's closing
`>` sits on the same line as its last attribute instead of getting its own
line — one fewer line per wrapped tag, with no effect on rendering (`class`
attribute values are just whitespace-normalized strings either way).

## Long `class` lists: `class:list`

Only for `class` strings long enough to force an ugly attribute wrap (roughly
over ~120 chars), use Astro's `class:list={[...]}` directive instead of a
single `class="..."` string, splitting the array into logical groups (base
utilities, `md:` overrides, `dark:` overrides, state variants). Prettier then
wraps each array element onto its own line regardless of `printWidth`, which
reads far better than one giant wrapped string — and `prettier-plugin-tailwindcss`
still sorts the classes inside each array element. Short `class` strings stay
as plain `class="..."` — this isn't a wholesale replacement of `class`.

**Caveat:** running `prettier --write` on a file that mixes a multi-line
`class:list` array with a self-closing child tag (e.g. `<GithubIcon />`) has
been observed to corrupt the markup — dropping the tag's closing `>`, losing
the child's `/>`, and misplacing a `</div>`. Always diff (or rebuild/re-check)
after formatting a file that uses `class:list`, rather than trusting the
formatter blindly.
