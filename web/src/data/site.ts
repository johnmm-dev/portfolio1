import { getExperienceYears } from '@/lib/experience';

// Who the site belongs to. Every string that names the owner lives here rather
// than inline in a page or component, so a fork changes its identity by editing
// one file — see docs/FORKING.md. Same reasoning as the rest of `data/`, just
// applied to site-wide metadata instead of one section's copy.
export const owner = {
	name: 'John Meeker',
	jobTitle: 'Full-Stack Developer',
	// Leave empty when between roles - Layout.astro omits `worksFor` from the
	// structured data rather than publishing a blank organization.
	employer: '',
};

// Brand suffix for fixed pages, per "Page <title> format" in
// docs/CONVENTIONS.md. Blog post pages deliberately pass a bare post title
// with no suffix, so they don't call this.
export const withBrand = (pageTitle: string) => `${pageTitle} — ${owner.name}`;

export const pageTitles = {
	// Name first here, role second — the homepage is the one page whose title
	// leads with the person rather than the page.
	home: `${owner.name} — ${owner.jobTitle}`,
	writing: withBrand('Writing'),
	series: withBrand('Series'),
	notFound: withBrand('Page Not Found'),
};

export const homeDescription = `Portfolio of ${owner.name}, an Illinois-based full-stack developer with ${getExperienceYears()}+ years building backend systems with Node.js, TypeScript, and PostgreSQL: REST APIs, real-time features, integrations, and data migrations.`;
