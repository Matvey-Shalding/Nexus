import React from 'react';
import { ITask } from '../../../types/Task';
import { TaskDate } from './TaskDate';
import { TaskDelete } from './TaskDelete';
import { TaskPriority } from './TaskPriority';
import { TaskTitle } from './TaskTitle';
interface Props {
	className?: string;
	task: ITask;
}
export const Task: React.FC<Props> = ({ task }) => {
	return (
		<div className="border-border grid w-full grid-cols-[8fr_2fr_2fr_0.5fr] gap-3.5 border-y pl-2.5">
			<TaskTitle title={task.title} />
			<TaskDate dateStr={task.due_date} />
			<TaskPriority priorityNumber={task.priority} />
			<TaskDelete />
		</div>
	);
};
