import { TaskListLoader } from '@/features/tasks/components/list/ui/TaskListLoader';
import { Title } from '@/shared/components';

function Loading({}) {
	return (
		<div className="flex h-full flex-col p-6">
			<Title title="Tasks" />
			<TaskListLoader />
		</div>
	);
}

export default Loading;
