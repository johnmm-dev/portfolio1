export interface ExperienceEntry {
	company: string;
	role: string;
	period: string;
	// Path under public/ (e.g. '/work/odoo.webp'). Falls back to the
	// company's first letter when omitted or the file isn't available.
	logoImage?: string;
	// Source file's native pixel size, so the browser can reserve the
	// correct aspect ratio before the image loads (avoids layout shift).
	logoWidth?: number;
	logoHeight?: number;
	description: string;
	highlights: string[];
	tags: string[];
	// Gets the glowing "live" timeline dot instead of a plain one.
	isCurrent?: boolean;
	active: boolean;
	order: number;
}

export const experienceTeaser = {
	heading: 'Experience',
	eyebrow: 'Context → ownership → impact',
};

export const experienceEntries: ExperienceEntry[] = [
	{
		company: 'TopLayer Creative LLC',
		role: 'Full-Stack Developer',
		period: 'Jan 2025 — Feb 2026',
		description:
			'Built and maintained full-stack SaaS applications across modernization, data-migration, multi-tenant, and integration projects.',
		highlights: [
			'Built and maintained full-stack SaaS applications using React, TypeScript, Node.js, PostgreSQL, and AWS.',
			'Developed backend services, REST APIs, database models, and third-party integrations.',
			'Contributed to application modernization, data migration, multi-tenant architecture, and integration projects.',
			'Implemented validation, error handling, asynchronous processing, and background workflows for production systems.',
		],
		tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Multi-Tenancy'],
		isCurrent: false,
		active: true,
		order: 1,
	},
	{
		company: 'Express Employment Professionals',
		role: 'Full-Stack Developer',
		period: 'Jul 2023 — Nov 2024',
		description:
			'Production web applications and frontend modernization for client engagements, including a migration project for Carbon Health.',
		highlights: [
			'Developed production web applications using React, Angular, TypeScript, Redux, and modern frontend tooling.',
			'Helped modernize legacy Angular applications while product development continued.',
			'Converted existing frontend services and RxJS-based workflows into reusable TypeScript modules and React hooks.',
			'Built reusable React components, application workflows, API integrations, and state-management solutions.',
			'Collaborated with backend engineers and client teams to deliver production features and integrations.',
		],
		tags: ['React', 'Angular', 'TypeScript', 'Redux', 'RxJS'],
		isCurrent: false,
		active: true,
		order: 2,
	},
	{
		company: 'Stealth Startup',
		role: 'Full-Stack Developer',
		period: 'Apr 2022 — Jun 2023',
		description: 'Full-stack product features across React/TypeScript frontends and Node.js backend services.',
		highlights: [
			'Designed REST APIs, database models, authentication flows, and third-party integrations.',
			'Developed responsive dashboards and business workflows backed by API-driven services.',
			'Worked across frontend, backend, database, testing, and deployment responsibilities.',
		],
		tags: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Authentication'],
		isCurrent: false,
		active: true,
		order: 3,
	},
	{
		company: '1872 Consulting',
		role: 'Full-Stack Developer',
		period: 'Dec 2020 — Mar 2022',
		description:
			'Software delivery for client organizations in a technology consulting and staff-augmentation environment.',
		highlights: [
			'Built web applications and backend services using JavaScript/TypeScript, React, Node.js, and SQL.',
			'Developed REST APIs, database integrations, internal business applications, and customer-facing functionality.',
			'Worked directly with client engineering teams on modernization, integrations, testing, and deployment.',
		],
		tags: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL'],
		isCurrent: false,
		active: true,
		order: 4,
	},
];
