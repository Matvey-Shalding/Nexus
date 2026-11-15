'use server';

import { Sidebar as CoreSidebar } from '@/shared/ui/sidebar';

import { Separator } from '../../../shared/ui/separator';

import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';

export async function Sidebar() {
	return (
		<CoreSidebar collapsible="icon">
			<SidebarHeader />
			<Separator className="h-0.5" />
			<SidebarContent />
			<Separator className="h-0.5" />
			<SidebarFooter />
		</CoreSidebar>
	);
}
