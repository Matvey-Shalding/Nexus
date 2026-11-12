import { Routes } from '@/shared/config';
import { redirect } from 'next/navigation';

interface PageProps {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: PageProps) {
	const resolvedParams = await searchParams;
	const params = new URLSearchParams(resolvedParams as Record<string, string>);
	const query = params.toString();

	redirect(query ? `${Routes.DASHBOARD}?${query}` : Routes.DASHBOARD);
}
