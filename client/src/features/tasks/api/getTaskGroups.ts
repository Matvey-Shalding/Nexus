import { axiosInstance } from '@/shared/config/axios';

import { useTaskView } from '../store/task.store';
import { ITaskGroup } from '../types/Task';

export const getTaskGroups = async () => {
	const { groupBy, sortBy, sortOrder } = useTaskView.getState();

	const response = await axiosInstance.get<ITaskGroup[]>('/tasks', {
		params: {
			group_by: groupBy,
			sort_by: sortBy,
			sort_order: sortOrder,
		},
	});

	return response.data;
};
