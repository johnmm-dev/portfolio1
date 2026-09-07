// Relative import, not the `@/` alias: astro.config.mjs imports writingNavItem
// from this file directly outside the app's Vite alias-resolution context.
import { getExperienceYears } from '../lib/experience';

export type IconName = 'folder' | 'star' | 'send' | 'pen';

export interface NavItem {
	label: string;
	href: string;
	icon: IconName;
	color: string;
	active: boolean;
}

// Inactive items still show up locally under `npm run dev` so they can be
// previewed before flipping `active` to true; the production build excludes
// them from nav rendering (this only hides the nav link and homepage
// section, not the page route itself, which still builds and is reachable
// directly, just unlinked and excluded from the sitemap, see astro.config.mjs).
export const isNavItemVisible = (item: NavItem) => item.active || import.meta.env.DEV;

// Exported on its own so other files (the homepage Writing section, the
// sitemap filter) can reference this exact item directly instead of
// searching `navItems` by label, which would silently break if the label's
// display text ever changed.
export const writingNavItem: NavItem = {
	label: 'Writing',
	href: '#writing',
	icon: 'pen',
	color: '#0891B2',
	active: true,
};

export interface ProofPoint {
	value: string;
	label: string;
	mobileLabel: string;
}

export const hero = {
	greeting: "Hey, I'm Adnan 👋",
	role: 'Software Engineer',
	subtitle: 'Building full-stack products across EdTech, logistics, auditing, and ERP',
	proofPoints: [
		{ value: `${getExperienceYears()}+ years`, label: 'Production engineering', mobileLabel: 'Experience' },
		{ value: 'Odoo R&D', label: 'Standard & Enterprise contributor', mobileLabel: 'Current team' },
		{ value: 'Full-stack', label: 'Backend, frontend & DevOps', mobileLabel: 'BE + FE + DevOps' },
	] satisfies ProofPoint[],
	navItems: [
		{ label: 'Work', href: '#work', icon: 'folder', color: '#2563EB', active: true },
		writingNavItem,
		{ label: 'Fun', href: '#fun', icon: 'star', color: '#DB2777', active: true },
		{ label: 'Contact', href: '#contact', icon: 'send', color: '#D97706', active: true },
	] satisfies NavItem[],
};

export interface FluidTheme {
	palette: string[];
	brightness: number;
}

export const fluidThemes: { light: FluidTheme; dark: FluidTheme } = {
	light: { palette: ['#339af0', '#51cf66', '#f06595', '#fcc419', '#9775fa'], brightness: 0.7 },
	dark: { palette: ['#1864ab', '#2b8a3e', '#862e9c', '#c2255c', '#e8590c'], brightness: 0.4 },
};
