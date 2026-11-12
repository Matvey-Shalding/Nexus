'use server';

import { getTaskGroups } from '@/features/tasks/api/getTaskGroups';
import { KanbanPage } from '@/features/tasks/components/KanbanPage';
import { KanbanProvider } from '@/features/tasks/components/KanbanProvider';
import { TASK_GROUP_BY, TASK_SORT_BY, TASK_SORT_ORDER, TASK_VIEW } from '@/features/tasks/types/TaskView';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import z from 'zod';

export default async function Page() {
	const cookie = await cookies();

	const taskView = z.enum(TASK_VIEW).catch(TASK_VIEW.LIST).parse(cookie.get('task-view')?.value);

	const groupBy = z.enum(TASK_GROUP_BY).catch(TASK_GROUP_BY.DEFAULT).parse(cookie.get('group-by')?.value);

	const sortBy = z.enum(TASK_SORT_BY).catch(TASK_SORT_BY.AUTO).parse(cookie.get('sort-by')?.value);

	const sortOrder = z.enum(TASK_SORT_ORDER).catch(TASK_SORT_ORDER.ASC).parse(cookie.get('sort-order')?.value);

	const queryClient = new QueryClient();

	queryClient.query({
		queryKey: ['tasks', { groupBy, sortBy, sortOrder }],
		queryFn: () => getTaskGroups(groupBy, sortBy, sortOrder),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<KanbanProvider
				initialProps={{
					taskView,
					groupBy,
					sortBy,
					sortOrder,
				}}
			>
				<KanbanPage />
			</KanbanProvider>
		</HydrationBoundary>
	);
}
