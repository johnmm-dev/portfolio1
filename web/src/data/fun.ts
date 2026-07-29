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
	// Array order only matters on mobile (desktop uses explicit grid placement)
	// and has been hand-tuned by eye so the two masonry columns balance evenly -
	// it no longer follows item number or desktop reading order.
	items: [
		{
			number: 1,
			caption: 'Jumping above the sand dunes during a desert trip.',
			type: 'photo',
			image: '/gallery_images/1.webp',
			active: true,
		},
		{
			number: 2,
			caption: 'An orange-and-white cat stretching on a wooden promenade.',
			type: 'photo',
			image: '/gallery_images/2.webp',
			active: true,
		},
		{
			number: 3,
			caption: 'Carrying the Duburi underwater robot after a pool test.',
			type: 'photo',
			image: '/gallery_images/3.webp',
			active: true,
		},
		{
			number: 6,
			caption: 'Flying a kite on a beach with the Burj Al Arab in the distance.',
			type: 'photo',
			image: '/gallery_images/6.webp',
			active: true,
		},
		{
			number: 10,
			caption: 'A silhouetted person fishing from a small boat at sunrise.',
			type: 'photo',
			image: '/gallery_images/10.webp',
			active: true,
		},
		{
			number: 9,
			caption: 'Star trails over a calm lake at night.',
			type: 'video',
			image: '/gallery_images/9.webp',
			video: '/gallery_images/9.mp4',
			active: true,
		},
		{
			number: 7,
			caption: 'Hiking through the rocky canyon of Wadi Naqab.',
			type: 'video',
			image: '/gallery_images/7.webp',
			video: '/gallery_images/7.mp4',
			active: true,
		},
		{
			number: 8,
			caption: 'A mountain range seen from an airplane window.',
			type: 'photo',
			image: '/gallery_images/8.webp',
			active: true,
		},
		{
			number: 5,
			caption: 'Fireworks lighting up the night sky over a crowded beach.',
			type: 'video',
			image: '/gallery_images/5.webp',
			video: '/gallery_images/5.mp4',
			active: true,
		},
		{
			number: 4,
			caption: 'Riding a motorcycle down a countryside road.',
			type: 'video',
			image: '/gallery_images/4.webp',
			video: '/gallery_images/4.mp4',
			active: true,
		},
	] satisfies GalleryItem[],
};
