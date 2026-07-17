import { TabsContent } from '@/shared/ui/tabs';
import React from 'react';
import { SettingsTabTitle } from '../SettingsTabTitle';
interface Props {
	className?: string;
}
export const SecurityTab: React.FC<Props> = ({}) => {
	return (
		<TabsContent value="security">
			<SettingsTabTitle
				title="Security"
				subtitle="Manage account security options."
			/>
		</TabsContent>
	);
};
