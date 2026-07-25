import { Kanban } from '@/features/tasks';
import { getTasks } from '@/features/tasks/api/getTasks';
import { getQueryClient } from '@/lib/getQueryClient';
import { Hydrate, Title } from '@/shared/components';
import { dehydrate } from '@tanstack/react-query';

export default async function Page() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['tasks'],
		queryFn: getTasks,
	});

	return (
		<div className="flex h-full flex-col p-6">
			<Title title="Tasks" />
			<Hydrate state={dehydrate(queryClient)}>
				<Kanban />
			</Hydrate>
		</div>
	);
}
