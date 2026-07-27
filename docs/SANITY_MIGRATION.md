# Sanity migration (Studio live, Astro fetch not yet integrated)

Blog posts are currently local `.mdx` files under `web/src/content/blog/`,
loaded via Astro's `astro:content` glob loader (see `content.config.ts`).
The plan is to move posts into Sanity Studio instead, fetching and building
from there.

**Studio setup is done**: a real local Studio project lives at root-level
`studio/` (schema as source in `studio/schemaTypes/`, deployed via
`npx sanity schema deploy`), with a hosted Studio at
https://adnansabbir-blog.sanity.studio/. Project `8iczsrc5`, dataset
`production`. The three existing posts are already pushed as `blogPost`
documents.

**Not yet done**: the actual Astro build still reads from the local `.mdx`
files, not Sanity. Update `content.config.ts`, `Writing.astro`,
`writing/index.astro`, and `writing/[slug].astro` to fetch from Sanity
instead when that integration is built, then discard the `.mdx` files.

## Schema

The Sanity Studio schema (`blogPost` document type) mirrors the current MDX
front matter one field at a time, with two deliberate differences:
`thumbnail` becomes a real Sanity `image` asset (with a required `alt`
field, closing a gap the local-file version had), and `body` uses Sanity's
native Portable Text (`array` of `block`/`image`) rather than
markdown/MDX — chosen for the nicer Studio editing UI, at the cost of
needing a Portable Text renderer on the Astro side instead of reusing
`astro:content`'s `render(post)`.

## Install

```bash
npm install @sanity/client
```

No read token/API key needed — the dataset is public. Only `projectId` and
`dataset` (public identifiers) are required.

## Client config

Runs during the Astro build, not in the browser.

```ts
// Sanity configuration
// Public dataset: no API token required.
// Intended to run during the Astro build, not in the browser.

import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '8iczsrc5',
  dataset: 'production',
  apiVersion: '2025-02-19',
  perspective: 'published',
  useCdn: false, // Get the newest content during each build
});
```

## Fetch the blog listing

Excludes `body` to keep the listing query smaller.

```ts
export const BLOG_LIST_QUERY = `
  *[
    _type == "blogPost" &&
    draft != true &&
    defined(slug.current) &&
    pubDate <= now()
  ]
  | order(pubDate desc) {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    description,
    pubDate,
    tags,
    seriesInfo,
    thumbnail {
      alt,
      crop,
      hotspot,
      asset-> {
        _id,
        url,
        mimeType,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  }
`;

const blogPosts = await sanityClient.fetch(BLOG_LIST_QUERY);
```

## Fetch one complete blog post

```ts
export const BLOG_POST_QUERY = `
  *[
    _type == "blogPost" &&
    slug.current == $slug &&
    draft != true &&
    pubDate <= now()
  ][0] {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    description,
    pubDate,
    tags,
    seriesInfo,
    thumbnail {
      alt,
      crop,
      hotspot,
      asset-> {
        _id,
        url,
        mimeType,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset-> {
          _id,
          url,
          mimeType,
          metadata {
            dimensions,
            lqip
          }
        }
      }
    }
  }
`;

const blogPost = await sanityClient.fetch(BLOG_POST_QUERY, {
  slug: 'learning-to-build',
});
```
