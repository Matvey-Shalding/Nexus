import { TPriority } from '@/features/tasks/types/Priority';
import { UpdateTaskRequest } from '@/features/tasks/types/Task';
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
	deleteTask: () => void;
	updateTask: (data: UpdateTaskRequest) => void;
}

export const TaskWrapper: React.FC<Props> = ({
	title,
	setTitle,
	inputProps,
	selectedDate,
	setSelectedDate,
	selectedPriority,
	setSelectedPriority,
	deleteTask,
	updateTask,
}) => {
	return (
		<TaskLayout>
			<TaskTitleField
				title={title}
				setTitle={setTitle}
				inputProps={inputProps}
			/>
			<TaskDateField
				updateTask={updateTask}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
			<TaskPriorityField
				updateTask={updateTask}
				selectedPriority={selectedPriority}
				setSelectedPriority={setSelectedPriority}
			/>
			<TaskDeleteButton onDelete={deleteTask} />
		</TaskLayout>
	);
};
