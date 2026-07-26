export interface Tag {
	label: string;
	active: boolean;
}

export const tags = {
	backendSystems: { label: 'Backend Systems', active: true },
	productArchitecture: { label: 'Product Architecture', active: true },
	erpSystems: { label: 'ERP Systems', active: true },
	developerTools: { label: 'Developer Tools', active: true },
	robotics: { label: 'Robotics', active: true },
	technicalWriting: { label: 'Technical Writing', active: true },
	logistics: { label: 'Logistics', active: true },
	edtech: { label: 'EdTech', active: true },
	// Blog-only topics, added when the Writing section's scope expanded to
	// cover life outside work, not just professional skills.
	career: { label: 'Career', active: true },
	dubai: { label: 'Dubai', active: true },
	hiking: { label: 'Hiking', active: true },
	fishing: { label: 'Fishing', active: true },
} satisfies Record<string, Tag>;
