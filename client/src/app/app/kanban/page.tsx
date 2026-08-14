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
		<div className="h-full p-6 flex justify-center">
			<div className="flex flex-col max-w-4xl basis-full">
				<Title title="Tasks" />
				<HydrationBoundary state={dehydrate(queryClient)}>
					<Kanban />
				</HydrationBoundary>
			</div>
		</div>
	);
}
