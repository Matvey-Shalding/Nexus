'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getTaskGroups } from '../api/getTaskGroups';
import { useTaskView } from '../store/task.store';

import { TaskBoardView } from './board/TaskBoardView';
import { TaskListView } from './list/TaskListView';

interface Props {
	className?: string;
}
export const Kanban: React.FC<Props> = ({}) => {
	const { data: taskGroups } = useQuery({
		queryKey: ['tasks'],
		queryFn: getTaskGroups,
	});

	const { taskView } = useTaskView();

	if (!taskGroups) return 'Loading...';

	if (taskView === 'board') {
		return <TaskBoardView taskGroups={taskGroups} />;
	} else {
		return <TaskListView taskGroups={taskGroups} />;
	}
};
