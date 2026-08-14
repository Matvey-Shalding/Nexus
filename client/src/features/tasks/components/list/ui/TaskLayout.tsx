'use client';

import { cn } from '@/lib/utils';
import { useMergedRefs } from '@/shared/hooks/useMergedRefs';
import { motion } from 'motion/react';
import React, { forwardRef } from 'react';

interface Props {
	taskRef?: React.RefObject<HTMLDivElement | null>;
	children: React.ReactNode;
	isCompleted?: boolean;
	isDragging?: boolean;
	disableAnimation?: boolean;
}

export const TaskLayout = forwardRef<HTMLDivElement, Props>(
	({ children, taskRef, isCompleted = false, isDragging = false, disableAnimation = false }, ref) => {
		const mergedRef = useMergedRefs(taskRef, ref);

		const className = cn(
			'grid min-h-14 w-full grid-cols-[6fr_3fr_2.5fr_0.6fr] border-b border-border pl-2.5 group/task',
			isCompleted && 'bg-muted/20',
			isDragging && 'bg-muted/30 opacity-40 shadow-none',
		);

		if (disableAnimation) {
			return (
				<div
					ref={mergedRef}
					className={className}
				>
					{children}
				</div>
			);
		}

		return (
			<motion.div
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: 'auto', opacity: 1 }}
				exit={{ height: 0, opacity: 0 }}
				transition={{ duration: 0.2, ease: 'easeOut' }}
			>
				<motion.div
					ref={mergedRef}
					initial={{
						opacity: 0,
						y: -8,
						scale: 0.98,
						filter: 'blur(4px)',
					}}
					animate={{
						opacity: 1,
						y: 0,
						scale: 1,
						filter: 'blur(0px)',
					}}
					exit={{
						opacity: 0,
						y: 8,
						scale: 0.98,
						filter: 'blur(4px)',
					}}
					transition={{ duration: 0.15, ease: 'easeOut' }}
					className={className}
				>
					{children}
				</motion.div>
			</motion.div>
		);
	},
);

TaskLayout.displayName = 'TaskLayout';
