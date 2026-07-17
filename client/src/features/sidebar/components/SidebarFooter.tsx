'use client';

import React, { useState } from 'react';

import { SidebarFooter as Footer, SidebarMenu, useSidebar } from '@/shared/ui/sidebar';

import { LogoutDialog } from './LogoutDialog';
import { UserDropdown } from './UserDropdown';
import { SettingsModal } from '@/features/settings';

export const SidebarFooter: React.FC = () => {
	const { isMobile } = useSidebar();

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<Footer>
			<SidebarMenu>
				<UserDropdown
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
