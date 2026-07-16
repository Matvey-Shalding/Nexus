'use client';

import React, { useState } from 'react';

import { SidebarFooter as Footer, SidebarMenu, SidebarMenuItem, useSidebar } from '@/shared/ui/sidebar';

import { LogoutDialog } from './LogoutDialog';
import { SidebarDropdown } from './SidebarDropdown';

export const SidebarFooter: React.FC = () => {
	const { isMobile } = useSidebar();

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Footer>
			<SidebarMenu>
				<SidebarDropdown
					isMobile={isMobile}
					setIsDialogOpen={setIsDialogOpen}
				/>
				<SidebarMenuItem>
					<LogoutDialog
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</SidebarMenuItem>
			</SidebarMenu>
		</Footer>
	);
};
