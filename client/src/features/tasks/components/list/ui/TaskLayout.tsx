'use client';

import { cn } from '@/lib/utils';
import { useMergedRefs } from '@/shared/hooks/useMergedRefs';
import React, { forwardRef } from 'react';

interface Props {
	taskRef?: React.RefObject<HTMLDivElement | null>;
	children: React.ReactNode;
	isCompleted?: boolean;
	isDragging?: boolean;
}

export const TaskLayout = forwardRef<HTMLDivElement, Props>(
	({ children, taskRef, isCompleted = false, isDragging }, ref) => {
		const mergedRef = useMergedRefs(taskRef, ref);

		return (
			<div
				ref={mergedRef}
				className={cn(
					'border-border grid min-h-14 w-full grid-cols-[8fr_2.75fr_2.25fr_0.5fr] gap-3.5 border-y pl-2.5 transition-all duration-200',
					isCompleted && 'opacity-80',
					isDragging && ['opacity-40', 'bg-muted/30'],
				)}
			>
				{children}
			</div>
		);
	},
);
