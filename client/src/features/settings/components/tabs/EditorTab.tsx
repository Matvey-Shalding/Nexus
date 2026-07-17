import React from 'react';
import { SettingsTabTitle } from '../SettingsTabTitle';
import { TabsContent } from '@/shared/ui/tabs'
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
