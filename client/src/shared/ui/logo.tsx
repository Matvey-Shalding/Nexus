import { cn } from '@/lib/utils';
import React from 'react';
import { LogoIcon } from './logo-icon';

interface Props {
	className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex items-center gap-3 overflow-hidden', className)}>
			<LogoIcon className="size-7.5 shrink-0" />
			<span className="font-heading text-sidebar-foreground text-3xl font-semibold tracking-[0.2em] uppercase">
				Nexus
			</span>
		</div>
	);
};
