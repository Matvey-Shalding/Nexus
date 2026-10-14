'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Separator } from '@/shared/ui/separator';
import { Tabs } from '@/shared/ui/tabs';
import React, { Dispatch, SetStateAction } from 'react';

import { TabValue } from '../config/settingsTabs';

import { SettingsTabs } from './SettingsTabs';
import { AITab } from './tabs/AITab';
import { AppearanceTab } from './tabs/AppearanceTab';
import { EditorTab } from './tabs/EditorTab';
import { GeneralTab } from './tabs/GeneralTab';
import { ProfileTab } from './tabs/ProfileTab';
import { SecurityTab } from './tabs/SecurityTab';

interface Props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	tab: TabValue;
	setTab: Dispatch<SetStateAction<TabValue>>;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, setIsOpen, tab, setTab }) => {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogContent className="flex h-128 min-w-3xl flex-col gap-0 p-0">
				<DialogHeader className="mb-4 px-6 pt-4">
					<DialogTitle className="text-xl">Settings</DialogTitle>

					<DialogDescription>Manage your account, preferences, and workspace settings.</DialogDescription>
				</DialogHeader>
				<Separator />
				<Tabs
					className="flex flex-1 flex-row items-stretch gap-0 self-stretch"
					defaultValue="profile"
					orientation="vertical"
					onValueChange={value => setTab(value as TabValue)}
					value={tab}
				>
					<SettingsTabs />

					<div className="relative grid min-w-0 flex-1 grid-cols-1 overflow-hidden p-6">
						<ProfileTab />
						<GeneralTab />
						<AppearanceTab />
						<EditorTab />
						<AITab />
						<SecurityTab />
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};
