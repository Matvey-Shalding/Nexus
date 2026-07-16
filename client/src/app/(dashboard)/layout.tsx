'use server';

import { Sidebar } from '@/features/sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}
