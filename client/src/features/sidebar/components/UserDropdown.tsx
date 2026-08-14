'use client';

import { cn } from '@/lib/utils';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Bell, ChevronsUpDown, LogOut, Settings, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

import { UserInfo } from './UserInfo';

('lucide-react');

interface Props {
	isMobile: boolean;
	open: boolean;
	setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserDropdown: React.FC<Props> = ({ isMobile, setIsDialogOpen, setIsModalOpen, open }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<DropdownMenu
			open={dropdownOpen}
			onOpenChange={setDropdownOpen}
		>
			<DropdownMenuTrigger className="w-full flex items-center p-2 hover:bg-muted transition-colors">
				<UserInfo open={open} />
				<ChevronsUpDown
					className={cn('ml-auto size-4 transition-transform duration-300', dropdownOpen ? 'rotate-180' : 'rotate-0')}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuGroup>
				<DropdownMenuContent
					className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
					side={isMobile ? 'bottom' : 'right'}
					align="end"
					sideOffset={4}
				>
					<DropdownMenuLabel className="p-0 font-normal">
						<UserInfo
							className="px-1"
							open={open}
						/>
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
