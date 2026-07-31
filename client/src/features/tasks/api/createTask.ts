import { axiosInstance } from '@/shared/config';
import { CreateTaskRequest, ITask } from '../types/Task';

export const createTask = async (data: CreateTaskRequest) => {
	return (await axiosInstance.post<ITask>('/tasks', data)).data;
};
