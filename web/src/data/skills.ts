import type { TechIconName } from '@/lib/techIcons';

export interface Skill {
	label: string;
	// Key into lib/techIcons.ts. Omit for a text-only pill.
	icon?: TechIconName;
}

export interface SkillGroup {
	label: string;
	items: Skill[];
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
			{ label: 'TypeScript', icon: 'typescript' },
			{ label: 'JavaScript', icon: 'javascript' },
			{ label: 'Python', icon: 'python' },
			{ label: 'SQL', icon: 'database' },
			{ label: 'PL/pgSQL', icon: 'postgresql' },
		],
		active: true,
		order: 1,
	},
	{
		label: 'Frontend',
		items: [
			{ label: 'React', icon: 'react' },
			{ label: 'Next.js', icon: 'nextdotjs' },
			{ label: 'Angular', icon: 'angular' },
			{ label: 'Redux Toolkit', icon: 'redux' },
			{ label: 'TanStack Query', icon: 'reactquery' },
			{ label: 'React Router', icon: 'reactrouter' },
			{ label: 'RxJS', icon: 'reactivex' },
			{ label: 'HTML', icon: 'html5' },
			{ label: 'CSS', icon: 'css' },
		],
		active: true,
		order: 2,
	},
	{
		label: 'Backend',
		items: [
			{ label: 'Node.js', icon: 'nodedotjs' },
			{ label: 'FastAPI', icon: 'fastapi' },
			{ label: 'REST APIs', icon: 'braces' },
			{ label: 'Webhooks', icon: 'webhook' },
			{ label: 'Background workers', icon: 'layers' },
		],
		active: true,
		order: 3,
	},
	{
		label: 'Data',
		items: [
			{ label: 'PostgreSQL', icon: 'postgresql' },
			{ label: 'Schema design', icon: 'database' },
			{ label: 'Multi-tenant architecture', icon: 'layers' },
			{ label: 'Data migration', icon: 'migrate' },
		],
		active: true,
		order: 4,
	},
	{
		label: 'Cloud & DevOps',
		items: [
			{ label: 'AWS (RDS, S3, EC2)', icon: 'cloud' },
			{ label: 'Docker', icon: 'docker' },
		],
		active: true,
		order: 5,
	},
	{
		label: 'AI-assisted development',
		items: [
			{ label: 'Claude', icon: 'claude' },
			{ label: 'OpenAI Codex', icon: 'terminal' },
			{ label: 'Cursor', icon: 'cursor' },
		],
		active: true,
		order: 6,
	},
];
