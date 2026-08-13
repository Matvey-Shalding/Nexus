import { ITaskGroupDefaultValues, UpdateTaskRequest } from '../types/Task';

export const handleCreateMoveTaskRequest = (
	taskId: number,
	targetGroupId: string,
	defaults: ITaskGroupDefaultValues | null,
): UpdateTaskRequest => {
	const request: UpdateTaskRequest = {
		id: taskId,
	};

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
			request.due_date = defaults.due_date;
		}

		if (defaults.priority !== null) {
			request.priority = defaults.priority;
		}
	}

	return request;
};
