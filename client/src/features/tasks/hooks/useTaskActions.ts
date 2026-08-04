import { toast } from 'sonner';

import { TPriority } from '../types/Priority';
import { mapDateToServer } from '../utils/mapDateToServer';

import { useDeleteTask } from './useDeleteTask';
import { useUpdateTask } from './useUpdateTask';
import { useUpdateTaskTitle } from './useUpdateTaskTitle';

export const useTaskActions = (
	id: number,
	title: string,
	setTitle: React.Dispatch<React.SetStateAction<string>>,
	date: Date | undefined,
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
	priority: TPriority,
	setPriority: React.Dispatch<React.SetStateAction<TPriority>>,
	setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const { updateTask } = useUpdateTask(id);

	useUpdateTaskTitle(title, updateTask);

	const handleTitleUpdate = (title: string) => {
		setTitle(title);
	};

	const handlePriorityUpdate = (priority: TPriority) => {
		setPriority(priority);
		updateTask({ priority });
	};

	const handleDateUpdate = (date: Date | undefined) => {
		setDate(date);
		const formattedDate = mapDateToServer(date);

		updateTask({ due_date: formattedDate });
	};

	const handleCompletedUpdate = (isCompleted: boolean) => {
		setIsCompleted(isCompleted);
		updateTask({ completed: isCompleted });
	};

	const { deleteTask } = useDeleteTask(id);

	return { handleTitleUpdate, handlePriorityUpdate, handleDateUpdate, deleteTask, handleCompletedUpdate };
};
