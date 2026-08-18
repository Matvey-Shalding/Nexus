'use client';

import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback } from 'react';

import { getTaskGroups } from '../api/getTaskGroups';
import { useMoveTask } from '../hooks/useMoveTask';
import { handleDragEnd } from '../services/handleDragEnd';
import { useTaskView } from '../store/task.store';
import { ITaskDragData } from '../types/Task';

import { TaskBoardView } from './board/TaskBoardView';
import { TaskListView } from './list/TaskListView';
import { TaskListLoader } from './list/ui/TaskListLoader';
import { TaskOverlay } from './list/ui/TaskOverlay';

interface Props {
	className?: string;
}
export const Kanban: React.FC<Props> = ({}) => {
	const { groupBy, sortBy, sortOrder } = useTaskView();

	const { data: taskGroups, isLoading } = useQuery({
		queryKey: ['tasks', { groupBy, sortBy, sortOrder }],
		queryFn: getTaskGroups,
	});

	const { moveTask } = useMoveTask();

	const { taskView } = useTaskView();

	const onDragEnd = useCallback(
		(event: any) => {
			handleDragEnd(event, moveTask);
		},
		[moveTask],
	);

	if (isLoading || !taskGroups) return <TaskListLoader />;

	if (taskView === 'board') {
		return <TaskBoardView taskGroups={taskGroups} />;
	} else {
		return (
			<DragDropProvider onDragEnd={onDragEnd}>
				<DragOverlay>{source => <TaskOverlay task={(source.data as ITaskDragData).task} />}</DragOverlay>
				<TaskListView taskGroups={taskGroups} />
			</DragDropProvider>
		);
	}
};
