import { toHTML, escapeHTML } from '@portabletext/to-html';
import type { TypedObject } from '@portabletext/types';
import { urlForImage } from '@/lib/sanity';

const extractYouTubeId = (url: string) => url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];

// Keep in sync with the aspectRatio field's `initialValue` in
// studio/schemaTypes/blogPost.ts (the two projects can't share a constant).
const DEFAULT_GALLERY_ASPECT_RATIO = '4 / 3';

type SanityImageRef = Parameters<typeof urlForImage>[0];

type FigureImage = { alt: string; description?: string };

type GalleryValue = {
	columns: number;
	aspectRatio?: string;
	images: FigureImage[];
};

const renderFigure = (image: FigureImage, source: SanityImageRef, width: number) => {
	const img = `<img src="${urlForImage(source)
		.width(width)
		.auto('format')
		.url()}" alt="${escapeHTML(image.alt)}" loading="lazy" decoding="async" />`;
	if (!image.description) return `<figure>${img}</figure>`;
	return `<figure>${img}<figcaption>${escapeHTML(image.description)}</figcaption></figure>`;
};

const components = {
	marks: {
		link: ({ value, children }: { value?: { href: string }; children: string }) =>
			`<a href="${escapeHTML(value?.href ?? '')}" target="_blank" rel="noopener noreferrer">${children}</a>`,
	},
	types: {
		image: ({ value }: { value: FigureImage }) => renderFigure(value, value as SanityImageRef, 1000),
		gallery: ({ value }: { value: GalleryValue }) => {
			const figures = (value.images ?? []).map((image) => renderFigure(image, image as SanityImageRef, 800)).join('');
			const columns = Number(value.columns) || 2;
			const aspectRatio = escapeHTML(value.aspectRatio ?? DEFAULT_GALLERY_ASPECT_RATIO);
			return `<div class="gallery" style="--gallery-columns: ${columns}; --gallery-aspect-ratio: ${aspectRatio}">${figures}</div>`;
		},
		youtube: ({ value }: { value: { url: string; caption?: string } }) => {
			const id = extractYouTubeId(value.url);
			if (!id) return '';
			const embed = `<div class="youtube-embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
			if (!value.caption) return `<figure>${embed}</figure>`;
			return `<figure>${embed}<figcaption>${escapeHTML(value.caption)}</figcaption></figure>`;
		},
		facebookVideo: ({ value }: { value: { url: string; caption?: string } }) => {
			const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(value.url)}&show_text=false`;
			const embed = `<div class="facebook-video-embed"><iframe src="${src}" title="Facebook video player" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
			if (!value.caption) return `<figure>${embed}</figure>`;
			return `<figure>${embed}<figcaption>${escapeHTML(value.caption)}</figcaption></figure>`;
		},
	},
};

export const renderPortableText = (body: TypedObject[]) => toHTML(body, { components });
