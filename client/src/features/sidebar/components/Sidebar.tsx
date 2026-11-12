'use server';

import { getCurrentUser } from '@/features/auth';
import { Sidebar as CoreSidebar } from '@/shared/ui/sidebar';
import { HydrationBoundary, QueryClient, dehydrate, noop } from '@tanstack/react-query';

import { Separator } from '../../../shared/ui/separator';

import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';

export async function Sidebar() {
	const queryClient = new QueryClient();

	await queryClient
		.query({
			queryKey: ['user'],
			queryFn: getCurrentUser,
		})
		.catch(noop);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CoreSidebar collapsible="icon">
				<SidebarHeader />
				<Separator className="h-0.5" />
				<SidebarContent />
				<Separator className="h-0.5" />
				<SidebarFooter />
			</CoreSidebar>
		</HydrationBoundary>
	);
}
