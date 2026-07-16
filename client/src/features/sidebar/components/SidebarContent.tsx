import React from 'react';
import { SidebarContent as Content, SidebarGroup, SidebarGroupLabel } from '../../../shared/ui/sidebar';
import { SidebarNavigation } from './SidebarNavigation';
interface Props {
	className?: string;
}
export const SidebarContent: React.FC<Props> = ({}) => {
	return (
		<Content>
			<SidebarGroup className="space-y-0">
				<SidebarGroupLabel className="text-base">Workspace</SidebarGroupLabel>
				<SidebarNavigation />
			</SidebarGroup>
		</Content>
	);
};
