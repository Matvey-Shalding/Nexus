import { TPriority } from '@/features/tasks/types/Priority';
import React from 'react';
import { TaskDateField } from './TaskDateField';
import { TaskDeleteButton } from './TaskDeleteButton';
import { TaskLayout } from './TaskLayout';
import { TaskPriorityField } from './TaskPriorityField';
import { TaskTitleField } from './TaskTitleField';
interface Props {
	taskRef: React.RefObject<HTMLDivElement | null>;
	title: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	selectedDate: Date | undefined;
	setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	calendarRef: React.RefObject<HTMLDivElement | null>;
	selectedPriority: TPriority;
	setSelectedPriority: React.Dispatch<React.SetStateAction<TPriority>>;
	priorityRef?: React.RefObject<HTMLDivElement | null>;
	onDelete: () => void;
}
export const AddTaskWrapper: React.FC<Props> = ({
	taskRef,
	title,
	setTitle,
	inputProps,
	selectedDate,
	setSelectedDate,
	calendarRef,
	selectedPriority,
	setSelectedPriority,
	onDelete,
	priorityRef,
}) => {
	return (
		<TaskLayout taskRef={taskRef}>
			<TaskTitleField
				title={title}
				setTitle={setTitle}
				inputProps={inputProps}
			/>
			<TaskDateField
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				calendarRef={calendarRef}
			/>
			<TaskPriorityField
				selectedPriority={selectedPriority}
				setSelectedPriority={setSelectedPriority}
				priorityRef={priorityRef}
			/>
			<TaskDeleteButton onDelete={onDelete} />
		</TaskLayout>
	);
};
