import { toHTML, escapeHTML } from '@portabletext/to-html';
import type { TypedObject } from '@portabletext/types';
import { urlForImage } from '@/lib/sanity';

const extractYouTubeId = (url: string) =>
	url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];

const components = {
	marks: {
		link: ({ value, children }: { value?: { href: string }; children: string }) =>
			`<a href="${escapeHTML(value?.href ?? '')}" target="_blank" rel="noopener noreferrer">${children}</a>`,
	},
	types: {
		image: ({ value }: { value: { alt: string; description?: string } }) => {
			const img = `<img src="${urlForImage(value as Parameters<typeof urlForImage>[0])
				.width(1000)
				.auto('format')
				.url()}" alt="${escapeHTML(value.alt)}" loading="lazy" decoding="async" />`;
			if (!value.description) return `<figure>${img}</figure>`;
			return `<figure>${img}<figcaption>${escapeHTML(value.description)}</figcaption></figure>`;
		},
		youtube: ({ value }: { value: { url: string } }) => {
			const id = extractYouTubeId(value.url);
			if (!id) return '';
			return `<div class="youtube-embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
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
