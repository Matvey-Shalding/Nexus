'use client';

import { cn } from '@/lib/utils';
import { ChevronsLeft } from 'lucide-react';
import React from 'react';

import { Button } from '../../../shared/ui/button';
import { Logo } from '../../../shared/ui/logo';
import { SidebarHeader as Header, useSidebar } from '../../../shared/ui/sidebar';

export const SidebarHeader: React.FC = () => {
	const { toggleSidebar, open, state } = useSidebar();

	return (
		<Header className="relative">
			<div
				className={cn(
					'flex items-center justify-between transition-transform',
					state === 'collapsed' && 'translate-x-0.5',
				)}
			>
				<Logo />
				<Button
					onClick={() => toggleSidebar()}
					className={cn(
						'pointer-events-auto absolute top-1/2 right-0 grid size-7 translate-x-2/3 -translate-y-1/2 place-content-center rounded-md',
						!open && 'translate-x-full',
					)}
				>
					<ChevronsLeft className={cn('size-6', { 'rotate-180': !open })} />
				</Button>
			</div>
		</Header>
	);
};
