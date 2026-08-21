import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { getTaskGroups } from '../api/getTaskGroups';
import { Board } from '../components/board';
import { List } from '../components/list';
import { useMoveTask } from '../hooks/useMoveTask';
import { handleDragEnd } from '../services/handleDragEnd';
import { useTaskView } from '../store/task.store';
import { TASK_VIEW } from '../types/TaskView'

export const useKanbanController = () => {
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

	const View = useMemo(() => {
		if (taskView === TASK_VIEW.BOARD) return Board;
		return List;
	}, [taskView]);

	return {
		taskGroups,
		isLoading,
		onDragEnd,
		View,
	};
};
