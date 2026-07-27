import { toHTML } from '@portabletext/to-html';
import type { TypedObject } from '@portabletext/types';
import { urlForImage } from '@/lib/sanity';

const components = {
	marks: {
		link: ({ value, children }: { value?: { href: string }; children: string }) =>
			`<a href="${value?.href}">${children}</a>`,
	},
	types: {
		image: ({ value }: { value: unknown }) =>
			`<img src="${urlForImage(value as Parameters<typeof urlForImage>[0])
				.width(1000)
				.auto('format')
				.url()}" alt="" />`,
	},
};

export const renderPortableText = (body: TypedObject[]) => toHTML(body, { components });
