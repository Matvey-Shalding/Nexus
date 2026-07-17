import React from 'react';
import { SettingsTabTitle } from '../SettingsTabTitle';
import { TabsContent } from '@/shared/ui/tabs';
interface Props {
	className?: string;
}
export const GeneralTab: React.FC<Props> = ({}) => {
	return (
		<TabsContent value="general">
			<SettingsTabTitle
				title="General"
				subtitle="Configure basic application preferences."
			/>
		</TabsContent>
	);
};
