import { useEffect } from 'react';

import { TPriority } from '../types/Priority';
import { CreateTaskDraft } from '../types/Task';

import { AddTaskMode } from './useAddTaskDraft';

export const useAddTaskInteractions = (
	taskRef: React.RefObject<HTMLDivElement | null>,
	title: string,
	mode: AddTaskMode,
	date: Date | undefined,
	priority: TPriority,
	createTask: (data: CreateTaskDraft) => void,
	reset: () => void,
) => {
	const isInsideTask = (target: Node) => {
		return taskRef?.current?.contains(target);
	};

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const target = event.target as Node;

			if (!isInsideTask(target) && title && mode !== 'default') {
				createTask({ title, date, priority });
			}

			if (!isInsideTask(target) && mode === 'focused') {
				reset();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && title && mode !== 'default') {
				createTask({ title, date, priority });
			}
		};

		document.addEventListener('mousedown', handleClick);

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [title, priority, date, mode]);
};
