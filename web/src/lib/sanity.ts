import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

export const sanityClient = createClient({
	projectId: import.meta.env.SANITY_PROJECT_ID,
	dataset: import.meta.env.SANITY_DATASET,
	apiVersion: '2025-02-19',
	// Public dataset, published content only: no token needed, safe to run at build time.
	perspective: 'published',
	useCdn: false, // Only runs at build time, so fresh data matters more than CDN speed.
});

const imageBuilder = createImageUrlBuilder(sanityClient);

export const urlForImage = (source: SanityImageSource) => imageBuilder.image(source);
