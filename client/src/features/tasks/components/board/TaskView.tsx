import React from 'react';

import { ITaskGroup } from '../../types/Task';

import { Board } from './Board';

interface Props {
	taskGroups: ITaskGroup[];
}

export const TaskView: React.FC<Props> = ({ taskGroups }) => {
	return (
		<div className="flex gap-x-4 overflow-x-auto">
			{taskGroups.map(taskGroup => (
				<Board.TaskColumn
					key={taskGroup.id}
					id={taskGroup.id}
					title={taskGroup.title}
					tasks={taskGroup.tasks}
					creationEnabled={taskGroup.creation.enabled}
					defaultValues={taskGroup.creation.defaults}
				/>
			))}
		</div>
	);
};
