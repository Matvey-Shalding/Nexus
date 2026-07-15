export const Routes = {
	REGISTER: '/register',
	LOGIN: '/login',

	DEFAULT: '/tasks',

	TASKS: '/tasks',
} as const;

export const PublicRoutes = [Routes.REGISTER, Routes.LOGIN];
