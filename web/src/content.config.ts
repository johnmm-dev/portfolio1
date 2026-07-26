import { defineCollection, type CollectionEntry } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { tags } from '@/data/tags';

const tagKeys = Object.keys(tags) as [keyof typeof tags, ...(keyof typeof tags)[]];

const blog = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		// Must be keys from data/tags.ts, the same registry the homepage's
		// About/Skills tags use, so blog and homepage tags stay one vocabulary.
		tags: z.array(z.enum(tagKeys)).default([]),
		draft: z.boolean().default(false),
		// Optional multi-part post grouping, keyed by `slug`; `name` is the display title.
		seriesInfo: z
			.object({
				slug: z.string(),
				name: z.string(),
				part: z.number().int().positive(),
			})
			.optional(),
		// Filename only, relative to public/blog/. Used both as the listing
		// card thumbnail and directly as the og:image/twitter:image for the post.
		thumbnail: z.string().optional(),
	}),
});

export const collections = { blog };

// Draft posts still show up locally under `npm run dev` so they can be
// previewed before flipping `draft` to false; the production build excludes
// them entirely.
export const isPostVisible = (post: CollectionEntry<'blog'>) => !post.data.draft || import.meta.env.DEV;
