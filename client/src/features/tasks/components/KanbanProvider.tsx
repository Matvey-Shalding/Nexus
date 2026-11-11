'use client';

import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { useStore } from 'zustand';

import { TaskStore, TaskViewProps, TaskViewState, createTaskStore } from '../store/task.store';

interface Props {
	initialProps: TaskViewProps;
	children?: ReactNode;
}

const TaskStoreContext = createContext<TaskStore | null>(null);

export const KanbanProvider: FC<Props> = ({ initialProps, children }) => {
	const [store] = useState<TaskStore | null>(() => createTaskStore(initialProps));

	return <TaskStoreContext.Provider value={store}>{children}</TaskStoreContext.Provider>;
};

export function useTaskView<T>(selector: (state: TaskViewState) => T): T {
	const store = useContext(TaskStoreContext);
	if (!store) {
		throw new Error('useTaskStore must be used within a KanbanProvider');
	}
	return useStore(store, selector);
}
