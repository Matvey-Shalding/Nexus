import { ITaskGroupDefaultValues } from '../types/Task';

import { useAddTaskActions } from './useAddTaskActions';
import { useAddTaskDraft } from './useAddTaskDraft';
import { useAddTaskInteractions } from './useAddTaskInteractions';

export const useAddTaskController = (defaultValues: ITaskGroupDefaultValues | null) => {
	const { mode, setMode, title, setTitle, date, setDate, taskRef, priority, setPriority } =
		useAddTaskDraft(defaultValues);

	const { handleTitleUpdate, handlePriorityUpdate, handleDateUpdate, reset, createTask } = useAddTaskActions(
		setTitle,
		setPriority,
		setDate,
		setMode,
	);

	useAddTaskInteractions(taskRef, title, mode, date, priority, createTask, reset);

	return {
		mode,
		setMode,
		title,
		date,
		taskRef,
		priority,
		handleTitleUpdate,
		handlePriorityUpdate,
		handleDateUpdate,
		reset,
	};
};
