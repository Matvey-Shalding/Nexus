import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

import { ITaskGroup } from '../types/Task';
import { TaskGroupBy, TaskSortBy, TaskSortOrder } from '../types/TaskView';

export const getTaskGroups = async (groupBy: TaskGroupBy,sortBy: TaskSortBy,sortOrder: TaskSortOrder) => {
	const response = await axiosInstance.get<ITaskGroup[]>(ApiRoutes.TASKS, {
		params: {
			group_by: groupBy,
			sort_by: sortBy,
			sort_order: sortOrder,
		},
	});

	return response.data;
};
