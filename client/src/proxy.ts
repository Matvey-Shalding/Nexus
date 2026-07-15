import { NextRequest, NextResponse } from 'next/server';
import { PublicRoutes, Routes } from './shared/config/routes';

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const refreshToken = request.cookies.get('refresh_token')?.value;

	const isPublicRoute = PublicRoutes.includes(pathname as (typeof PublicRoutes)[number]);

	// if (isPublicRoute && refreshToken) {
	// 	return NextResponse.redirect(new URL(Routes.DEFAULT, request.url));
	// }

	// if (!isPublicRoute && !refreshToken) {
	// 	return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
	// }

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
	],
};
