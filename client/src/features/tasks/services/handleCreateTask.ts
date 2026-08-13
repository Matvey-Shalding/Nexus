import { createTask } from '../api/createTask';
import { CreateTaskDraft, CreateTaskRequest } from '../types/Task';
import { mapDateToServer } from '../utils/mapDateToServer';

export const handleCreateTask = async ({ title, date, priority }: CreateTaskDraft) => {
	const due_date = mapDateToServer(date);

	const request: CreateTaskRequest = {
		title: title,
		due_date,
		priority: priority,
		completed: false,
	};

	await createTask(request);
};
