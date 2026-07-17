import { TabsContent } from '@/shared/ui/tabs';
import React from 'react';
import { SettingsTabTitle } from '../SettingsTabTitle';
interface Props {
	className?: string;
}
export const AITab: React.FC<Props> = ({}) => {
	return (
		<TabsContent value="ai">
			<SettingsTabTitle
				title="AI"
				subtitle="Manage AI assistant settings."
			/>
		</TabsContent>
	);
};
