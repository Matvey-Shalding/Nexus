'use client';

import React from 'react';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { useTaskDraft } from '../../hooks/useTaskDraft';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { useUpdateTaskTitle } from '../../hooks/useUpdateTaskTitle';
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

	const { deleteTask } = useDeleteTask(task.id);

	const { updateTask } = useUpdateTask(task.id);

	useUpdateTaskTitle(title, updateTask);

	return (
		<TaskWrapper
			title={title}
			setTitle={setTitle}
			selectedDate={date}
			setSelectedDate={setDate}
			selectedPriority={priority}
			setSelectedPriority={setPriority}
			deleteTask={deleteTask}
			updateTask={updateTask}
		/>
	);
};
