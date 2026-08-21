'use client';

import { cn } from '@/lib/utils';
import { useMergedRefs } from '@/shared/hooks/useMergedRefs';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useDroppable } from '@dnd-kit/react';
import { AnimatePresence } from 'motion/react';
import React, { useEffect } from 'react';

import { DND_KIT_TYPES } from '../../config/dnd-kit';
import { ITask, ITaskGroupDefaultValues } from '../../types/Task';

import { Board } from './Board';

interface Props {
	className?: string;
	id: string;
	title: string;
	tasks: ITask[];
	creationEnabled: boolean;
	defaultValues: ITaskGroupDefaultValues | null;
}

export const TaskColumn: React.FC<Props> = ({ title, tasks, creationEnabled, defaultValues, id }) => {
	const { ref: droppableRef, isDropTarget } = useDroppable({
		id,
		type: DND_KIT_TYPES.COLUMN,
		accept: DND_KIT_TYPES.TASK,
		collisionPriority: CollisionPriority.Low,
		data: {
			defaults: defaultValues,
		},
		disabled: id === 'expired',
	});

	const columnRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (columnRef.current) {
			const top = columnRef.current.getBoundingClientRect().top;

			columnRef.current.style.setProperty('min-height', `${window.innerHeight - top}px`);
		}
	}, [columnRef]);

	const ref = useMergedRefs(droppableRef, columnRef);

	return (
		<div
			ref={columnRef}
			className={cn('flex w-full flex-col gap-y-4 transition-colors duration-150 overflow-x-visible min-w-78 pb-4')}
		>
			<div className="flex items-end gap-x-2 border-border border-b py-3 pl-2.5 mr-3">
				<span className={cn('font-heading text-xl font-medium')}>{title}</span>
				<span className="text-muted-foreground">{tasks.length}</span>
			</div>
			<div className={cn('overflow-y-auto pr-3')}>
				<div
					ref={droppableRef}
					className={cn('flex flex-col gap-y-4', isDropTarget && ['bg-primary/15'])}
				>
					<AnimatePresence initial={false}>
						{tasks.map(task => (
							<Board.Task
								groupId={id}
								key={task.id}
								task={task}
							/>
						))}

						{creationEnabled && <Board.AddTask defaultValues={defaultValues} />}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};
