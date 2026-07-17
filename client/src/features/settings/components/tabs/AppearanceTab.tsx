'use client';

import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { TabsContent } from '@/shared/ui/tabs';
import { useTheme } from 'next-themes';
import React from 'react';
import { SettingsTabTitle } from '../SettingsTabTitle';
interface Props {
	className?: string;
}
export const AppearanceTab: React.FC<Props> = ({}) => {
	const { theme, setTheme } = useTheme();

	return (
		<TabsContent value="appearance">
			<SettingsTabTitle
				title="Appearance"
				subtitle="Customize the look and feel."
			/>
			<div className="flex items-center gap-x-2">
				<Switch
					checked={theme === 'light'}
					onCheckedChange={checked => setTheme(checked ? 'light' : 'dark')}
					id="theme"
				/>
				<Label htmlFor="theme">Light</Label>
			</div>
		</TabsContent>
	);
};
