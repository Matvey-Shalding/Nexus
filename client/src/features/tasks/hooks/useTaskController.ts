import { useDraggable } from '@dnd-kit/react';
import { useState } from 'react';

import { DND_KIT_TYPES } from '../config/dnd-kit';
import { ITask, ITaskDragData } from '../types/Task';
import { formatPriority } from '../utils/formatPriority';
import { getPriorityStyles } from '../utils/getPriorityStyles';
import { mapDateToClient } from '../utils/mapDateToClient';

export const useTaskController = (task: ITask, groupId: string) => {
	const [title, updateTitle] = useState<string>(task.title);

	const [prevServerTitle, setPrevServerTitle] = useState(task.title);

	const formattedDate = mapDateToClient(task.due_date);

  const [datePopupOpen, setDatePopupOpen] = useState(false);

  const [priorityPopupOpen, setPriorityPopupOpen] = useState(false);

	const priorityLabel = formatPriority(task.priority);
	const styleClass = getPriorityStyles(task.priority);


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
		updateTitle,
		title,
		prevServerTitle,
		setPrevServerTitle,
		formattedDate,
		datePopupOpen,
		setDatePopupOpen,
		priorityLabel,
		styleClass,
		priorityPopupOpen,
		setPriorityPopupOpen,
	};
};
