import { TabsContent } from '@/shared/ui/tabs';
import React from 'react';

import { SettingsTabTitle } from '../SettingsTabTitle';

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
