import { defineCollection, type CollectionEntry } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { tags } from '@/data/tags';
import { sanityClient, urlForImage } from '@/lib/sanity';

const tagKeys = Object.keys(tags) as [keyof typeof tags, ...(keyof typeof tags)[]];

// Backstop for the schema's required() rules - filters out anything
// published before they existed or via a route that bypasses Studio.
const BLOG_QUERY = `*[
	_type == "blogPost" &&
	defined(slug.current) &&
	defined(title) &&
	defined(description) &&
	defined(pubDate) &&
	count(body) > 0
]{
	title,
	"slug": slug.current,
	description,
	pubDate,
	tags,
	draft,
	seriesInfo{ "slug": series->slug.current, "name": series->name, part },
	thumbnail{ alt, "asset": asset-> },
	body
}`;

// Locally, show every series (like draft posts); in production, only series with a visible post.
const SERIES_HAS_VISIBLE_POST = import.meta.env.DEV
	? 'true'
	: 'count(*[_type == "blogPost" && seriesInfo.series._ref == ^._id && coalesce(draft, false) == false]) > 0';
const SERIES_QUERY = `*[
	_type == "series" &&
	defined(slug.current) &&
	defined(name) &&
	defined(description) &&
	defined(image.asset) &&
	defined(image.alt) &&
	${SERIES_HAS_VISIBLE_POST}
]{
	name,
	"slug": slug.current,
	description,
	status,
	image{ alt, "asset": asset-> }
}`;

function sanitySeriesLoader(): Loader {
	return {
		name: 'sanity-series',
		load: async ({ store, parseData, logger }) => {
			const series = await sanityClient.fetch(SERIES_QUERY);
			store.clear();
			let loaded = 0;
			for (const item of series) {
				// A single malformed series shouldn't take down the whole build.
				try {
					const data = await parseData({
						id: item.slug,
						data: {
							name: item.name,
							description: item.description,
							status: item.status,
							image: {
								url: urlForImage(item.image.asset).width(1200).height(630).fit('crop').auto('format').url(),
								alt: item.image.alt,
							},
						},
					});
					store.set({ id: item.slug, data });
					loaded++;
				} catch (error) {
					logger.warn(`Skipping series "${item.slug ?? item.name ?? 'unknown'}": ${error}`);
				}
			}
			logger.info(`Loaded ${loaded}/${series.length} series from Sanity`);
		},
	};
}

function sanityBlogLoader(): Loader {
	return {
		name: 'sanity-blog',
		load: async ({ store, parseData, logger }) => {
			const posts = await sanityClient.fetch(BLOG_QUERY);
			store.clear();
			let loaded = 0;
			for (const post of posts) {
				// A single malformed post shouldn't take down the whole build.
				try {
					const data = await parseData({
						id: post.slug,
						data: {
							title: post.title,
							description: post.description,
							pubDate: post.pubDate,
							tags: post.tags ?? [],
							draft: post.draft ?? false,
							// series-> only resolves if that series is published; treat an
							// unresolved reference as "no series" rather than failing the post.
							seriesInfo:
								post.seriesInfo?.slug && post.seriesInfo?.name
									? { slug: post.seriesInfo.slug, name: post.seriesInfo.name, part: post.seriesInfo.part }
									: undefined,
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
					loaded++;
				} catch (error) {
					logger.warn(`Skipping blogPost "${post.slug ?? post.title ?? 'unknown'}": ${error}`);
				}
			}
			logger.info(`Loaded ${loaded}/${posts.length} post(s) from Sanity`);
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
		body: z.array(z.any()).min(1),
	}),
});

const series = defineCollection({
	loader: sanitySeriesLoader(),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		status: z.enum(['inProgress', 'completed']),
		// Pre-resolved Sanity CDN URL (1200x630) and alt text.
		image: z.object({ url: z.string(), alt: z.string() }),
	}),
});

export const collections = { blog, series };

// Draft posts still show up locally under `npm run dev` so they can be
// previewed before flipping `draft` to false; the production build excludes
// them entirely.
export const isPostVisible = (post: CollectionEntry<'blog'>) => !post.data.draft || import.meta.env.DEV;
