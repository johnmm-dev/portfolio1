export interface Tag {
	label: string;
	active: boolean;
}

export const tags = {
	fullStack: { label: 'Full-Stack', active: true },
	backendSystems: { label: 'Backend Systems', active: true },
	frontend: { label: 'Frontend', active: true },
	postgresql: { label: 'PostgreSQL', active: true },
	dataMigration: { label: 'Data Migration', active: true },
	integrations: { label: 'Integrations', active: true },
	modernization: { label: 'Modernization', active: true },
	aws: { label: 'AWS', active: true },
	aiAssistedDevelopment: { label: 'AI-Assisted Development', active: true },
	career: { label: 'Career', active: true },
	aboutMe: { label: 'About Me', active: true },
} satisfies Record<string, Tag>;
