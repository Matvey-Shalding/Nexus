import { TPriority } from '@/features/tasks/types/Priority';
import React from 'react';
import { TaskDateField } from './TaskDateField';
import { TaskDeleteButton } from './TaskDeleteButton';
import { TaskLayout } from './TaskLayout';
import { TaskPriorityField } from './TaskPriorityField';
import { TaskTitleField } from './TaskTitleField';

interface Props {
	title: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	selectedDate: Date | undefined;
	setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	selectedPriority: TPriority;
	setSelectedPriority: React.Dispatch<React.SetStateAction<TPriority>>;
	handleDelete: () => void;
}

export const TaskWrapper: React.FC<Props> = ({
	title,
	setTitle,
	inputProps,
	selectedDate,
	setSelectedDate,
	selectedPriority,
	setSelectedPriority,
	handleDelete,
}) => {
	return (
		<TaskLayout>
			<TaskTitleField
				title={title}
				setTitle={setTitle}
				inputProps={inputProps}
			/>
			<TaskDateField
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
			<TaskPriorityField
				selectedPriority={selectedPriority}
				setSelectedPriority={setSelectedPriority}
			/>
			<TaskDeleteButton onDelete={handleDelete} />
		</TaskLayout>
	);
};
