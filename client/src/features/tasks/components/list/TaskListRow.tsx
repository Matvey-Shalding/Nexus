'use client';

import { CollisionPriority } from '@dnd-kit/abstract';
import { useDroppable } from '@dnd-kit/react';
import React from 'react';

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
	const { ref } = useDroppable({
		id,
		type: DND_KIT_TYPES.COLUMN,
		accept: DND_KIT_TYPES.TASK,
		collisionPriority: CollisionPriority.Low,
		data: {
			defaults: defaultValues,
		},
		disabled: id === 'expired',
	});

	return (
		<div
			ref={ref}
			className="flex w-full flex-col gap-y-2"
		>
			<span className="font-heading pl-2.5 text-xl font-semibold">{title}</span>
			<div className="flex flex-col">
				{tasks.map((task, index) => (
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
