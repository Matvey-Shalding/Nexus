import { Dispatch, SetStateAction } from 'react';

import { TPriority } from '../types/Priority';
import { ITask } from '../types/Task';
import { mapDateToServer } from '../utils/mapDateToServer';

import { useDeleteTask } from './useDeleteTask';
import { useUpdateTask } from './useUpdateTask';
import { useUpdateTaskTitle } from './useUpdateTaskTitle';

export const useTaskActions = (
	task: ITask,
	setDatePopupOpen: Dispatch<SetStateAction<boolean>>,
	setPriorityPopupOpen: Dispatch<SetStateAction<boolean>>,
	updateTitle: Dispatch<SetStateAction<string>>,
	prevServerTitle: string,
	setPrevServerTitle: Dispatch<SetStateAction<string>>,
	title: string,
) => {
	const { updateTask } = useUpdateTask();

	const updateDate = (date: Date | undefined) => {
		updateTask({ id: task.id, due_date: mapDateToServer(date) });
		setDatePopupOpen(false);
	};

	const updatePriority = (priority: TPriority) => {
		setPriorityPopupOpen(false);
		updateTask({ id: task.id, priority });
	};

	const updateCompleted = (completed: boolean) => {
		updateTask({ id: task.id, completed });
	};

	if (prevServerTitle != task.title) {
		updateTitle(task.title);
		setPrevServerTitle(task.title);
	}

	useUpdateTaskTitle(title, task.title, updateTask, task.id);

	const { deleteTask } = useDeleteTask(task.id);

	return {
		updateDate,
		updatePriority,
		updateCompleted,
		deleteTask,
	};
};
