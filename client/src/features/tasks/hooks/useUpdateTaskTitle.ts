import { useDebounce } from '@/shared/hooks/useDebounce';
import { useEffect } from 'react';

import { UpdateTaskRequest } from '../types/Task';

export const useUpdateTaskTitle = (title: string, updateTask: (data: UpdateTaskRequest) => void) => {
	const debouncedTitle = useDebounce(title);

	useEffect(() => {
		updateTask({ title: debouncedTitle });
	}, [debouncedTitle]);
};
