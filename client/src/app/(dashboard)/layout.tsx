import { Sidebar } from '@/features/sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}
