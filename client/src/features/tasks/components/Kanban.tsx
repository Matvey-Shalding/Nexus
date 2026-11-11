'use client';

import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import React from 'react';

import { useKanbanController } from '../hooks/useKanbanController';
import { ITaskDragData } from '../types/Task';

export const Kanban: React.FC = () => {
	const { taskGroups, isLoading, onDragEnd, View } = useKanbanController();

	if (isLoading || !taskGroups) return <View.TaskLoader />;
	return (
		<DragDropProvider onDragEnd={onDragEnd}>
			<DragOverlay>{source => <View.TaskOverlay task={(source.data as ITaskDragData).task} />}</DragOverlay>
			<View.TaskView taskGroups={taskGroups} />
		</DragDropProvider>
	);
};
