# Conventions

Patterns actually established while building this site, kept up to date as
development continues.

## Directory structure

```
src/
├── components/
│   ├── common/          shared, feature-agnostic components (like an Angular
│   │   │                SharedModule) — usable from any page
│   │   ├── icons/        one .astro component per icon
│   │   ├── IconCard.astro
│   │   └── ThemeToggle.astro
│   └── home/             components only the homepage uses
│       ├── Hero.astro
│       └── FluidBackground.astro
├── data/                 typed .ts files holding page content/config (see below)
├── layouts/               page shells (Layout.astro)
└── pages/                 file-based routes
```

`src/data/` is deliberately separate from Astro's `src/content/` — the latter
is reserved for Content Collections (schema-validated Markdown/MDX), not yet
used. Plain page copy/config that doesn't need that machinery goes in
`src/data/` as a typed exported const.

## Content/data separation

Page copy and structured content (greeting text, headline, nav items, theme
palettes) live in typed `.ts` files under `src/data/`, imported into `.astro`
components — never hardcoded directly in a component's template. One place to
edit text without touching component code.

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
`prefers-reduced-motion` is set, and scoped to the hero section only
(`overflow-hidden` on the section, canvas `absolute inset-0`, content wrapped
in `relative z-10`). Its color palettes live in `data/home.ts`'s
`fluidThemes`, not hardcoded inline in the component.

## TypeScript

- Astro's `astro/tsconfigs/strict` preset is used as-is.
- Component inputs are typed via a local `interface Props`.
- Content data files export typed consts (e.g. `NavItem[]`, `FluidTheme`).
