export type SocialIcon = 'github' | 'linkedin' | 'facebook' | 'instagram' | 'youtube';

export interface SocialLink {
	label: string;
	href: string;
	icon: SocialIcon;
	active: boolean;
	order: number;
}

export const connect = {
	heading: "Let's connect",
};

export const socialLinks = {
	github: { label: 'GitHub', href: 'https://github.com/adnansabbir', icon: 'github', active: true, order: 1 },
	linkedin: {
		label: 'LinkedIn',
		href: 'https://linkedin.com/in/adnansabbir',
		icon: 'linkedin',
		active: true,
		order: 2,
	},
	facebook: { label: 'Facebook', href: 'https://fb.com/ilivetocode', icon: 'facebook', active: true, order: 3 },
	instagram: {
		label: 'Instagram',
		href: 'https://www.instagram.com/adnan_sabbir/',
		icon: 'instagram',
		active: true,
		order: 4,
	},
	youtube: {
		label: 'YouTube',
		href: 'https://www.youtube.com/c/adnansabbirr',
		icon: 'youtube',
		active: true,
		order: 5,
	},
	odooGithub: { label: 'Odoo GitHub', href: 'https://github.com/adns-odoo', icon: 'github', active: false, order: 6 },
} satisfies Record<string, SocialLink>;
