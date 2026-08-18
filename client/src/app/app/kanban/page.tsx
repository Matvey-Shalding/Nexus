import { Kanban } from '@/features/tasks';
import { TaskViewSelector } from '@/features/tasks/components/list/TaskViewSelector';
import { Title } from '@/shared/components';

export default function Page() {
	return (
		<div className="h-full p-6 flex justify-center">
			<div className="flex flex-col max-w-4xl basis-full">
				<div className="flex w-full justify-between items-center">
					<Title title="Tasks">
						<TaskViewSelector />
					</Title>
				</div>
				<Kanban />
			</div>
		</div>
	);
}
