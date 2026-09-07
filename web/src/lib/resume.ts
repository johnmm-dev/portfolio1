import { sanityClient } from './sanity';

export interface ResumeVariant {
	key: string;
	buttonName: string;
	downloadName: string;
	extension: string;
	url: string;
}

export async function getResumeVariants(): Promise<ResumeVariant[]> {
	const doc = await sanityClient.fetch<{ variants: ResumeVariant[] } | null>(
		`*[_type == "resume" && _id == "resume"][0]{
			variants[]{ "key": _key, buttonName, downloadName, "extension": file.asset->extension, "url": file.asset->url }
		}`,
	);
	return doc?.variants ?? [];
}

// Routed by the variant's Sanity array key, not the free-text downloadName -
// the latter is user-editable and unsafe as a route segment. The extension
// comes from Sanity's own asset metadata (not user text) and is only there
// so the static host can infer the right content type from the file name.
export const resumeHref = (variant: ResumeVariant) => `/resume/${variant.key}.${variant.extension}`;
