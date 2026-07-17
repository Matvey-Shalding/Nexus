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

export const UserDropdown: React.FC<Props> = ({ isMobile, setIsDialogOpen, setIsModalOpen }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-full">
				<SidebarMenuButton
					data-hover="none"
					size="lg"
					className={cn(
						'hover:bg-accent! min-w-full group-data-[collapsible=icon]:pl-1.5! group-data-[collapsible=icon]:hover:bg-transparent!',
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
						className="hover:bg-destructive/20! text-destructive!"
						onClick={() => {
							setIsDialogOpen(true);
						}}
					>
						<LogOut />
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuGroup>
		</DropdownMenu>
	);
};
