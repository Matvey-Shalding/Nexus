'use client';

import { Kanban } from '@/features/tasks';
import { TaskViewSelector } from '@/features/tasks/components/TaskViewSelector';
import { useTaskView } from '@/features/tasks/store/task.store';
import { cn } from '@/lib/utils';
import { Title } from '@/shared/components';
import { useHydration } from '@/shared/hooks/useHydration';
import { Loader } from 'lucide-react';

export default function Page() {
	const { taskView } = useTaskView();

	const hydrated = useHydration();

	if (!hydrated)
		return (
			<div className="h-full flex justify-center items-center">
				<Loader className="animate-spin size-6" />
			</div>
		);

	return (
		<div className={cn('w-full p-6 flex flex-col', taskView === 'list' ? 'max-w-4xl' : 'max-h-screen pb-0')}>
			<div className="flex w-full justify-between items-center">
				<Title title="Tasks">
					<TaskViewSelector />
				</Title>
			</div>
			<Kanban />
		</div>
	);
}
