import { getExperienceYears } from '@/lib/experience';

export interface BeyondRoleLink {
	label: string;
	href: string;
}

export interface BeyondRoleEntry {
	icon: 'waves' | 'play' | 'terminal';
	title: string;
	description: string;
	links?: BeyondRoleLink[];
	active: boolean;
	order: number;
}

export const beyondRolesTeaser = {
	heading: 'Beyond full-time roles',
	eyebrow: 'Things I’ve built, led, and taught.',
};

export const beyondRoles: BeyondRoleEntry[] = [
	{
		icon: 'waves',
		title: 'BRACU Duburi',
		description:
			'Founded and led Bangladesh’s first university team to compete internationally with an autonomous underwater robot.',
		links: [
			{ label: 'Explore the project', href: 'https://bracuduburi.com/' },
			{ label: 'Read the story', href: '/writing/series/the-years-i-built-robots' },
		],
		active: true,
		order: 1,
	},
	{
		icon: 'play',
		title: 'Technical tutorials',
		description:
			'Created more than 23 hours of development tutorials, taught robotics and programming, and mentored Bangla-speaking students preparing for technical careers.',
		links: [
			{
				label: 'Development tutorials',
				href: 'https://www.youtube.com/playlist?list=PLv2W1EeZUbo5B_f1fr6WkvpirXrEfun28',
			},
			{
				label: 'Robotics tutorials',
				href: 'https://www.youtube.com/watch?v=4V2NG9wXXwY&list=PLrtbUd1CHRE6xYzxZw2VcPBsXUHWzKm54',
			},
		],
		active: true,
		order: 2,
	},
	{
		icon: 'terminal',
		title: 'Startup consulting',
		description:
			'Worked with early-stage startups to evaluate product ideas, plan technical approaches, and turn early requirements into buildable products.',
		active: true,
		order: 3,
	},
	{
		icon: 'terminal',
		title: 'Independent products & tools',
		description:
			'Build small products, developer tools, and technical experiments to solve practical problems and explore new ideas.',
		active: true,
		order: 4,
	},
];

export const workTeaser = {
	label: 'Work',
	heading: 'Products, systems, and teams I’ve helped move forward.',
	paragraphs: [
		`For ${getExperienceYears()}+ years, I have built full-stack products across EdTech, logistics, auditing, and ERP. My work spans shared frontend foundations, backend systems, performance improvements, and production workflows. I currently contribute to Odoo’s Standard and Enterprise codebases as part of its R&D team in Dubai.`,
		'Beyond full-time roles, I have consulted for startups, built independent products, taught robotics and programming, and mentored students. I also founded BRACU Duburi and created technical tutorials on robotics.',
	],
};
