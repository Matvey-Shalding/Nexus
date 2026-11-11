import Cookie from 'js-cookie';
import { createStore } from 'zustand';

import { TaskGroupBy, TaskSortBy, TaskSortOrder, TaskView } from '../types/TaskView';

export interface TaskViewProps {
	groupBy: TaskGroupBy;
	sortBy: TaskSortBy;
	sortOrder: TaskSortOrder;
	taskView: TaskView;
}

export interface TaskViewState extends TaskViewProps {
	setGroupBy: (groupBy: TaskGroupBy) => void;
	setSortBy: (sortBy: TaskSortBy) => void;
	setSortOrder: (sortOrder: TaskSortOrder) => void;
	setTaskView: (taskView: TaskView) => void;
}

export const createTaskStore = (initialTaskStore: TaskViewProps) => {
	return createStore<TaskViewState>()(set => ({
		...initialTaskStore,
		setGroupBy: groupBy => {
			set({ groupBy });
			Cookie.set('group-by', groupBy);
		},
		setSortBy: sortBy => {
			set({ sortBy });
			Cookie.set('sort-by', sortBy);
		},
		setSortOrder: sortOrder => {
			set({ sortOrder });
			Cookie.set('sort-order', sortOrder);
		},
		setTaskView: taskView => {
			set({ taskView });
			Cookie.set('task-view', taskView);
		},
	}));
};

export type TaskStore = ReturnType<typeof createTaskStore>;
