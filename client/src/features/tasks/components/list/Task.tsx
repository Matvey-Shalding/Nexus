'use client';

import { useDraggable } from '@dnd-kit/react';
import React from 'react';

import { DND_KIT_TYPES } from '../../config/dnd-kit';
import { useTaskActions } from '../../hooks/useTaskActions';
import { useTaskDraft } from '../../hooks/useTaskDraft';
import { ITask, ITaskDragData } from '../../types/Task';

import { TaskWrapper } from './ui/TaskWrapper';

interface Props {
	className?: string;
	task: ITask;
	groupId: string;
}
export const Task: React.FC<Props> = ({ task, groupId }) => {
	const { title, setTitle, date, setDate, priority, setPriority, isCompleted, setIsCompleted } = useTaskDraft(
		task.title,
		task.due_date,
		task.priority,
		task.completed,
	);

	const { handleTitleUpdate, handlePriorityUpdate, handleDateUpdate, deleteTask, handleCompletedUpdate } =
		useTaskActions(task.id, title, setTitle, date, setDate, priority, setPriority, setIsCompleted);

	const { ref, isDragging } = useDraggable({
		id: task.id,
		type: DND_KIT_TYPES.TASK,
		data: {
			task,
			groupId,
		} satisfies ITaskDragData,
	});

	return (
		<TaskWrapper
			isDragging={isDragging}
			ref={ref}
			isCompleted={isCompleted}
			handleCompletedUpdate={handleCompletedUpdate}
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
