import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { getTaskGroups } from '../api/getTaskGroups';
import { useTaskView } from '../components/KanbanProvider';
import { Board } from '../components/board';
import { List } from '../components/list';
import { useMoveTask } from '../hooks/useMoveTask';
import { handleDragEnd } from '../services/handleDragEnd';
import { TASK_VIEW } from '../types/TaskView';

export const useKanbanController = () => {
	const { groupBy, sortBy, sortOrder, taskView } = useTaskView(state => state);

	const { data: taskGroups, isLoading } = useQuery({
		queryKey: ['tasks', { groupBy, sortBy, sortOrder }],
		queryFn: () => getTaskGroups(groupBy, sortBy, sortOrder),
	});

	const { moveTask } = useMoveTask();

	const onDragEnd = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
