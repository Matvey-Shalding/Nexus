import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

import { updateTask as patchTask } from '../api/updateTask';
import { useTaskView } from '../components/KanbanProvider';
import { UpdateTaskRequest } from '../types/Task';

export const useUpdateTask = () => {
	const queryClient = useQueryClient();

	const { groupBy, sortBy, sortOrder } = useTaskView(
		useShallow(state => ({
			groupBy: state.groupBy,
			sortBy: state.sortBy,
			sortOrder: state.sortOrder,
		})),
	);

	const { mutate: updateTask } = useMutation({
		mutationFn: (data: UpdateTaskRequest) => patchTask(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', { groupBy, sortBy, sortOrder }] });
		},
		onError: () => {
			toast.error('Error updating task');
		},
	});

	return { updateTask };
};
