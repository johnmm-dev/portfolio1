import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

export const sanityClient = createClient({
	projectId: '8iczsrc5',
	dataset: 'production',
	apiVersion: '2025-02-19',
	// Public dataset, published content only: no token needed, safe to run at build time.
	perspective: 'published',
	useCdn: false,
});

const imageBuilder = createImageUrlBuilder(sanityClient);

export const urlForImage = (source: SanityImageSource) => imageBuilder.image(source);
