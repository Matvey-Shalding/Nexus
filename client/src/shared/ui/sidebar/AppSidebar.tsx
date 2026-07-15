'use client';

import { Sidebar, SidebarHeader, SidebarMenuButton, SidebarProvider } from '@/shared/ui/sidebar';
import * as React from 'react';

import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';

import { SidebarMenu, SidebarMenuItem, useSidebar } from '@/shared/ui/sidebar';
import { Logo } from '../logo'

const data = {
	teams: [
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise',
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveform,
			plan: 'Startup',
		},
		{
			name: 'Evil Corp.',
			logo: Command,
			plan: 'Free',
		},
	],
};

export function TeamSwitcher({
	teams,
}: {
	teams: {
		name: string;
		logo: React.ElementType;
		plan: string;
	}[];
}) {
	const { isMobile } = useSidebar();
	const [activeTeam, setActiveTeam] = React.useState(teams[0]);

	if (!activeTeam) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				{/* <SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-x-2.5"
				>
					<Logo className="size-8" />
					<span className="truncate text-2xl font-medium">Nexus</span>
				</SidebarMenuButton> */}
				<SidebarMenuButton
					size="lg"
					className="group"
				>
					<Logo />
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<SidebarProvider>
			<Sidebar
				collapsible="icon"
				{...props}
			>
				<SidebarHeader>
					<TeamSwitcher teams={data.teams} />
				</SidebarHeader>
				{/* <SidebarHeader className="block">
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Logo />
					</SidebarMenuButton>
				</SidebarHeader> */}
				{/* <SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail /> */}
			</Sidebar>
		</SidebarProvider>
	);
}
