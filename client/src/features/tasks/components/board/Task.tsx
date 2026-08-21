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
	const {
		ref,
		isDragging,
		isCompleted,
		handleCompletedUpdate,
		title,
		handleTitleUpdate,
		selectedDate: date,
		handleDateUpdate,
		selectedPriority: priority,
		handlePriorityUpdate,
		deleteTask,
	} = useTaskController(task, groupId);

	return (
		<TaskLayout
			isDragging={isDragging}
			ref={ref}
			isCompleted={isCompleted}
		>
			<TaskTitleField
				isCompleted={isCompleted}
				handleCompletedUpdate={handleCompletedUpdate}
				title={title}
				handleTitleUpdate={handleTitleUpdate}
			/>
			<div className="flex items-center justify-between basis-full">
				<div className="flex items-center gap-x-2.5">
					<TaskDateField
						isCompleted={isCompleted}
						selectedDate={date}
						handleDateUpdate={handleDateUpdate}
					/>
					<TaskPriorityField
						isCompleted={isCompleted}
						selectedPriority={priority}
						handlePriorityUpdate={handlePriorityUpdate}
					/>
				</div>
				<TaskDeleteButton onDelete={deleteTask} />
			</div>
		</TaskLayout>
	);
};
