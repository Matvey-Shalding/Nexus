import { TabsContent } from '@/shared/ui/tabs';
import React from 'react';

import { SettingsTabTitle } from '../SettingsTabTitle';

interface Props {
	className?: string;
}
export const EditorTab: React.FC<Props> = ({}) => {
	return (
		<TabsContent value="editor">
			<SettingsTabTitle
				title="Editor"
				subtitle="Configure note editor behavior."
			/>
		</TabsContent>
	);
};
