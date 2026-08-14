'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useSidebar } from '../../../shared/ui/sidebar';
import { navigation } from '../config/navigation';

interface Props {
	className?: string;
}

export const SidebarNavigation: React.FC<Props> = ({}) => {
	const { open } = useSidebar();
	const pathname = usePathname();

	return (
		<nav className="flex flex-col gap-y-0.5">
			{navigation.map(item => {
				const isActive = pathname === item.href;

				return (
					<Link
						href={item.href}
						key={item.title}
						className={cn(
							'group/nav flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors duration-150',
							isActive
								? 'bg-primary text-white hover:bg-primary/80'
								: 'text-muted-foreground hover:bg-muted hover:text-foreground',
							!open && 'size-11 px-2.5',
						)}
					>
						<item.icon
							className={`
                size-6! min-w-6!
                transition-[transform,color] duration-150 ease-out
                group-hover/nav:scale-105
                ${isActive ? 'text-white' : 'text-muted-foreground group-hover/nav:text-foreground'}
              `}
						/>

						<span
							className={cn(
								'text-lg font-medium transition-colors duration-150 overflow-hidden',
								isActive ? 'text-white' : 'text-muted-foreground group-hover/nav:text-foreground whitespace-nowrap',
							)}
							// className={`
							//   text-lg font-medium
							//   transition-colors duration-150
							//   ${isActive ? 'text-white' : 'text-muted-foreground group-hover/nav:text-foreground'}
							// `}
						>
							{item.title}
						</span>
					</Link>
				);
			})}
		</nav>
	);
};
