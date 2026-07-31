import { useRef, useState } from 'react';
import { TPriority } from '../types/Priority';

export type AddTaskMode = 'default' | 'focused';

export const useAddTaskDraft = () => {
	const [mode, setMode] = useState<AddTaskMode>('default');
	const [title, setTitle] = useState<string>('');
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [priority, setPriority] = useState<TPriority>(0);

	const taskRef = useRef<HTMLDivElement>(null);
	const calendarRef = useRef<HTMLDivElement>(null);
	const priorityRef = useRef<HTMLDivElement>(null);

	const reset = () => {
		setTitle('');
		setDate(undefined);
		setPriority(0);
		setMode('default');
	};

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
		reset,
	};
};
