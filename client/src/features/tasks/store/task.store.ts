import Cookies from 'js-cookie';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

import {
	TASK_GROUP_BY,
	TASK_SORT_BY,
	TASK_SORT_ORDER,
	TaskGroupBy,
	TaskSortBy,
	TaskSortOrder,
	TaskView,
} from '../types/TaskView';

const cookieStorage: StateStorage = {
	getItem: (name: string) => {
		return Cookies.get(name) ?? null;
	},

	setItem: (name: string, value: string) => {
		Cookies.set(name, value);
	},

	removeItem: (name: string) => {
		Cookies.remove(name);
	},
};

interface TaskViewState {
	groupBy: TaskGroupBy;
	sortBy: TaskSortBy;
	sortOrder: TaskSortOrder;
	taskView: TaskView;
	setGroupBy: (groupBy: TaskGroupBy) => void;
	setSortBy: (sortBy: TaskSortBy) => void;
	setSortOrder: (sortOrder: TaskSortOrder) => void;
	setTaskView: (taskView: TaskView) => void;
}

export const useTaskView = create<TaskViewState>()(
	persist(
		set => ({
			groupBy: TASK_GROUP_BY.DEFAULT,
			sortBy: TASK_SORT_BY.AUTO,
			sortOrder: TASK_SORT_ORDER.ASC,
			taskView: 'list',

			setGroupBy: groupBy => set({ groupBy }),
			setSortBy: sortBy => set({ sortBy }),
			setSortOrder: sortOrder => set({ sortOrder }),
			setTaskView: taskView => set({ taskView }),
		}),
		{
			name: 'task-view',
			storage: createJSONStorage(() => cookieStorage),
		},
	),
);
