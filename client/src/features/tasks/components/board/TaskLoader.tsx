import { Skeleton } from '@/shared/ui/skeleton';

export const TaskLoader = () => {
	return (
		<div className="flex gap-x-4">
			{/* Render 3 Column Skeletons */}
			{Array.from({ length: 5 }).map((_, columnIndex) => (
				<div
					key={columnIndex}
					className="flex w-full min-w-78 flex-col gap-y-4 pb-4"
				>
					{/* Column Header */}
					<div className="border-border border-b py-3 pl-2.5 mr-3">
						<Skeleton className="h-7 w-34 rounded-md" />
					</div>
					{/* Column Tasks Container */}
					<div className="flex flex-col gap-y-4">
						{/* Render 3 Task Card Skeletons per column */}
						{Array.from({ length: 7 }).map((_, taskIndex) => (
							<div
								key={taskIndex}
								className="border-border shadow-black/20 flex w-full flex-col gap-y-5 rounded-lg border p-3 shadow-xl"
							>
								{/* Task Top Row: Grip, Checkbox, Title Input */}
								<div className="flex gap-x-2.5">
									<Skeleton className="size-6 rounded-md" />
									<Skeleton className="size-6 rounded-md" />
									<Skeleton className="h-6 w-30 rounded-md" />
								</div>

								{/* Task Bottom Row: Date, Priority, Delete Button */}
								<div className="flex items-center gap-x-2.5">
									{/* Date Badge Skeleton */}
									<Skeleton className="h-7 w-20 rounded-md" />
									{/* Priority Badge Skeleton */}
									<Skeleton className="h-7 w-16 rounded-md" />
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};
