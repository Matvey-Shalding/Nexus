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
	({ children, taskRef, isCompleted = false, isDragging = false }, ref) => {
		const mergedRef = useMergedRefs(taskRef, ref);

		return (
			<div
				ref={mergedRef}
				className={cn(
					['grid min-h-14 w-full grid-cols-[8fr_2.75fr_2.5fr_0.6fr]', 'border-b border-border pl-2.5', ,],
					isCompleted && ['bg-muted/20'],
					isDragging && ['bg-muted/30', 'opacity-40', 'shadow-none'],
				)}
			>
				{children}
			</div>
		);
	},
);

TaskLayout.displayName = 'TaskLayout';
