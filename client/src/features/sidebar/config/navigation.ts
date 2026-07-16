import { CalendarDays, Timer, KanbanSquare, LayoutDashboard, NotebookPen, Settings, UserRound } from 'lucide-react';

import { Routes } from '../../../shared/config/routes';

export const navigation = [
	{
		title: 'Dashboard',
		href: Routes.DASHBOARD,
		icon: LayoutDashboard,
	},
	{
		title: 'Kanban',
		href: Routes.KANBAN,
		icon: KanbanSquare,
	},
	{
		title: 'Time Blocking',
		href: Routes.TIME_BLOCKING,
		icon: CalendarDays,
	},
	{
		title: 'Pomodoro',
		href: Routes.POMODORO,
		icon: Timer,
	},
	{
		title: 'Notes',
		href: Routes.NOTES,
		icon: NotebookPen,
	},
] as const;

export const bottomNavigation = [
	{
		title: 'Profile',
		href: Routes.PROFILE,
		icon: UserRound,
	},
	{
		title: 'Settings',
		href: Routes.SETTINGS,
		icon: Settings,
	},
] as const;
