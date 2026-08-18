import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

import { useTaskView } from '../store/task.store';
import { ITaskGroup } from '../types/Task';

export const getTaskGroups = async () => {
	const { groupBy, sortBy, sortOrder } = useTaskView.getState();

	const response = await axiosInstance.get<ITaskGroup[]>(ApiRoutes.TASKS, {
		params: {
			group_by: groupBy,
			sort_by: sortBy,
			sort_order: sortOrder,
		},
	});

	return response.data;
};
