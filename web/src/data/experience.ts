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
		company: 'Odoo Middle East',
		role: 'Software Engineer | R&D',
		period: '2024 — Present · Dubai',
		logoImage: '/work/odoo.webp',
		logoWidth: 454,
		logoHeight: 150,
		description:
			'Product engineering across Odoo’s Standard and Enterprise codebases, covering regional requirements and broader product modules.',
		highlights: [
			'Design and develop production modules for MENA-specific business and regulatory requirements.',
			'Review pull requests, interview engineering candidates, and contribute to technical hiring decisions.',
			'Analyze proposed features and prepare technical estimates for product development and pre-sales.',
			'Built a reusable load-testing tool used to provide evidence-based capacity estimates for customer workloads.',
			'Designed an on-premise deployment architecture for a government project.',
		],
		tags: ['Python', 'JavaScript', 'OWL', 'PostgreSQL', 'Load Testing', 'System Design'],
		isCurrent: true,
		active: true,
		order: 1,
	},
	{
		company: 'Cefalo · House of Math',
		role: 'Software Engineer → Senior Software Engineer',
		period: '2022 — 2024 · Dhaka',
		logoImage: '/work/house-of-math.webp',
		logoWidth: 780,
		logoHeight: 150,
		description:
			'Full-stack product development for House of Math’s learning platform, serving more than two million users.',
		highlights: [
			'Developed backend features for the gamification team, including games, leaderboards, and supporting product workflows.',
			'Worked with product managers to design features capable of supporting a global user base of more than two million learners.',
			'Built a username moderation system that prevented inappropriate names and hid newly detected names from live product surfaces.',
			'Introduced a more maintainable frontend structure designed to support a growing engineering team.',
			'Implemented static generation to improve page-load performance and search visibility.',
		],
		tags: ['TypeScript', 'Node.js', 'Express.js', 'React', 'Next.js', 'Redis', 'PostgreSQL', 'Docker'],
		isCurrent: false,
		active: true,
		order: 2,
	},
	{
		company: 'Shohoz',
		role: 'Software Engineer',
		period: '2020 — 2022 · Dhaka',
		logoImage: '/work/shohoz.webp',
		logoWidth: 671,
		logoHeight: 150,
		description:
			'Built shared frontend infrastructure and contributed to backend systems for a food-delivery platform.',
		highlights: [
			'Developed and maintained an Angular-based frontend framework used across multiple product teams.',
			'Distributed shared components, services, authorization, data-table, and application foundations through an internal NPM package.',
			'Improved design consistency and reduced the work required for teams to bootstrap new applications.',
			'Wrote unit tests for C# and .NET microservices and worked with event-driven application flows.',
		],
		tags: ['Angular', 'TypeScript', 'C#', '.NET', 'Redis', 'NPM', 'Event-Driven Systems'],
		isCurrent: false,
		active: true,
		order: 3,
	},
	{
		company: 'SELISE Digital Platform',
		role: 'Software Engineer',
		period: '2019 — 2020 · Dhaka',
		logoImage: '/work/selise.webp',
		logoWidth: 350,
		logoHeight: 150,
		description: 'Full-stack product development for RiQS Monitor, a Swedish medical-auditing platform.',
		highlights: [
			'Developed training, risk-management, task-management, and equipment workflows.',
			'Introduced reusable interface features, including infinite scrolling for data-heavy product areas.',
			'Designed and implemented a lightweight ORM for querying a dedicated data service.',
			'Built a document-library experience similar to Google Drive in collaboration with the infrastructure team.',
		],
		tags: ['Angular', 'TypeScript', 'Node.js', 'Redis', 'WebSocket', 'System Design'],
		isCurrent: false,
		active: true,
		order: 4,
	},
];
