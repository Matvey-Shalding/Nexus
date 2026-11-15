'use client';

import { cn } from '@/lib/utils';
import { useMergedRefs } from '@/shared/hooks/useMergedRefs';
import { motion } from 'motion/react';
import React, { forwardRef } from 'react';

interface Props {
	taskRef?: React.RefObject<HTMLDivElement | null>;
	children?: React.ReactNode;
	isCompleted?: boolean;
	isDragging?: boolean;
	disableAnimation?: boolean;
	isDropPreview?: boolean;
}

const layoutVariants = {
	initial: { height: 0, opacity: 0 },
	animate: { height: 'auto', opacity: 1 },
	exit: { height: 0, opacity: 0 },
};

const contentVariants = {
	initial: { opacity: 0, y: -8, scale: 0.98 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: 8, scale: 0.98 },
};

export const TaskLayout = forwardRef<HTMLDivElement, Props>(
	(
		{ children, taskRef, isCompleted = false, isDragging = false, disableAnimation = false, isDropPreview = false },
		ref,
	) => {
		const mergedRef = useMergedRefs(taskRef, ref);

		const className = cn(
			'grid min-h-14 w-full grid-cols-[6fr_3fr_2.5fr_0.6fr] border-b border-border pl-2.5 group/task transition-all duration-200',
			isCompleted && 'bg-muted/20',
			isDragging && 'scale-[0.95] opacity-60 border-dashed border-muted-foreground/40 pointer-events-none',
		);

		if (isDropPreview) {
			return (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: '56px', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					className={cn('w-full border-b border-dashed border-primary/40 bg-primary/15', isCompleted && 'bg-muted/20')}
				/>
			);
		}

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
				variants={layoutVariants}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 0.2, ease: 'easeOut' }}
			>
				<motion.div
					ref={mergedRef}
					variants={contentVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.15, ease: 'easeOut' }}
					className={className}
				>
					{children}
				</motion.div>
			</motion.div>
		);
	},
);
