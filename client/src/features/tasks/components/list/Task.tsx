'use client';

import React from 'react';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { useTaskDraft } from '../../hooks/useTaskDraft';
import { ITask } from '../../types/Task';
import { TaskWrapper } from './ui/TaskWrapper';
interface Props {
	className?: string;
	task: ITask;
}
export const Task: React.FC<Props> = ({ task }) => {
	const { title, setTitle, date, setDate, priority, setPriority } = useTaskDraft(
		task.title,
		task.due_date,
		task.priority,
	);

	const { handleDelete } = useDeleteTask();

	return (
		<TaskWrapper
			title={title}
			setTitle={setTitle}
			selectedDate={date}
			setSelectedDate={setDate}
			selectedPriority={priority}
			setSelectedPriority={setPriority}
			handleDelete={() => handleDelete(task.id)}
		/>
	);
};
