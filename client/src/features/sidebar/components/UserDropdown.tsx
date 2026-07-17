import { cn } from '@/lib/utils';
import { SidebarMenuButton } from '@/shared/ui/sidebar';
import { Bell, ChevronsUpDown, LogOut, Settings, Sparkles } from 'lucide-react';
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../../../shared/ui/dropdown-menu';
import { UserInfo } from './UserInfo';
('lucide-react');

interface Props {
	isMobile: boolean;
	setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserDropdown: React.FC<Props> = ({ isMobile, setIsDialogOpen,setIsModalOpen }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-full">
				<SidebarMenuButton
					data-hover="none"
					size="lg"
					className={cn(
						'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-accent! min-w-full self-stretch data-[state=open]:p-0!',
					)}
				>
					<UserInfo />
					<ChevronsUpDown className="ml-auto size-4" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuGroup>
				<DropdownMenuContent
					className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
					side={isMobile ? 'bottom' : 'right'}
					align="end"
					sideOffset={4}
				>
					<DropdownMenuLabel className="p-0 font-normal">
						<UserInfo className="px-1" />
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Sparkles />
							Upgrade to Pro
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => setIsModalOpen(true)}>
							<Settings />
							Settings
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Bell />
							Notifications
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="hover:bg-destructive/20!"
						onClick={() => {
							setIsDialogOpen(true);
						}}
					>
						<LogOut className="text-destructive!" />
						<span className="text-destructive!">Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuGroup>
		</DropdownMenu>
	);
};
