'use client';

import React from 'react';
import { useTaskActions } from '../../hooks/useTaskActions';
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

	const { handleTitleUpdate, handlePriorityUpdate, handleDateUpdate, deleteTask } = useTaskActions(
		task.id,
		title,
		setTitle,
		date,
		setDate,
		priority,
		setPriority,
	);
	return (
		<TaskWrapper
			title={title}
			handleTitleUpdate={handleTitleUpdate}
			selectedDate={date}
			handleDateUpdate={handleDateUpdate}
			selectedPriority={priority}
			handlePriorityUpdate={handlePriorityUpdate}
			deleteTask={deleteTask}
		/>
	);
};
