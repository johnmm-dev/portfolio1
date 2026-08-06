import { toHTML, escapeHTML } from '@portabletext/to-html';
import type { TypedObject } from '@portabletext/types';
import { urlForImage } from '@/lib/sanity';

const components = {
	marks: {
		link: ({ value, children }: { value?: { href: string }; children: string }) =>
			`<a href="${escapeHTML(value?.href ?? '')}">${children}</a>`,
	},
	types: {
		image: ({ value }: { value: { alt: string; description?: string } }) => {
			const img = `<img src="${urlForImage(value as Parameters<typeof urlForImage>[0])
				.width(1000)
				.auto('format')
				.url()}" alt="${escapeHTML(value.alt)}" />`;
			if (!value.description) return `<figure>${img}</figure>`;
			return `<figure>${img}<figcaption>${escapeHTML(value.description)}</figcaption></figure>`;
		},
	},
};

export const renderPortableText = (body: TypedObject[]) => toHTML(body, { components });
