import { useState } from 'react';

import { ITaskGroupDefaultValues } from '../types/Task';
import { mapDateToClient } from '../utils/mapDateToClient';

import { useAddTaskActions } from './useAddTaskActions';
import { useAddTaskDraft } from './useAddTaskDraft';
import { useAddTaskInteractions } from './useAddTaskInteractions';
import { formatPriority } from '../utils/formatPriority';
import { getPriorityStyles } from '../utils/getPriorityStyles';

export const useAddTaskController = (defaultValues: ITaskGroupDefaultValues | null) => {
	const { mode, setMode, title, setTitle, date, setDate, taskRef, priority, setPriority } =
		useAddTaskDraft(defaultValues);

	const { handleTitleUpdate, handlePriorityUpdate, handleDateUpdate, reset, createTask } = useAddTaskActions(
		setTitle,
		setPriority,
		setDate,
		setMode,
	);

	const [datePopupOpen, setDatePopupOpen] = useState(false);

	const [priorityPopupOpen, setPriorityPopupOpen] = useState(false);

	const formattedDate = mapDateToClient(date);

	const priorityLabel = formatPriority(priority);
	const styleClass = getPriorityStyles(priority);

	useAddTaskInteractions(taskRef, title, mode, date, priority, createTask, reset);

	return {
		mode,
		setMode,
		title,
		date,
		taskRef,
		priority,
		handleTitleUpdate,
		handlePriorityUpdate,
		handleDateUpdate,
		reset,
		datePopupOpen,
		setDatePopupOpen,
		priorityPopupOpen,
    setPriorityPopupOpen,
    formattedDate,
    priorityLabel,
		styleClass
	};
};
