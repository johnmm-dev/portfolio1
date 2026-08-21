import { tags, type Tag } from './tags';

export interface WorkItem {
	title: string;
	description: string;
	logo?: string;
	// Intrinsic dimensions of `logo`, so the <img> can reserve its layout
	// space before loading (prevents layout shift).
	logoWidth?: number;
	logoHeight?: number;
	icon?: 'youtube';
	href?: string;
	linkLabel?: string;
	tags: Tag[];
	active: boolean;
	order: number;
}

export const selectedWorkTeaser = {
	label: 'Projects',
	heading: 'A few things I’ve built and led.',
	items: [
		{
			title: 'Odoo Production Contributions',
			description:
				"Public, reviewed pull requests to Odoo's core codebase under @adns-odoo: ERP features, fixes, and production business logic.",
			logo: '/work/odoo.webp',
			logoWidth: 300,
			logoHeight: 131,
			href: 'https://github.com/odoo/odoo/pulls?q=is%3Apr+author%3Aadns-odoo',
			linkLabel: 'View contributions',
			tags: [tags.erpSystems, tags.backendSystems],
			active: true,
			order: 1,
		},
		{
			title: 'House of Math',
			description:
				'Backend and distributed systems work on the gamification team at Cefalo Bangladesh Ltd, scaling House of Math’s learning platform to 2M+ users.',
			logo: '/work/house-of-math.svg',
			logoWidth: 234,
			logoHeight: 45,
			href: 'https://www.houseofmath.com/',
			linkLabel: 'Visit site',
			tags: [tags.edtech, tags.backendSystems],
			active: true,
			order: 2,
		},
		{
			title: 'BRACU Duburi — Underwater Robotics',
			description:
				'Founded and led the first team from Bangladesh in an international autonomous underwater robotics challenge.',
			logo: '/work/bracu-duburi.webp',
			logoWidth: 168,
			logoHeight: 64,
			href: 'https://bracu-duburi.github.io/#/auv/duburi_2',
			linkLabel: 'View project',
			tags: [tags.robotics],
			active: true,
			order: 3,
		},
		{
			title: 'YouTube Tutorial Series',
			description: 'Long-form frontend development tutorials for Bangla-speaking developers.',
			icon: 'youtube',
			href: 'https://www.youtube.com/@AdnanSabbirr',
			linkLabel: 'Watch on YouTube',
			tags: [tags.technicalWriting],
			active: true,
			order: 4,
		},
	] satisfies WorkItem[],
};
