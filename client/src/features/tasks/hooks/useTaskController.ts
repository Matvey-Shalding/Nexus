import { useDraggable } from '@dnd-kit/react';
import { useState } from 'react';

import { DND_KIT_TYPES } from '../config/dnd-kit';
import { TPriority } from '../types/Priority';
import { ITask, ITaskDragData } from '../types/Task';
import { mapDateToServer } from '../utils/mapDateToServer';

import { useDeleteTask } from './useDeleteTask';
import { useUpdateTask } from './useUpdateTask';
import { useUpdateTaskTitle } from './useUpdateTaskTitle';

export const useTaskController = (task: ITask, groupId: string) => {
	const [title, updateTitle] = useState<string>(task.title);

	const [prevServerTitle, setPrevServerTitle] = useState(task.title);

	const { updateTask } = useUpdateTask();

	if (prevServerTitle != task.title) {
		updateTitle(task.title);
		setPrevServerTitle(task.title);
	}

	const updateDate = (date: Date | undefined) => {
		updateTask({ id: task.id, due_date: mapDateToServer(date) });
	};

	const updatePriority = (priority: TPriority) => {
		updateTask({ id: task.id, priority });
	};

	const updateCompleted = (completed: boolean) => {
		updateTask({ id: task.id, completed });
	};

	useUpdateTaskTitle(title, task.title, updateTask, task.id);

	const { ref, isDragging } = useDraggable({
		id: task.id,
		type: DND_KIT_TYPES.TASK,
		data: {
			task,
			groupId,
		} satisfies ITaskDragData,
	});

	const { deleteTask } = useDeleteTask(task.id);

	return {
		ref,
		isDragging,
		deleteTask,
		updateTitle,
		updateCompleted,
		updateDate,
		updatePriority,
		title,
	};
};
