export const AUTH_PREFIX = '/auth';
export const APP_PREFIX = '/app';

export const Routes = {
	LOGIN: `${AUTH_PREFIX}/login`,
	REGISTER: `${AUTH_PREFIX}/register`,

	DASHBOARD: `${APP_PREFIX}/dashboard`,
	KANBAN: `${APP_PREFIX}/kanban`,
	TIME_BLOCKING: `${APP_PREFIX}/time-blocking`,
	POMODORO: `${APP_PREFIX}/pomodoro`,
	NOTES: `${APP_PREFIX}/notes`,
	PROFILE: `${APP_PREFIX}/profile`,
	SETTINGS: `${APP_PREFIX}/settings`,

	DEFAULT: `${APP_PREFIX}/dashboard`,
} as const;

export const ApiRoutes = {
	REGISTER: `${AUTH_PREFIX}/register`,
	LOGIN: `${AUTH_PREFIX}/login`,
	LOGOUT: `${AUTH_PREFIX}/logout`,
	REFRESH: `${AUTH_PREFIX}/refresh`,
	USER: '/users/me',
	TASKS: '/tasks/',
} as const;
