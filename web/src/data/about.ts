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
	label: 'About Me',
	heading: "Software engineer with a builder's background.",
	paragraphs: [
		'I design and build backend systems, product workflows, and developer tools. I like understanding how systems fit together, from business rules and data models to the small tools that make daily engineering faster.',
		"Currently, I work at Odoo R&D in Dubai, contributing to ERP systems, product workflows, and production business logic in Odoo's public codebase.",
		'Before Odoo, I worked across freight, logistics, medical auditing, and education technology. My path also includes founding BRACU Duburi, an autonomous underwater robotics team, and creating long-form technical tutorials for Bangla-speaking developers.',
		"Outside work, I'm usually reading, fishing, hiking, or chasing small adventures away from the screen.",
	],
	ctas: [] as AboutLink[],
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
