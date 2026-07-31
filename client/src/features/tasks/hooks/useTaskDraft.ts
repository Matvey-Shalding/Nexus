import { useState } from 'react';
import { TPriority } from '../types/Priority';

export const useTaskDraft = (defaultTitle: string, defaultDate: string | null, defaultPriority: TPriority) => {
	const formattedDate = defaultDate ? new Date(defaultDate) : undefined;

	const [title, setTitle] = useState<string>(defaultTitle);
	const [date, setDate] = useState<Date | undefined>(formattedDate);
	const [priority, setPriority] = useState<TPriority>(defaultPriority);

	return { title, setTitle, date, setDate, priority, setPriority };
};
