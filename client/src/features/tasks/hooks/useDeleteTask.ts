import { queryClient } from '@/lib/reactQueryClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteTask as removeTask } from '../api/deleteTask';

export const useDeleteTask = (id: number) => {
	const { mutate: deleteTask } = useMutation({
		mutationFn: () => removeTask(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			toast.success('Task deleted successfully');
		},
		onError: () => {
			toast.error('Error deleting task');
		},
	});

	return { deleteTask };
};
