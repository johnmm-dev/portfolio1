export type SocialIcon = 'github' | 'linkedin' | 'facebook' | 'instagram' | 'youtube';

export interface SocialLink {
	label: string;
	href: string;
	icon: SocialIcon;
	active: boolean;
	order: number;
}

export const socialLinks = {
	github: { label: 'GitHub', href: 'https://github.com/johnmm-dev', icon: 'github', active: true, order: 1 },
	linkedin: {
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/john-meeker-dev/',
		icon: 'linkedin',
		active: true,
		order: 2,
	},
} satisfies Record<string, SocialLink>;
