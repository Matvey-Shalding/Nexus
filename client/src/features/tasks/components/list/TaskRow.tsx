'use client';

import { cn } from '@/lib/utils';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useDroppable } from '@dnd-kit/react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useMemo } from 'react';

import { DND_KIT_TYPES } from '../../config/dnd-kit';
import { ITask, ITaskGroupDefaultValues } from '../../types/Task';

import {List} from './List';

interface Props {
	className?: string;
	id: string;
	title: string;
	tasks: ITask[];
	creationEnabled: boolean;
	defaultValues: ITaskGroupDefaultValues | null;
}

export const TaskRow: React.FC<Props> = ({ title, tasks, creationEnabled, defaultValues, id }) => {
	const { ref, isDropTarget } = useDroppable({
		id,
		type: DND_KIT_TYPES.COLUMN,
		accept: DND_KIT_TYPES.TASK,
		collisionPriority: CollisionPriority.Low,
		data: {
			defaults: defaultValues,
		},
		disabled: id === 'expired',
	});

	const [isGroupOpen, setIsGroupOpen] = React.useState(true);

	return (
		<div
			ref={ref}
			className={cn('flex w-full flex-col transition-colors duration-150', isDropTarget && ['bg-primary/15'])}
		>
			<div
				onClick={() => setIsGroupOpen(prev => !prev)}
				className="flex items-center justify-between border-border border-b py-3 pl-2.5 "
			>
				<div className="flex items-end gap-x-2">
					<span className={cn('font-heading text-xl font-medium')}>{title}</span>
					<span className="text-muted-foreground text">{tasks.length}</span>
				</div>
				<ChevronDown
					className={cn(
						'transition-transform duration-300 size-5 text-muted-foreground',
						isGroupOpen ? 'rotate-180' : 'rotate-0',
					)}
				/>
			</div>

			<AnimatePresence initial={false}>
				{isGroupOpen && (
					<motion.div
						style={{ overflow: 'hidden' }}
						initial={{ height: 0 }}
						animate={{ height: 'auto' }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						exit={{ height: 0 }}
						key={'container'}
					>
						<AnimatePresence initial={false}>
							{tasks.map(task => (
								<List.Task
									groupId={id}
									key={task.id}
									task={task}
								/>
							))}

							{creationEnabled && <List.AddTask defaultValues={defaultValues} />}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
