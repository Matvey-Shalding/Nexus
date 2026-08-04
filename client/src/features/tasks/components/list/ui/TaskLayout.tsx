import { cn } from '@/lib/utils';
import React, { RefObject } from 'react';

interface Props {
	taskRef?: RefObject<HTMLDivElement | null>;
	children: React.ReactNode;
	isCompleted?: boolean;
}

export const TaskLayout: React.FC<Props> = ({ taskRef, children, isCompleted = false }) => {
	return (
		<div
			ref={taskRef}
			className={cn(
				'border-border grid min-h-14 w-full grid-cols-[8fr_2.25fr_2.25fr_0.5fr] gap-3.5 border-y pl-2.5 transition-all duration-200',
				isCompleted && 'bg-muted/20 opacity-80',
			)}
		>
			{children}
		</div>
	);
};
