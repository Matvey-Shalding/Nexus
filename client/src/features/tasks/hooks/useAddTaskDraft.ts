import { useRef, useState } from 'react';

import { TPriority } from '../types/Priority';
import { ITaskGroupDefaultValues } from '../types/Task';

export type AddTaskMode = 'default' | 'focused';

export const useAddTaskDraft = (defaultValues: ITaskGroupDefaultValues | null) => {
	const [mode, setMode] = useState<AddTaskMode>('default');
	const [title, setTitle] = useState<string>('');
	const [date, setDate] = useState<Date | undefined>(
		defaultValues?.due_date ? new Date(defaultValues.due_date) : undefined,
	);
	const [priority, setPriority] = useState<TPriority>(defaultValues?.priority || 0);

	const taskRef = useRef<HTMLDivElement>(null);
	const calendarRef = useRef<HTMLDivElement>(null);
	const priorityRef = useRef<HTMLDivElement>(null);

	return {
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
	};
};
