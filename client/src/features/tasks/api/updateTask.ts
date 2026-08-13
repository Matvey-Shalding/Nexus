import { axiosInstance } from '@/shared/config';

import { ITask, UpdateTaskRequest } from '../types/Task';

export const updateTask = async (data: UpdateTaskRequest) => {
	return (await axiosInstance.patch<ITask>(`/tasks/${data.id}`, data)).data;
};
