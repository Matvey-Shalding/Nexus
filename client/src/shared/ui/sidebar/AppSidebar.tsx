'use client';

import {
	Sidebar as CoreSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/shared/ui/sidebar';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { navigation } from '@/shared/config/navigation';
import { BadgeCheck, Bell, ChevronsLeft, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react';
import { Avatar } from '../avatar';
import { Button } from '../button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../dropdown-menu';
import { Logo } from '../logo';
import { Separator } from '../separator';

export function Sidebar({ ...props }: React.ComponentProps<typeof CoreSidebar>) {
	const { toggleSidebar, open, isMobile } = useSidebar();

	const user = {
		name: 'mathew',
		email: 'mathew@gmail.com',
	};

	return (
		<Sidebar
			collapsible="icon"
			{...props}
		>
			<SidebarHeader className="relative">
				<SidebarMenuButton
					data-hover="none"
					size="lg"
					className="group pointer-events-none min-w-full self-stretch"
				>
					<Logo />
				</SidebarMenuButton>
				<Button
					onClick={() => toggleSidebar()}
					className={cn(
						'bg-popover pointer-events-auto absolute top-1/2 right-0 grid size-7 translate-x-1/2 -translate-y-1/2 place-content-center rounded-md transition-all duration-300',
						{
							'translate-x-[130%]': !open,
						},
					)}
				>
					<ChevronsLeft className={cn('size-6', { 'rotate-180': !open })} />
				</Button>
			</SidebarHeader>
			<Separator className="my-2 h-0.5!" />
			<SidebarContent>
				<SidebarGroup className="space-y-0">
					<SidebarGroupLabel className="text-base">Workspace</SidebarGroupLabel>
					<SidebarMenu className={cn(open ? 'space-y-0.5' : 'space-y-4')}>
						{navigation.map(item => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									data-hover="fancy"
									size="lg"
									className="min-w-full self-stretch"
									tooltip={item.title}
								>
									<item.icon className="size-6" />
									<span className="text-lg font-medium"> {item.title} </span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<Separator className="mb-2 h-0.5!" />
			<SidebarFooter className="">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger className="w-full">
								<SidebarMenuButton
									data-hover="none"
									size="lg"
									className={cn(
										'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground min-w-full self-stretch data-[state=open]:p-0!',
									)}
								>
									<Avatar className={cn({ 'relative -left-0.5': !open })} />
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{user.name}</span>
										<span className="truncate text-xs">{user.email}</span>
									</div>
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
										<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
											<Avatar />
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-medium">{user.name}</span>
												<span className="truncate text-xs">{user.email}</span>
											</div>
										</div>
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
										<DropdownMenuItem>
											<BadgeCheck />
											Account
										</DropdownMenuItem>
										<DropdownMenuItem>
											<CreditCard />
											Billing
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Bell />
											Notifications
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<LogOut />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenuGroup>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
