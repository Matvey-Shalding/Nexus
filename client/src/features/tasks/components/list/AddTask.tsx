'use client';

import { useAddTaskDraft } from '@/features/tasks/hooks/useAddTaskDraft';
import { useAddTaskInteractions } from '@/features/tasks/hooks/useAddTaskInteractions';
import { useCreateTask } from '@/features/tasks/hooks/useCreateTask';
import React from 'react';
import { AddTaskButton } from './ui/AddTaskButton';
import { AddTaskWrapper } from './ui/AddTaskWrapper';

interface Props {
	className?: string;
}

export const AddTask: React.FC<Props> = ({}) => {
	const {
		mode,
		setMode,
		title,
		setTitle,
		date,
		setDate,
		taskRef,
		calendarRef,
		priorityRef,
		priority,
		setPriority,
		reset,
	} = useAddTaskDraft();

	const { createTask } = useCreateTask(setMode);

	useAddTaskInteractions(taskRef, title, mode, date, priority, createTask, calendarRef, priorityRef, reset);

	if (mode === 'default') {
		return <AddTaskButton handleClick={() => setMode('focused')} />;
	} else {
		return (
			<AddTaskWrapper
				taskRef={taskRef}
				title={title}
				setTitle={setTitle}
				selectedDate={date}
				setSelectedDate={setDate}
				calendarRef={calendarRef}
				selectedPriority={priority}
				setSelectedPriority={setPriority}
				priorityRef={priorityRef}
				onDelete={reset}
				inputProps={{ autoFocus: true }}
			/>
		);
	}
};
