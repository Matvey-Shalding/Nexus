'use client';

import { SettingsModal } from '@/features/settings';
import { TabValue } from '@/features/settings/config/settingsTabs';
import { SidebarFooter as Footer, SidebarMenu, useSidebar } from '@/shared/ui/sidebar';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { LogoutDialog } from './LogoutDialog';
import { UserDropdown } from './UserDropdown';

export const SidebarFooter: React.FC = () => {
	const { isMobile, open } = useSidebar();
	const searchParams = useSearchParams();

	const shouldConnectTelegram = searchParams.get('connect') == 'telegram';

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [tab, setTab] = useState<TabValue>(shouldConnectTelegram ? 'security' : 'general');

	const [isModalOpen, setIsModalOpen] = useState(shouldConnectTelegram);

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
					tab={tab}
					setTab={setTab}
					isOpen={isModalOpen}
					setIsOpen={setIsModalOpen}
				/>
			</SidebarMenu>
		</Footer>
	);
};
