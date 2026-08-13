import { Skeleton } from '@/shared/ui/skeleton';

import { TaskListViewTitle } from '../TaskListViewTitle';

export const TaskListLoader = () => {
	return (
		<div className="flex flex-col gap-y-2">
			<TaskListViewTitle />

			<div className="flex w-full flex-col gap-y-5">
				{Array.from({ length: 3 }).map((_, groupIndex) => (
					<div
						key={groupIndex}
						className="flex w-full flex-col"
					>
						<div className="border-b border-border pb-2 pl-2.5">
							<Skeleton className="h-7 w-30 rounded-md" />
						</div>
						<div className="flex flex-col">
							{Array.from({ length: 3 }).map((_, taskIndex) => (
								<div
									key={taskIndex}
									className="grid min-h-14 w-full grid-cols-[8fr_2.75fr_2.5fr_0.6fr] border-b border-border pl-2.5"
								>
									<div className="flex items-center gap-x-4 border-r border-border py-2 pr-1">
										<Skeleton className="size-6 rounded-md" />
										<Skeleton className="h-6 w-3/5 rounded-md" />
									</div>
									<div className="flex items-center gap-x-2 justify-between border-r border-border py-2 pl-3.5 pr-3">
										<Skeleton className="h-8 basis-3/4 rounded-md" />
										<Skeleton className="size-6 rounded-sm" />
									</div>
									<div className="flex items-center gap-x-2 justify-between border-r border-border py-2 pl-3.5 pr-3">
										<Skeleton className="h-8 basis-3/4 rounded-md" />
										<Skeleton className="size-6 rounded-sm" />
									</div>
									<div className="flex items-center justify-center py-2">
										<Skeleton className="size-7 rounded-lg" />
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
