'use client';

import { Routes } from '@/shared/config';
import { redirect, useSearchParams } from 'next/navigation';

export default function Home() {
	const searchParams = useSearchParams().toString();

	// http://localhost:3000/?connect=telegram

	redirect(searchParams ? Routes.DASHBOARD + '/?' + searchParams : Routes.DASHBOARD);

	return null;
}
