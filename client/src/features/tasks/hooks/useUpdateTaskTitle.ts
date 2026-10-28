import { useDebounce } from '@/shared/hooks/useDebounce';
import { useEffect, useRef } from 'react';

import { UpdateTaskRequest } from '../types/Task';

export const useUpdateTaskTitle = (
	curr_title: string,
	server_title: string,
	updateTask: (data: UpdateTaskRequest) => void,
	id: number,
) => {
	const debouncedTitle = useDebounce(curr_title);

	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		if (debouncedTitle != server_title && debouncedTitle.trim() != "") {
			updateTask({ title: debouncedTitle, id });
		}
	}, [debouncedTitle, id, updateTask, server_title]);
};
