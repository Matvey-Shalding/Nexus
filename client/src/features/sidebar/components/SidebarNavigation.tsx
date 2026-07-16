'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../../../shared/ui/sidebar';
import { navigation } from '../config/navigation';

interface Props {
	className?: string;
}

export const SidebarNavigation: React.FC<Props> = ({}) => {
	const { open } = useSidebar();

	const pathname = usePathname();
	return (
		<SidebarMenu className={cn(open ? 'space-y-0.5' : 'space-y-4')}>
			{navigation.map(item => (
				<SidebarMenuItem key={item.title}>
					<Link href={item.href}>
						<SidebarMenuButton
							data-active={pathname === item.href}
							data-hover="fancy"
							size="lg"
							className="min-w-full self-stretch"
							tooltip={item.title}
						>
							<item.icon className="size-6" />
							<span className="text-lg font-medium"> {item.title} </span>
						</SidebarMenuButton>
					</Link>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
};
