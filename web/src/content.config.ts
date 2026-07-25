import { defineCollection, type CollectionEntry } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };

// Draft posts still show up locally under `npm run dev` so they can be
// previewed before flipping `draft` to false; the production build excludes
// them entirely.
export const isPostVisible = (post: CollectionEntry<'blog'>) => !post.data.draft || import.meta.env.DEV;
