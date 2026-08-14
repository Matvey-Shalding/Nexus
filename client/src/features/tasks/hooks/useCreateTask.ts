import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

import { handleCreateTask } from '../services/handleCreateTask';
import { CreateTaskDraft } from '../types/Task';

import { AddTaskMode } from './useAddTaskDraft';

export const useCreateTask = (setMode: Dispatch<SetStateAction<AddTaskMode>>) => {
	const queryClient = useQueryClient();

	const { mutate: createTask } = useMutation({
		mutationFn: (data: CreateTaskDraft) => handleCreateTask(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			setMode('default');
			toast.success('Task created successfully');
		},
		onError: () => {
			toast.error('Error creating task');
		},
	});

	return { createTask };
};
