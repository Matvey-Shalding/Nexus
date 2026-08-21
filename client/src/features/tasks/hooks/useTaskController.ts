import { useDraggable } from '@dnd-kit/react';

import { DND_KIT_TYPES } from '../config/dnd-kit';
import { ITask, ITaskDragData } from '../types/Task';

import { useTaskActions } from './useTaskActions';
import { useTaskDraft } from './useTaskDraft';

export const useTaskController = (task: ITask, groupId: string) => {
	const { title, setTitle, date, setDate, priority, setPriority, isCompleted, setIsCompleted } = useTaskDraft(
		task.title,
		task.due_date,
		task.priority,
		task.completed,
	);

	const { handleTitleUpdate, handlePriorityUpdate, handleDateUpdate, deleteTask, handleCompletedUpdate } =
		useTaskActions(task.id, title, setTitle, setDate, setPriority, setIsCompleted);

	const { ref, isDragging } = useDraggable({
		id: task.id,
		type: DND_KIT_TYPES.TASK,
		data: {
			task,
			groupId,
		} satisfies ITaskDragData,
	});

	return {
		ref,
		isDragging,
		isCompleted,
		handleCompletedUpdate,
		title,
		handleTitleUpdate,
		selectedDate: date,
		handleDateUpdate,
		selectedPriority: priority,
		handlePriorityUpdate,
		deleteTask,
	};
};
