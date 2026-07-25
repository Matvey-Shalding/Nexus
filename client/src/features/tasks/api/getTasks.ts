import { axiosInstance } from '@/shared/config/axios';

import { useTaskView } from '../store/task.store';
import { IGroupedTasks } from '../types/Task';

export const getTasks = async () => {
	const { groupBy, sortBy, sortOrder } = useTaskView.getState();

	const response = await axiosInstance.get<IGroupedTasks>('/tasks', {
		params: {
			group_by: groupBy,
			sort_by: sortBy,
			sort_order: sortOrder,
		},
	});

	return response.data;
};
