'use client';

import React from 'react';

import { useTaskController } from '../../hooks/useTaskController';
import { ITask } from '../../types/Task';

import { TaskDateField } from './ui/TaskDateField';
import { TaskDeleteButton } from './ui/TaskDeleteButton';
import { TaskLayout } from './ui/TaskLayout';
import { TaskPriorityField } from './ui/TaskPriorityField';
import { TaskTitleField } from './ui/TaskTitleField';

interface Props {
	className?: string;
	task: ITask;
	groupId: string;
}
export const Task: React.FC<Props> = ({ task, groupId }) => {
	const { ref, isDragging, deleteTask, updateTitle, updateDate, updateCompleted, updatePriority, title } =
		useTaskController(task, groupId);

	return (
		<TaskLayout
			isDragging={isDragging}
			ref={ref}
			isCompleted={task.completed}
		>
			<TaskTitleField
				isCompleted={task.completed}
				title={title}
				updateTitle={updateTitle}
				updateCompleted={updateCompleted}
			/>
			<TaskDateField
				isCompleted={task.completed}
				selectedDate={task.due_date}
				updateDate={updateDate}
			/>
			<TaskPriorityField
				isCompleted={task.completed}
				selectedPriority={task.priority}
				updatePriority={updatePriority}
			/>
			<TaskDeleteButton onDelete={deleteTask} />
		</TaskLayout>
	);
};
