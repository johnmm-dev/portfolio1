// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { writingNavItem } from './src/data/home.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://adnansabbir.com',
	integrations: [
		sitemap({
			filter: (page) => {
				const { pathname } = new URL(page);

				if (pathname.startsWith('/writing/review/')) return false;

				// Skip pages whose homepage nav link is turned off, so an
				// unlaunched section's routes (e.g. /writing before it's ready)
				// aren't advertised to search engines via the sitemap.
				if (writingNavItem.active) return true;
				return pathname !== '/writing/' && !pathname.startsWith('/writing/');
			},
		}),
	],
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
