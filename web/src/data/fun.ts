export type GalleryType = 'photo' | 'video';

export interface GalleryItem {
	number: number;
	caption: string;
	type: GalleryType;
	image?: string;
	video?: string;
	active: boolean;
}

export const funGallery = {
	label: 'Fun',
	heading: 'Life outside the screen.',
	// Add photos under public/gallery_images/ and list them here. The section
	// and its nav link stay hidden until at least one item is active (see
	// pages/index.astro and the Fun entry in data/home.ts). The desktop grid
	// is laid out for items numbered 1-10, see Fun.astro.
	items: [] as GalleryItem[],
};
