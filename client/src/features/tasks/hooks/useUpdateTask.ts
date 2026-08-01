import { queryClient } from '@/lib/reactQueryClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateTask as patchTask } from '../api/updateTask';
import { UpdateTaskRequest } from '../types/Task';

export const useUpdateTask = (id: number) => {
	const { mutate: updateTask } = useMutation({
		mutationFn: (data: UpdateTaskRequest) => patchTask({ ...data, id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
		onError: () => {
			toast.error('Error updating task');
		},
	});

	return { updateTask };
};
