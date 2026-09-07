import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;

export const sanityClient =
	projectId && dataset
		? createClient({
				projectId,
				dataset,
				apiVersion: '2025-02-19',
				// Public dataset, published content only: no token needed, safe to run at build time.
				perspective: 'published',
				useCdn: false, // Only runs at build time, so fresh data matters more than CDN speed.
			})
		: null;

export const isSanityConfigured = sanityClient !== null;

const imageBuilder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export const urlForImage = (source: SanityImageSource) => {
	if (!imageBuilder) throw new Error('urlForImage called with no Sanity configuration');
	return imageBuilder.image(source);
};
