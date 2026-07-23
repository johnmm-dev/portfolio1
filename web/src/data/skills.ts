export interface Skill {
	name: string;
	proof: string;
	active: boolean;
	order: number;
}

export interface SkillCategory {
	heading: string;
	skills: Skill[];
	active: boolean;
	order: number;
}

export const skillsTeaser = {
	label: 'Skills',
	heading: 'What I work with.',
};

export const skillCategories = [
	{
		heading: 'Backend & Cloud',
		active: true,
		order: 1,
		skills: [
			{
				name: 'Python',
				proof: 'ERP business logic, workflow automation, and product engineering at Odoo R&D',
				active: true,
				order: 1,
			},
			{
				name: 'Node.js',
				proof: 'Backend services for product platforms and distributed workflows',
				active: true,
				order: 2,
			},
			{
				name: 'PostgreSQL / Redis / TimescaleDB',
				proof: 'Schema design, caching, and data-heavy product features',
				active: true,
				order: 3,
			},
			{
				name: 'Docker / AWS / GCP',
				proof: 'Containerized services, cloud workflows, and CI/CD experience across roles',
				active: true,
				order: 4,
			},
			{
				name: 'Event-Driven Systems',
				proof: 'Experience with distributed workflows, async processing, and service boundaries',
				active: true,
				order: 5,
			},
			{
				name: 'Testing & API Quality',
				proof: 'Automated testing, API documentation, and delivery confidence',
				active: true,
				order: 6,
			},
		] satisfies Skill[],
	},
	{
		heading: 'Frontend',
		active: true,
		order: 2,
		skills: [
			{
				name: 'React / Angular / Next.js',
				proof: 'Frontend architecture, reusable components, and interactive product experiences',
				active: true,
				order: 1,
			},
			{
				name: 'TypeScript',
				proof: 'Typed, maintainable code across frontend and backend projects',
				active: true,
				order: 2,
			},
		] satisfies Skill[],
	},
	{
		heading: 'Leadership & Process',
		active: true,
		order: 3,
		skills: [
			{
				name: 'Team Leadership & Mentorship',
				proof: 'Led student engineering teams, mentored developers, and supported technical learning',
				active: true,
				order: 1,
			},
			{
				name: 'Delivery & Documentation',
				proof: 'Improved team workflows through documentation, reusable patterns, and delivery practices',
				active: true,
				order: 2,
			},
		] satisfies Skill[],
	},
	{
		heading: 'Beyond Software',
		active: true,
		order: 4,
		skills: [
			{
				name: 'Robotics — BRACU Duburi',
				proof: 'Founded an autonomous underwater robotics team',
				active: true,
				order: 1,
			},
			{
				name: 'Technical Teaching',
				proof: 'Created long-form tutorials for Bangla-speaking developers',
				active: true,
				order: 2,
			},
		] satisfies Skill[],
	},
] satisfies SkillCategory[];
