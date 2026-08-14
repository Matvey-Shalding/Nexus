'use client';

import { SettingsModal } from '@/features/settings';
import { SidebarFooter as Footer, SidebarMenu, useSidebar } from '@/shared/ui/sidebar';
import React, { useState } from 'react';

import { LogoutDialog } from './LogoutDialog';
import { UserDropdown } from './UserDropdown';

export const SidebarFooter: React.FC = () => {
	const { isMobile, open } = useSidebar();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<Footer>
			<SidebarMenu>
				<UserDropdown
					open={open}
					isMobile={isMobile}
					setIsDialogOpen={setIsDialogOpen}
					setIsModalOpen={setIsModalOpen}
				/>
				<LogoutDialog
					isDialogOpen={isDialogOpen}
					setIsDialogOpen={setIsDialogOpen}
				/>
				<SettingsModal
					isOpen={isModalOpen}
					setIsOpen={setIsModalOpen}
				/>
			</SidebarMenu>
		</Footer>
	);
};
