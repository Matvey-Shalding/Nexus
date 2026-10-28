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
	const { ref, isDragging, deleteTask, updateTitle, updateDate, updateCompleted, updatePriority,title } = useTaskController(
		task,
		groupId,
	);

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
			<div className="flex items-center justify-between basis-full">
				<div className="flex items-center gap-x-2.5">
					<TaskDateField
						isCompleted={task.completed}
						selectedDate={task.due_date}
						updateDate={updateDate}
					/>
					<TaskPriorityField
						updatePriority={updatePriority}
						isCompleted={task.completed}
						selectedPriority={task.priority}
					/>
				</div>
				<TaskDeleteButton onDelete={deleteTask} />
			</div>
		</TaskLayout>
	);
};
