'use client';

import React, { useState } from 'react';

import { SidebarFooter as Footer, SidebarMenu, useSidebar } from '@/shared/ui/sidebar';

import { LogoutDialog } from './LogoutDialog';
import { UserDropdown } from './UserDropdown';
import { SettingsModal } from '@/features/settings';
import { useAuthStore } from '@/features/auth'

export const SidebarFooter: React.FC = () => {
	const { isMobile,open } = useSidebar();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const {accessToken} = useAuthStore()

	console.log("access token",accessToken)

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
