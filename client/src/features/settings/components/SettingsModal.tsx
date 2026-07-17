'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Separator } from '@/shared/ui/separator';
import { Tabs, TabsContent } from '@/shared/ui/tabs';

import React from 'react';
import { SettingsTabs } from './SettingsTabs';
import { ProfileTab } from './tabs/ProfileTab';
import { GeneralTab } from './tabs/GeneralTab'
import { AppearanceTab } from './tabs/AppearanceTab'
import { EditorTab } from './tabs/EditorTab'
import { AITab } from './tabs/AITab'
import { SecurityTab } from './tabs/SecurityTab'

interface Props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogContent
				className="flex h-128 min-w-3xl flex-col gap-0 p-0"
			>
				<DialogHeader className="mb-4 px-6 pt-4">
					<DialogTitle className="text-xl">Settings</DialogTitle>

					<DialogDescription>Manage your account, preferences, and workspace settings.</DialogDescription>
				</DialogHeader>
				<Separator />
				<Tabs
					className="flex flex-1 flex-row items-stretch gap-0 self-stretch"
					defaultValue="profile"
					orientation="vertical"
				>
					<SettingsTabs />

					<div className="flex-1 p-6">
						<ProfileTab />
						<GeneralTab/>
						<AppearanceTab/>
						<EditorTab/>
						<AITab/>
						<SecurityTab/>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};
