import { ITask, ITaskGroupDefaultValues, UpdateTaskRequest } from '../types/Task';
import { mapDateToServer } from '../utils/mapDateToServer';

export const handleCreateMoveTaskRequest = (
	task: ITask,
	targetGroupId: string,
	sourceGroupId: string,
	defaults: ITaskGroupDefaultValues | null,
): UpdateTaskRequest => {
	const request: UpdateTaskRequest = {
		id: task.id,
	};

	if (sourceGroupId === 'completed') {
		request.completed = false;
	}

	if (targetGroupId === 'completed') {
		request.completed = true;
		return request;
	}

	if (targetGroupId === 'no_date') {
		request.due_date = null;
		return request;
	}

	if (defaults) {
		if (defaults.due_date !== null) {
			if (new Date().getDay() == 0 && targetGroupId == 'next_week') {
				const prevDate = new Date(defaults.due_date);

				prevDate.setDate(prevDate.getDate() + 1);

				request.due_date = mapDateToServer(prevDate);
			} else {
				request.due_date = defaults.due_date;
			}
		}
		if (defaults.priority !== null) {
			request.priority = defaults.priority;
		}
	}

	return request;
};
