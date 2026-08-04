import { TPriority } from '../types/Priority';

import { AddTaskMode } from './useAddTaskDraft';
import { useCreateTask } from './useCreateTask';

export const useAddTaskActions = (
	setTitle: React.Dispatch<React.SetStateAction<string>>,
	setPriority: React.Dispatch<React.SetStateAction<TPriority>>,
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
	setMode: React.Dispatch<React.SetStateAction<AddTaskMode>>,
) => {
	const handleTitleUpdate = (title: string) => {
		setTitle(title);
	};

	const handlePriorityUpdate = (priority: TPriority) => {
		setPriority(priority);
	};

	const handleDateUpdate = (date: Date | undefined) => {
		setDate(date);
	};

	const reset = () => {
		setTitle('');
		setDate(undefined);
		setPriority(0);
		setMode('default');
	};

	const { createTask } = useCreateTask(setMode);

	return { handleTitleUpdate, handlePriorityUpdate, handleDateUpdate, reset, createTask };
};
