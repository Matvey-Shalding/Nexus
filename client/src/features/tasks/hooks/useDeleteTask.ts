import { queryClient } from '@/lib/reactQueryClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteTask } from '../api/deleteTask';

export const useDeleteTask = () => {
	const { mutate: handleDelete } = useMutation({
		mutationFn: (taskId: number) => deleteTask(taskId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			toast.success('Task deleted successfully');
		},
		onError: () => {
			toast.error('Error deleting task');
		},
	});

	return { handleDelete };
};
