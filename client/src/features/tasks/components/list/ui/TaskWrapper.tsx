import { TPriority } from '@/features/tasks/types/Priority';
import React from 'react';
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
}

export const TaskWrapper: React.FC<Props> = ({
	title,
	handleTitleUpdate,
	inputProps,
	selectedDate,
	handleDateUpdate,
	selectedPriority,
	handlePriorityUpdate,
	deleteTask,
}) => {
	return (
		<TaskLayout>
			<TaskTitleField
				title={title}
				handleTitleUpdate={handleTitleUpdate}
				inputProps={inputProps}
			/>
			<TaskDateField
				selectedDate={selectedDate}
				handleDateUpdate={handleDateUpdate}
			/>
			<TaskPriorityField
				selectedPriority={selectedPriority}
				handlePriorityUpdate={handlePriorityUpdate}
			/>
			<TaskDeleteButton onDelete={deleteTask} />
		</TaskLayout>
	);
};
