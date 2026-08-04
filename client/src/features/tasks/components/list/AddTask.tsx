'use client';

import { useAddTaskDraft } from '@/features/tasks/hooks/useAddTaskDraft';
import { useAddTaskInteractions } from '@/features/tasks/hooks/useAddTaskInteractions';
import React from 'react';

import { useAddTaskActions } from '../../hooks/useAddTaskActions';

import { AddTaskButton } from './ui/AddTaskButton';
import { AddTaskWrapper } from './ui/AddTaskWrapper';

interface Props {
	className?: string;
}

export const AddTask: React.FC<Props> = ({}) => {
	const { mode, setMode, title, setTitle, date, setDate, taskRef, calendarRef, priorityRef, priority, setPriority } =
		useAddTaskDraft();

	const { handleTitleUpdate, handlePriorityUpdate, handleDateUpdate, reset, createTask } = useAddTaskActions(
		setTitle,
		setPriority,
		setDate,
		setMode,
	);

	useAddTaskInteractions(taskRef, title, mode, date, priority, createTask, calendarRef, priorityRef, reset);

	if (mode === 'default') {
		return <AddTaskButton handleClick={() => setMode('focused')} />;
	} else {
		return (
			<AddTaskWrapper
				handleTitleUpdate={handleTitleUpdate}
				handlePriorityUpdate={handlePriorityUpdate}
				handleDateUpdate={handleDateUpdate}
				taskRef={taskRef}
				title={title}
				selectedDate={date}
				calendarRef={calendarRef}
				selectedPriority={priority}
				priorityRef={priorityRef}
				onDelete={reset}
				inputProps={{ autoFocus: true }}
			/>
		);
	}
};
