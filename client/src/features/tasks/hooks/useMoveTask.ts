import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTask as patchTask } from '../api/updateTask';
import { ITask, ITaskGroup, MoveTaskRequest } from '../types/Task';

export function useMoveTask() {
	const queryClient = useQueryClient();

	const { mutate: moveTask } = useMutation({
		mutationFn: (request: MoveTaskRequest) => patchTask(request.updateData),

		onMutate: async request => {
			await queryClient.cancelQueries({
				queryKey: ['tasks'],
			});

			const prevData = queryClient.getQueryData<ITaskGroup[]>(['tasks']);

			queryClient.setQueryData<ITaskGroup[]>(['tasks'], oldData => {
				if (!oldData) return oldData;

				const task: ITask = {
					...request.draggedTaskData.task,
					...request.updateData,
				};

				return oldData.map(taskGroup => {
					if (taskGroup.id === request.targetGroupId) {
						return {
							...taskGroup,
							tasks: [...taskGroup.tasks, task],
						};
					}

					if (taskGroup.id === request.draggedTaskData.groupId) {
						return {
							...taskGroup,
							tasks: taskGroup.tasks.filter(t => t.id !== task.id),
						};
					}

					return taskGroup;
				});
			});

			return { prevData };
		},

		onError: (_, __, context) => {
			queryClient.setQueryData(['tasks'], context?.prevData);
		},

		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['tasks'],
			});
		},
	});

	return { moveTask };
}
