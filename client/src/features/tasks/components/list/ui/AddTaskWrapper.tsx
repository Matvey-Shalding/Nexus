import { TPriority } from '@/features/tasks/types/Priority';
import React, { forwardRef } from 'react';

import { TaskDateField } from './TaskDateField';
import { TaskDeleteButton } from './TaskDeleteButton';
import { TaskLayout } from './TaskLayout';
import { TaskPriorityField } from './TaskPriorityField';
import { TaskTitleField } from './TaskTitleField';

interface Props {
	taskRef: React.RefObject<HTMLDivElement | null>;
	title: string;
	handleTitleUpdate: (value: string) => void;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	selectedDate: Date | undefined;
	handleDateUpdate: (date: Date | undefined) => void;
	calendarRef: React.RefObject<HTMLDivElement | null>;
	selectedPriority: TPriority;
	handlePriorityUpdate: (priority: TPriority) => void;
	priorityRef?: React.RefObject<HTMLDivElement | null>;
	onDelete: () => void;
}

export const AddTaskWrapper = forwardRef<HTMLDivElement, Props>(
	(
		{
			taskRef,
			title,
			inputProps,
			selectedDate,
			calendarRef,
			selectedPriority,
			onDelete,
			priorityRef,
			handlePriorityUpdate,
			handleDateUpdate,
			handleTitleUpdate,
		},
		ref,
	) => {
		return (
			<TaskLayout
				disableAnimation
				taskRef={taskRef}
				ref={ref}
			>
				<TaskTitleField
					addTaskMode
					title={title}
					inputProps={inputProps}
					handleTitleUpdate={handleTitleUpdate}
				/>
				<TaskDateField
					selectedDate={selectedDate}
					calendarRef={calendarRef}
					handleDateUpdate={handleDateUpdate}
				/>
				<TaskPriorityField
					selectedPriority={selectedPriority}
					handlePriorityUpdate={handlePriorityUpdate}
					priorityRef={priorityRef}
				/>
				<TaskDeleteButton onDelete={onDelete} />
			</TaskLayout>
		);
	},
);
