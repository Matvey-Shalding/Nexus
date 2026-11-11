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
			'w-full rounded-lg border-border border shadow-xl shadow-black/20 flex flex-col gap-y-5 p-3',
			isCompleted && 'bg-muted/20',
			isDragging && 'bg-muted/10 opacity-20 shadow-none',
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
					}}
					animate={{
						opacity: 1,
						y: 0,
						scale: 1,
					}}
					exit={{
						opacity: 0,
						y: 8,
						scale: 0.98,
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
