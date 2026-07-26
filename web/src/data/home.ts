export type IconName = 'user' | 'folder' | 'terminal' | 'star' | 'send' | 'pen';

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

export const hero = {
	greeting: "Hey, I'm Adnan 👋",
	role: 'Software Engineer',
	subtitle: 'Backend and product engineer at Odoo R&D',
	navItems: [
		{ label: 'Me', href: '#me', icon: 'user', color: '#2563EB', active: true },
		{ label: 'Projects', href: '#projects', icon: 'folder', color: '#059669', active: true },
		{ label: 'Skills', href: '#skills', icon: 'terminal', color: '#7C3AED', active: true },
		{ label: 'Fun', href: '#fun', icon: 'star', color: '#DB2777', active: true },
		writingNavItem,
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
