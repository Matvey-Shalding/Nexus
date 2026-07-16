'use client';

import { cn } from '@/lib/utils';
import { Button } from '../../../shared/ui/button';
import { Logo } from '../../../shared/ui/logo';
import { SidebarHeader as Header, SidebarMenuButton, useSidebar } from '../../../shared/ui/sidebar';

import { ChevronsLeft } from 'lucide-react';
import React from 'react';
interface Props {
	className?: string;
}
export const SidebarHeader: React.FC<Props> = ({ className }) => {
	const { toggleSidebar, open, isMobile } = useSidebar();

	return (
		<Header className="relative">
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
		</Header>
	);
};
