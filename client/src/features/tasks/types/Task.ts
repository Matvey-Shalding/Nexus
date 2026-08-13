import { TPriority } from './Priority';

export interface ITask {
	id: number;
	title: string;
	due_date: string | null;
	priority: TPriority;
	completed: boolean;
}

export interface ITaskDragData {
	task: ITask;
	groupId: string;
}

export interface MoveTaskRequest {
	updateData: UpdateTaskRequest;
	targetGroupId: string;
	draggedTaskData: ITaskDragData;
}

export interface ITaskGroupDefaultValues {
	due_date: string | null;
	priority: TPriority | null;
}

export interface ITaskGroup {
	id: string;
	title: string;
	tasks: ITask[];
	creation: {
		enabled: boolean;
		defaults: ITaskGroupDefaultValues | null;
	};
}

export interface CreateTaskRequest {
	title: string;
	due_date: string | null;
	priority: TPriority;
	completed: boolean;
}

export interface CreateTaskDraft {
	title: string;
	date: Date | undefined;
	priority: TPriority;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
	id: number;
}
