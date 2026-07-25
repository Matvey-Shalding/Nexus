import React from 'react';
import { IGroupedTasks } from '../../types/Task';
import { TaskListRow } from './TaskListRow';
import { TaskListViewTitle } from './TaskListViewTitle';
interface Props {
	tasks: IGroupedTasks;
}

// TODO: tasks grouping
export const TaskListView: React.FC<Props> = ({ tasks }) => {
	return (
		<div className="flex flex-col gap-y-2">
			<TaskListViewTitle />
			<div className="flex w-full flex-col gap-y-5">
				{Object.keys(tasks).map(key => (
					<TaskListRow
						key={key}
						title={key}
						tasks={tasks[key]}
					/>
				))}
			</div>
		</div>
	);
};
