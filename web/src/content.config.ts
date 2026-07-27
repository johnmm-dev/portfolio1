import { defineCollection, type CollectionEntry } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { tags } from '@/data/tags';
import { sanityClient, urlForImage } from '@/lib/sanity';

const tagKeys = Object.keys(tags) as [keyof typeof tags, ...(keyof typeof tags)[]];

const BLOG_QUERY = `*[_type == "blogPost"]{
	title,
	"slug": slug.current,
	description,
	pubDate,
	tags,
	draft,
	seriesInfo,
	thumbnail{ alt, "asset": asset-> },
	body
}`;

function sanityBlogLoader(): Loader {
	return {
		name: 'sanity-blog',
		load: async ({ store, parseData, logger }) => {
			const posts = await sanityClient.fetch(BLOG_QUERY);
			store.clear();
			for (const post of posts) {
				const data = await parseData({
					id: post.slug,
					data: {
						title: post.title,
						description: post.description,
						pubDate: post.pubDate,
						tags: post.tags ?? [],
						draft: post.draft ?? false,
						seriesInfo: post.seriesInfo ?? undefined,
						thumbnail: post.thumbnail
							? {
									url: urlForImage(post.thumbnail.asset).width(1200).height(630).fit('crop').auto('format').url(),
									alt: post.thumbnail.alt ?? '',
								}
							: undefined,
						body: post.body ?? [],
					},
				});
				store.set({ id: post.slug, data });
			}
			logger.info(`Loaded ${posts.length} post(s) from Sanity`);
		},
	};
}

const blog = defineCollection({
	loader: sanityBlogLoader(),
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
		// Pre-resolved Sanity CDN URL (1200x630) and alt text.
		thumbnail: z.object({ url: z.string(), alt: z.string() }).optional(),
		// Portable Text blocks, rendered to HTML at the page level via @portabletext/to-html.
		body: z.array(z.any()).default([]),
	}),
});

export const collections = { blog };

// Draft posts still show up locally under `npm run dev` so they can be
// previewed before flipping `draft` to false; the production build excludes
// them entirely.
export const isPostVisible = (post: CollectionEntry<'blog'>) => !post.data.draft || import.meta.env.DEV;
