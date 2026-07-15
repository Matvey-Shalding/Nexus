import { cn } from '@/lib/utils';
import React from 'react';
import { LogoIcon } from './logo-icon';
interface Props {
	className?: string;
	textClassName?: string;
	iconClassName?: string;
}
export const Logo: React.FC<Props> = ({ textClassName, iconClassName, className }) => {
	return (
		<div className={cn('flex items-center justify-center gap-3 relative ml-10', className)}>
			<LogoIcon className="absolute left-0 -translate-x-[calc(100%+0.6rem)] top-1/2 -translate-y-1/2 size-7.5" />
			<span className="font-heading text-3xl font-semibold uppercase tracking-[0.2em] text-sidebar-foreground">
				Nexus
			</span>
		</div>
	);
};
