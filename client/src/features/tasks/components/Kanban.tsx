'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getTasks } from '../api/getTasks';
import { useTaskView } from '../store/task.store';
import { TaskBoardView } from './board/TaskBoardView';
import { TaskListView } from './list/TaskListView';
interface Props {
	className?: string;
}
export const Kanban: React.FC<Props> = ({}) => {
	const { data: tasks } = useQuery({
		queryKey: ['tasks'],
		queryFn: getTasks,
	});

	const { taskView } = useTaskView();

	if (!tasks) return 'Loading...';

	if (taskView === 'board') {
		return <TaskBoardView tasks={tasks} />;
	} else {
		return <TaskListView tasks={tasks} />;
	}
};
