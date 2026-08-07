import React from 'react';

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
export const TaskListRow: React.FC<Props> = ({ title, tasks, creationEnabled, defaultValues }) => {
	return (
		<div className="flex w-full flex-col gap-y-2">
			<span className="font-heading pl-2.5 text-xl font-semibold">{title}</span>
			<div className="flex flex-col">
				{tasks.map(task => (
					<Task
						key={task.id}
						task={task}
					/>
				))}
				{creationEnabled && <AddTask defaultValues={defaultValues} />}
			</div>
		</div>
	);
};
