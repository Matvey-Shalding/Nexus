import { axiosInstance } from '@/shared/config'

export const deleteTask = (taskId: number) => axiosInstance.delete(`/tasks/${taskId}`);
