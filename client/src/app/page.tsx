import { Routes } from '@/shared/config'
import { redirect } from 'next/navigation'

export default function Home() {
	redirect(Routes.DASHBOARD);

	return null
}
