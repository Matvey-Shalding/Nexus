import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TaskGroupBy, TaskSortBy, TaskSortOrder } from '../types/TaskView';

type TaskView = 'list' | 'board';

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
			groupBy: TaskGroupBy.DEFAULT,
			sortBy: TaskSortBy.DEFAULT,
			sortOrder: TaskSortOrder.ASC,
			taskView: 'list',

			setGroupBy: groupBy => set({ groupBy }),
			setSortBy: sortBy => set({ sortBy }),
			setSortOrder: sortOrder => set({ sortOrder }),
			setTaskView: taskView => set({ taskView }),
		}),
		{
			name: 'task-view-settings',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
