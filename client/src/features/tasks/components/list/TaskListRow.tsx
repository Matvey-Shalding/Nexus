'use client';

import { cn } from '@/lib/utils';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useDroppable } from '@dnd-kit/react';
import React, { useEffect } from 'react';

import { DND_KIT_TYPES } from '../../config/dnd-kit';
import { ITask, ITaskGroupDefaultValues } from '../../types/Task';

import { AddTask } from './AddTask';
import { Task } from './Task';

interface Props {
	className?: string;
	id: string;
	title: string;
	tasks: ITask[];
	creationEnabled: boolean;
	defaultValues: ITaskGroupDefaultValues | null;
}

export const TaskListRow: React.FC<Props> = ({ title, tasks, creationEnabled, defaultValues, id }) => {
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

	useEffect(() => {
		console.log('drop target', isDropTarget);
	}, [isDropTarget]);

	return (
		<div
			ref={ref}
			className={cn(
				'flex w-full flex-col rounded-xl transition-colors duration-150 pt-2',
				isDropTarget && ['bg-primary/15'],
			)}
		>
			<span className={cn('border-border border-b pb-2 pl-2.5 font-heading text-xl font-semibold')}>{title}</span>

			<div className="flex flex-col">
				{tasks.map(task => (
					<Task
						groupId={id}
						key={task.id}
						task={task}
					/>
				))}

				{creationEnabled && <AddTask defaultValues={defaultValues} />}
			</div>
		</div>
	);
};
