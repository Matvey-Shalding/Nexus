import { TPriority } from '@/features/tasks/types/Priority';
import React, { forwardRef } from 'react';

import { TaskDateField } from './TaskDateField';
import { TaskDeleteButton } from './TaskDeleteButton';
import { TaskLayout } from './TaskLayout';
import { TaskPriorityField } from './TaskPriorityField';
import { TaskTitleField } from './TaskTitleField';

interface Props {
	title: string;
	handleTitleUpdate: (value: string) => void;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	selectedDate: Date | undefined;
	handleDateUpdate: (date: Date | undefined) => void;
	selectedPriority: TPriority;
	handlePriorityUpdate: (priority: TPriority) => void;
	deleteTask: () => void;
	isCompleted?: boolean;
	handleCompletedUpdate?: (value: boolean) => void;
	isDragging: boolean;
}

export const TaskWrapper = forwardRef<HTMLDivElement, Props>(
	(
		{
			title,
			handleTitleUpdate,
			inputProps,
			selectedDate,
			handleDateUpdate,
			selectedPriority,
			handlePriorityUpdate,
			deleteTask,
			isCompleted,
			handleCompletedUpdate,
			isDragging,
		},
		ref,
	) => {
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
					inputProps={inputProps}
				/>
				<TaskDateField
					isCompleted={isCompleted}
					selectedDate={selectedDate}
					handleDateUpdate={handleDateUpdate}
				/>
				<TaskPriorityField
					isCompleted={isCompleted}
					selectedPriority={selectedPriority}
					handlePriorityUpdate={handlePriorityUpdate}
				/>
				<TaskDeleteButton onDelete={deleteTask} />
			</TaskLayout>
		);
	},
);
