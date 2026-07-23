import { tags } from './tags';

const CAREER_START_YEAR = 2019;
const experienceYears = new Date().getFullYear() - CAREER_START_YEAR;

export interface AboutLink {
	label: string;
	href: string;
	active: boolean;
	order: number;
}

export interface Stat {
	value: string;
	label: string;
	active: boolean;
}

export const meTeaser = {
	label: 'About',
	heading: "Software engineer with a builder's background.",
	paragraphs: [
		'I design and build backend systems, product workflows, and developer tools. I like understanding how systems fit together, from business rules and data models to the small tools that make daily engineering faster.',
		"Currently, I work at Odoo R&D in Dubai, contributing to ERP systems, product workflows, and production business logic in Odoo's public codebase.",
		'Before Odoo, I worked across freight, logistics, medical auditing, and education technology. My path also includes founding BRACU Duburi, an autonomous underwater robotics team, and creating long-form technical tutorials for Bangla-speaking developers.',
		"Outside work, I'm usually reading, fishing, hiking, or chasing small adventures away from the screen.",
	],
	ctas: [
		{ label: 'Read more about me', href: '/about', active: false, order: 1 },
		{ label: 'View selected work', href: '/selected-work', active: false, order: 2 },
	] satisfies AboutLink[],
	tags: [
		tags.backendSystems,
		tags.productArchitecture,
		tags.erpSystems,
		tags.developerTools,
		tags.robotics,
		tags.technicalWriting,
	],
	stats: [
		{ value: `${experienceYears}+ yrs`, label: 'Software engineering', active: true },
		{ value: 'Odoo R&D', label: 'ERP & product systems', active: true },
		{ value: 'Product Domains', label: 'ERP, logistics, EdTech, auditing', active: true },
		{ value: 'BRACU Duburi', label: 'Underwater robotics team founder', active: true },
		{ value: '23+ hrs', label: 'Technical tutorials', active: true },
		{ value: 'Beyond Code', label: 'Books, fishing, hiking', active: true },
	] satisfies Stat[],
};

export interface AboutSection {
	heading: string;
	body: string;
	active: boolean;
}

export const about = {
	intro:
		'Backend-focused software engineer at Odoo R&D, working around ERP localization, e-invoicing, compliance flows, developer tooling, and product engineering. Former robotics team founder and technical educator.',
	sections: [
		{
			heading: 'Currently',
			body: 'I work on backend and product engineering at Odoo R&D, mostly ERP localization, e-invoicing, and compliance workflows, plus the developer tooling that supports that work.',
			active: true,
		},
		{
			heading: 'Before that',
			body: 'I was a founding team lead of BRACU Duburi, an underwater robotics team, where I worked across hardware and software to get a robot to actually function underwater.',
			active: true,
		},
		{
			heading: 'Teaching',
			body: 'I make long-form technical tutorials for Bangla-speaking developers. My GitHub stays intentionally exploratory: personal projects, learning notes, small tools. This site is the curated version of that work.',
			active: true,
		},
	] satisfies AboutSection[],
	links: [
		{ label: 'GitHub', href: 'https://github.com/adnansabbir', active: true, order: 1 },
		{ label: 'Odoo GitHub', href: 'https://github.com/adns-odoo', active: true, order: 2 },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/adnansabbir', active: true, order: 3 },
	] satisfies AboutLink[],
};
