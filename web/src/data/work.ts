import { getExperienceYears } from '@/lib/experience';

export interface BeyondRoleLink {
	label: string;
	href: string;
	// Points at a Sanity-backed page, so it 404s when Sanity isn't configured.
	needsSanity?: boolean;
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
	heading: 'Selected projects',
	eyebrow: 'Migrations, integrations, and platforms I’ve owned.',
};

export const beyondRoles: BeyondRoleEntry[] = [
	{
		icon: 'terminal',
		title: 'Real-time energy & carbon market data · kWh Analytics (2025)',
		description:
			'Built and maintained Node.js and PostgreSQL services for a live B2B energy and carbon market-price platform, streaming prices over native WebSockets, fixing stale and duplicate updates in the feed, and normalizing multiple vendors’ REST APIs into one consistent format.',
		active: true,
		order: 1,
	},
	{
		icon: 'terminal',
		title: 'Multi-tenant PostgreSQL platform · FleetOps (2025)',
		description:
			'Evolved a logistics and IoT SaaS to schema-per-tenant PostgreSQL, with PL/pgSQL event triggers capturing schema changes in-transaction and LISTEN/NOTIFY background workers keeping generated TypeScript SDKs and analytics in sync.',
		active: true,
		order: 2,
	},
	{
		icon: 'terminal',
		title: 'Clearinghouse integration · Catholic Health Long Island (2024)',
		description:
			'As a contractor on KPMG’s delivery team after the Change Healthcare disruption, helped connect a new clearinghouse to the hospital system’s EHR in under four months, keeping eligibility and claims processing running throughout.',
		active: true,
		order: 4,
	},
	{
		icon: 'terminal',
		title: 'Angular to React modernization · Clearco (2024)',
		description:
			'Migrated a live fintech Angular 2+ app to React with an incremental Strangler Fig approach, splitting Angular services and RxJS flows into reusable TypeScript modules and React hooks while the team kept shipping.',
		active: true,
		order: 3,
	},
	{
		icon: 'terminal',
		title: 'Legacy system modernization · Barreto Manufacturing (2022)',
		description:
			'Replaced an on-premise database and desktop app with modular Node.js services on AWS, PostgreSQL on RDS, and a React SPA for staff and dealers, validated by reconciliation and shadow testing before cutover.',
		active: true,
		order: 5,
	},
];

export const workTeaser = {
	label: 'Work',
	heading: 'Platforms, migrations, and integrations I’ve helped ship.',
	paragraphs: [
		`I'm a full-stack developer with ${getExperienceYears()}+ years of experience, focused on backend systems built with Node.js, TypeScript, and PostgreSQL. I design REST APIs, real-time features, third-party integrations, and data-intensive services, along with database design, PL/pgSQL, multi-tenant architecture, and data migration and validation.`,
		'I work across the stack with React, take over existing production codebases, and modernize legacy systems without disrupting users. I use AI-assisted development daily (Claude, Codex, Cursor), with code review and testing on every change. I hold OpenJS Node.js Application Developer (JSNAD), AWS Developer – Associate, AWS AI, and Azure AI Engineer certifications, and a Bachelor of Computer Science from Southern Illinois University Carbondale.',
	],
};
