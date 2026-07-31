import React from 'react';
import { ITask } from '../../types/Task';
import { Task } from './Task'
import { AddTask } from './AddTask'
interface Props {
	className?: string;
	title: string;
	tasks: ITask[];
}
export const TaskListRow: React.FC<Props> = ({ title, tasks }) => {
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
				<AddTask />
			</div>
		</div>
	);
};
