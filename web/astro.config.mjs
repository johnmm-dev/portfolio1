// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { loadEnv } from 'vite';

import { writingNavItem } from './src/data/home.ts';

// `import.meta.env` isn't available in this file, so read the same two vars
// web/src/lib/sanity.ts reads: .env locally, real env vars in CI. Without
// them the /writing routes still build (Astro can't skip a static route),
// but they have no posts behind them, so they stay out of the sitemap.
const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), ''), ...process.env };
const isSanityConfigured = Boolean(env.SANITY_PROJECT_ID && env.SANITY_DATASET);

// https://astro.build/config
export default defineConfig({
	site: 'https://adnansabbir.com',
	integrations: [
		sitemap({
			filter: (page) => {
				const { pathname } = new URL(page);

				if (pathname.startsWith('/writing/review/')) return false;

				// Skip pages whose homepage nav link is turned off, or whose
				// content source isn't configured, so an unlaunched section's
				// routes (e.g. /writing before it's ready) aren't advertised to
				// search engines via the sitemap.
				if (writingNavItem.active && isSanityConfigured) return true;
				return pathname !== '/writing/' && !pathname.startsWith('/writing/');
			},
		}),
	],
	devToolbar: {
		enabled: false,
	},
	server: {
		// Lets the preview/dev server accept requests tunneled through ngrok
		// (e.g. for testing on a phone that can't reach the LAN IP).
		allowedHosts: ['.ngrok-free.app'],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
