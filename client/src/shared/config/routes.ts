export const Routes = {
	LOGIN: '/login',
	REGISTER: '/register',

	DASHBOARD: '/dashboard',

	KANBAN: 'kanban',
	TIME_BLOCKING: 'time-blocking',
	POMODORO: 'pomodoro',
	NOTES: 'notes',
	PROFILE: 'profile',
	SETTINGS: '/settings',

	DEFAULT: '/dashboard'

} as const;


export const PublicRoutes = [Routes.REGISTER, Routes.LOGIN];
