import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateTask as patchTask } from '../api/updateTask';
import { UpdateTaskRequest } from '../types/Task';

export const useUpdateTask = () => {
	const queryClient = useQueryClient();

	const { mutate: updateTask } = useMutation({
		mutationFn: (data: UpdateTaskRequest) => patchTask(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
		onError: () => {
			toast.error('Error updating task');
		},
	});

	return { updateTask };
};
