import type { APIRoute, GetStaticPaths } from 'astro';
import { getResumeVariants } from '@/lib/resume';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
	const variants = await getResumeVariants();
	return variants.map((variant) => ({
		params: { key: `${variant.key}.${variant.extension}` },
		props: { url: variant.url },
	}));
};

export const GET: APIRoute = async ({ props }) => {
	const response = await fetch(props.url as string);
	if (!response.ok) {
		throw new Error(`Failed to fetch resume file from ${props.url}: ${response.status} ${response.statusText}`);
	}

	const buffer = await response.arrayBuffer();
	return new Response(buffer, {
		headers: { 'Content-Type': response.headers.get('content-type') ?? 'application/octet-stream' },
	});
};
