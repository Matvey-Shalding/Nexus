import { DragEndEvent } from '@dnd-kit/react';

import { DND_KIT_TYPES } from '../config/dnd-kit';
import { ITaskDragData, ITaskGroupDefaultValues, MoveTaskRequest } from '../types/Task';

import { handleCreateMoveTaskRequest } from './handleCreateMoveTaskRequest';

export const handleDragEnd = (event: DragEndEvent, moveTask: (data: MoveTaskRequest) => void) => {
	const source = event.operation.source;

	const target = event.operation.target;

	if (!source || !target) return;

	if (source.type !== DND_KIT_TYPES.TASK || target.type !== DND_KIT_TYPES.COLUMN) return;

	const taskId = Number(source.id);

	const targetGroupId = String(target.id);

	const draggedTaskData = source.data as ITaskDragData;

	const sourceGroupId = draggedTaskData.groupId;

	if (targetGroupId === sourceGroupId) return;

	const defaults: ITaskGroupDefaultValues | null = target.data.defaults satisfies ITaskGroupDefaultValues | null;

	const updateData = handleCreateMoveTaskRequest(draggedTaskData.task, targetGroupId, sourceGroupId, defaults);

	moveTask({ updateData, targetGroupId, draggedTaskData });
};
