import { TaskListLoader } from '@/features/tasks/components/list/ui/TaskListLoader';
import { Title } from '@/shared/components';

function Loading({}) {
	return (
		<div className="h-full p-6 flex justify-center">
			<div className="flex flex-col max-w-4xl basis-full">
				<Title title="Tasks" />
				<TaskListLoader />
			</div>
		</div>
	);
}

export default Loading;
