import { useDebounce } from '@/shared/hooks/useDebounce';
import { useEffect, useRef } from 'react';

import { UpdateTaskRequest } from '../types/Task';

export const useUpdateTaskTitle = (title: string, updateTask: (data: UpdateTaskRequest) => void, id: number) => {
	const debouncedTitle = useDebounce(title);

	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		updateTask({ title: debouncedTitle, id });
	}, [debouncedTitle]);
};
