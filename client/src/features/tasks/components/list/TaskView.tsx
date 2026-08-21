import React from 'react';

import { ITaskGroup } from '../../types/Task';
import { List } from './List'

interface Props {
	taskGroups: ITaskGroup[];
}

export const TaskView: React.FC<Props> = ({ taskGroups }) => {
	return (
		<div className="flex flex-col">
			<List.TaskViewTitle />
			<div className="flex w-full flex-col">
				{taskGroups.map(taskGroup => (
					<List.TaskRow
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
