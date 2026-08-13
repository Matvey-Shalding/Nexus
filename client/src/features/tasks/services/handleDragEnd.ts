import { DND_KIT_TYPES } from '../config/dnd-kit';
import { ITaskDragData, ITaskGroupDefaultValues, MoveTaskRequest } from '../types/Task';

import { handleCreateMoveTaskRequest } from './handleCreateMoveTaskRequest';

export const handleDragEnd = (event: any, moveTask: (data: MoveTaskRequest) => void) => {
	const source = event.operation.source;

	const target = event.operation.target;

	if (!source || !target) return;

	if (source.type !== DND_KIT_TYPES.TASK || target.type !== DND_KIT_TYPES.COLUMN) return;

	const taskId = Number(source.id);

	const targetGroupId = target.id;

	const draggedTaskData: ITaskDragData = source.data satisfies ITaskDragData;

	const defaults: ITaskGroupDefaultValues | null = target.data.defaults satisfies ITaskGroupDefaultValues | null;

	const updateData = handleCreateMoveTaskRequest(taskId, targetGroupId, defaults);

	moveTask({ updateData, targetGroupId, draggedTaskData });
};
