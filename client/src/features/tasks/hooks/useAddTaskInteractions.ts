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
	calendarRef: React.RefObject<HTMLDivElement | null>,
	priorityRef: React.RefObject<HTMLDivElement | null>,
	reset: () => void,
) => {
	const isInsideTask = (target: Node) => {
		return (
			taskRef?.current?.contains(target) ||
			calendarRef?.current?.contains(target) ||
			priorityRef?.current?.contains(target)
		);
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

		document.addEventListener('click', handleClick);

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('click', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [title, priority, date, mode]);
};
