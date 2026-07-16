'use server';

import { getCurrentUser } from '@/features/auth';
import { getQueryClient } from '@/lib/getQueryClient';
import { Hydrate } from '@/shared/components/Hydrate';
import { Sidebar as CoreSidebar } from '@/shared/ui/sidebar';
import { dehydrate } from '@tanstack/react-query';
import { Separator } from '../../../shared/ui/separator';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';

export async function Sidebar() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	});

	return (
		<CoreSidebar collapsible="icon">
			<SidebarHeader />
			<Separator className="my-2 h-0.5" />
			<SidebarContent />
			<Separator className="my-2 h-0.5" />
			<Hydrate state={dehydrate(queryClient)}>
				<SidebarFooter />
			</Hydrate>
		</CoreSidebar>
	);
}
