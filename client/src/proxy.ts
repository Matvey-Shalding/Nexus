import { NextRequest, NextResponse } from 'next/server';

import { APP_PREFIX, AUTH_PREFIX, Routes } from './shared/config/routes';

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const { cookies, url } = request;

	const refreshToken = cookies.get('refresh_token')?.value;

	const isAuthPage = pathname.startsWith(AUTH_PREFIX);

	const isDashboardPage = pathname.startsWith(APP_PREFIX);

	// authenticated users can't access auth routes

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(Routes.DASHBOARD, url));
	}

	if (isAuthPage) {
		return NextResponse.next();
	}

	// unauthenticated users can't access dashboard routes

	if (isDashboardPage && !refreshToken) {
		return NextResponse.redirect(new URL(Routes.LOGIN, url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/app/:path*', '/auth/:path*'],
};
