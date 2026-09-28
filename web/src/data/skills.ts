import type { TechIconName } from '@/lib/techIcons';

export interface Skill {
	label: string;
	// Key into lib/techIcons.ts. Omit for a text-only pill.
	icon?: TechIconName;
}

export interface SkillGroup {
	label: string;
	items: Skill[];
	// The tab shown first. If no active group sets it, the first one is used.
	defaultSelected?: boolean;
	active: boolean;
	order: number;
}

export const skillsTeaser = {
	heading: 'Tech stack',
	eyebrow: 'Tools I use to ship production software.',
};

export const skillGroups: SkillGroup[] = [
	{
		label: 'Languages',
		items: [
			{ label: 'JavaScript', icon: 'javascript' },
			{ label: 'TypeScript', icon: 'typescript' },
			{ label: 'SQL', icon: 'database' },
			{ label: 'PL/pgSQL', icon: 'postgresql' },
			{ label: 'Python', icon: 'python' },
		],
		active: true,
		order: 1,
	},
	{
		label: 'Backend',
		items: [
			{ label: 'Node.js', icon: 'nodedotjs' },
			{ label: 'Express.js', icon: 'express' },
			{ label: 'WebSockets (ws)', icon: 'activity' },
			{ label: 'REST APIs', icon: 'braces' },
			{ label: 'FastAPI', icon: 'fastapi' },
			{ label: 'Django', icon: 'django' },
			{ label: 'GraphQL', icon: 'graphql' },
			{ label: 'Microservices', icon: 'grid' },
			{ label: 'Event-driven architecture', icon: 'zap' },
			{ label: 'API integration', icon: 'plug' },
		],
		defaultSelected: true,
		active: true,
		order: 2,
	},
	{
		label: 'Databases',
		items: [
			{ label: 'PostgreSQL', icon: 'postgresql' },
			{ label: 'PL/pgSQL', icon: 'postgresql' },
			{ label: 'MySQL', icon: 'mysql' },
			{ label: 'MongoDB', icon: 'mongodb' },
			{ label: 'Redis', icon: 'redis' },
			{ label: 'Supabase', icon: 'supabase' },
			{ label: 'Query optimization', icon: 'gauge' },
			{ label: 'Data modeling', icon: 'table' },
			{ label: 'Transactions', icon: 'checks' },
		],
		active: true,
		order: 3,
	},
	{
		label: 'Cloud & Infrastructure',
		items: [
			{ label: 'AWS', icon: 'cloud' },
			{ label: 'Azure', icon: 'cloud' },
			{ label: 'Vercel', icon: 'vercel' },
			{ label: 'Railway', icon: 'railway' },
			{ label: 'Cloudflare', icon: 'cloudflare' },
			{ label: 'Cloudflare Pages', icon: 'cloudflarepages' },
			{ label: 'Cloudflare R2', icon: 'cloudflare' },
			{ label: 'Docker', icon: 'docker' },
			{ label: 'CI/CD', icon: 'gitMerge' },
			{ label: 'GitHub Actions', icon: 'githubactions' },
		],
		active: true,
		order: 4,
	},
	{
		label: 'Integrations',
		items: [
			{ label: 'Multi-vendor REST APIs', icon: 'plug' },
			{ label: 'Data normalization', icon: 'funnel' },
			{ label: 'Webhooks', icon: 'webhook' },
			{ label: 'EDI', icon: 'fileText' },
			{ label: 'CRM', icon: 'users' },
			{ label: 'ERP', icon: 'building' },
			{ label: 'Healthcare', icon: 'heartPulse' },
		],
		active: true,
		order: 5,
	},
	{
		label: 'Frontend',
		items: [
			{ label: 'React', icon: 'react' },
			{ label: 'Next.js', icon: 'nextdotjs' },
			{ label: 'Angular', icon: 'angular' },
			{ label: 'Astro', icon: 'astro' },
			{ label: 'Redux Toolkit', icon: 'redux' },
			{ label: 'TanStack Query', icon: 'reactquery' },
			{ label: 'React Router', icon: 'reactrouter' },
			{ label: 'RxJS', icon: 'reactivex' },
			{ label: 'HTML', icon: 'html5' },
			{ label: 'CSS', icon: 'css' },
		],
		active: true,
		order: 6,
	},
	{
		label: 'AI tools',
		items: [
			{ label: 'Claude', icon: 'claude' },
			{ label: 'OpenAI Codex', icon: 'terminal' },
			{ label: 'Cursor', icon: 'cursor' },
		],
		active: true,
		order: 7,
	},
];
