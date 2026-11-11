'use client';

import { Routes } from '@/shared/config';
import { redirect, useSearchParams } from 'next/navigation';

export default function Home() {
	const searchParams = useSearchParams().toString();

	redirect(searchParams ? Routes.DASHBOARD + '/?' + searchParams : Routes.DASHBOARD);

	return null;
}
