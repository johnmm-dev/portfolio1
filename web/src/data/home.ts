export type IconName = 'user' | 'folder' | 'terminal' | 'star' | 'send';

export interface NavItem {
	label: string;
	href: string;
	icon: IconName;
	color: string;
	active: boolean;
}

export const hero = {
	greeting: "Hey, I'm Adnan 👋",
	role: 'Software Engineer',
	subtitle: 'Backend and product engineer at Odoo R&D',
	navItems: [
		{ label: 'Me', href: '#me', icon: 'user', color: '#2563EB', active: true },
		{ label: 'Projects', href: '#projects', icon: 'folder', color: '#059669', active: true },
		{ label: 'Skills', href: '#skills', icon: 'terminal', color: '#7C3AED', active: true },
		{ label: 'Fun', href: '#fun', icon: 'star', color: '#DB2777', active: true },
		{ label: 'Contact', href: '#contact', icon: 'send', color: '#D97706', active: false },
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
