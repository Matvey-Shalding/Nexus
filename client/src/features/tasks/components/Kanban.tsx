'use client';

import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

import { getTaskGroups } from '../api/getTaskGroups';
import { useMoveTask } from '../hooks/useMoveTask';
import { handleDragEnd } from '../services/handleDragEnd';
import { useTaskView } from '../store/task.store';
import { ITaskDragData } from '../types/Task';

import { TaskBoardView } from './board/TaskBoardView';
import { TaskListView } from './list/TaskListView';
import { TaskOverlay } from './list/ui/TaskOverlay';

interface Props {
	className?: string;
}
export const Kanban: React.FC<Props> = ({}) => {
	const { data: taskGroups } = useSuspenseQuery({
		queryKey: ['tasks'],
		queryFn: getTaskGroups,
	});

	const { moveTask } = useMoveTask();

	const { taskView } = useTaskView();

	if (!taskGroups) return 'Loading...';

	if (taskView === 'board') {
		return <TaskBoardView taskGroups={taskGroups} />;
	} else {
		return (
			<DragDropProvider onDragEnd={event => handleDragEnd(event, moveTask)}>
				<DragOverlay dropAnimation={null}>
					{source => <TaskOverlay task={(source.data as ITaskDragData).task} />}
				</DragOverlay>
				<TaskListView taskGroups={taskGroups} />
			</DragDropProvider>
		);
	}
};
