import { Kanban } from '@/features/tasks';
import { getTaskGroups } from '@/features/tasks/api/getTaskGroups';
import { getQueryClient } from '@/lib/getQueryClient';
import { Title } from '@/shared/components';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function Page() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['tasks'],
		queryFn: getTaskGroups,
	});

	return (
		<div className="flex h-full flex-col p-6">
			<Title title="Tasks" />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Kanban />
			</HydrationBoundary>
		</div>
	);
}
