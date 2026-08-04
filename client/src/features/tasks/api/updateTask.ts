import { axiosInstance } from '@/shared/config';

import { ITask, UpdateTaskRequestDTO } from '../types/Task';

export const updateTask = async (data: UpdateTaskRequestDTO) => {
	return (await axiosInstance.patch<ITask>(`/tasks/${data.id}`, data)).data;
};
