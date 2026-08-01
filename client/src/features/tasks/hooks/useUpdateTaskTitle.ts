import { useDebounce } from '@/shared/hooks/useDebounce';
import { UpdateTaskRequest } from '../types/Task';
import { useEffect } from 'react'

export const useUpdateTaskTitle = (title: string, updateTask: (data: UpdateTaskRequest) => void) => {
	const debouncedTitle = useDebounce(title);

	useEffect(() => {
		updateTask({ title: debouncedTitle });
	}, [debouncedTitle]);
};
