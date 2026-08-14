import React from 'react';

import { ITaskGroup } from '../../types/Task';

import { TaskListRow } from './TaskListRow';
import { TaskListViewTitle } from './TaskListViewTitle';

interface Props {
	taskGroups: ITaskGroup[];
}

export const TaskListView: React.FC<Props> = ({ taskGroups }) => {
	return (
		<div className="flex flex-col">
			<TaskListViewTitle />
			<div className="flex w-full flex-col">
				{taskGroups.map(taskGroup => (
					<TaskListRow
						key={taskGroup.id}
						id={taskGroup.id}
						title={taskGroup.title}
						tasks={taskGroup.tasks}
						creationEnabled={taskGroup.creation.enabled}
						defaultValues={taskGroup.creation.defaults}
					/>
				))}
			</div>
		</div>
	);
};
