export const ORGANIC_CAMPAIGN = 'organic_share';

export interface SharePlatform {
	source: string;
	medium: 'social' | 'referral';
	label: string;
}

// source doubles as utm_source and the GA4 share_click platform param.
export const SHARE_PLATFORMS = {
	facebook: { source: 'facebook', medium: 'social', label: 'Facebook' },
	twitter: { source: 'twitter', medium: 'social', label: 'Twitter' },
	linkedin: { source: 'linkedin', medium: 'social', label: 'LinkedIn' },
	whatsapp: { source: 'whatsapp', medium: 'social', label: 'WhatsApp' },
	// referral, not social - an aggregator, and mine only: a reader can't submit for me.
	dailydev: { source: 'dailydev', medium: 'referral', label: 'Daily.dev' },
} satisfies Record<string, SharePlatform>;

export const READER_PLATFORMS = ['facebook', 'twitter', 'linkedin', 'whatsapp'] as const;
export type ReaderPlatformKey = (typeof READER_PLATFORMS)[number];

export const ADMIN_PLATFORMS = [...READER_PLATFORMS, 'dailydev'] as const;

// Only share URLs get tagged; canonical URLs stay clean.
export function buildTrackedUrl(base: string | URL, platform: SharePlatform, campaign: string) {
	const url = new URL(base);
	url.searchParams.set('utm_source', platform.source);
	url.searchParams.set('utm_medium', platform.medium);
	url.searchParams.set('utm_campaign', campaign);
	return url.toString();
}
