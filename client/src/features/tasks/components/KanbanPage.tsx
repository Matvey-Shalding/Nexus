'use client'

import { Kanban } from '@/features/tasks';
import { TaskViewSelector } from '@/features/tasks/components/TaskViewSelector';
import { cn } from '@/lib/utils';
import { Title } from '@/shared/components';

import { useTaskView } from './KanbanProvider';

export const KanbanPage = () => {
	const taskView = useTaskView(s => s.taskView);

	return (
		<div className={cn('w-full p-6 flex flex-col', taskView === 'list' ? 'max-w-4xl' : 'max-h-screen pb-0')}>
			<div className="flex w-full it justify-between items-center">
				<Title title="Tasks">
					<TaskViewSelector />
				</Title>
			</div>

			<Kanban />
		</div>
	);
};
