import { Keyboard, Palette, Settings, Shield, Sparkles, User } from 'lucide-react';

export const tabs = [
	{
		value: 'profile',
		label: 'Profile',
		icon: User,
	},
	{
		value: 'general',
		label: 'General',
		icon: Settings,
	},
	{
		value: 'appearance',
		label: 'Appearance',
		icon: Palette,
	},
	{
		value: 'editor',
		label: 'Editor',
		icon: Keyboard,
	},
	{
		value: 'ai',
		label: 'AI',
		icon: Sparkles,
	},
	{
		value: 'security',
		label: 'Security',
		icon: Shield,
	},
] as const;

export type TabValue = (typeof tabs)[number]['value']
