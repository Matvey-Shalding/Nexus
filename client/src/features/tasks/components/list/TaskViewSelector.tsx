'use client';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Separator } from '@/shared/ui/separator';
import { ChevronDown, Columns3, Layers3, ListOrdered, MonitorCog, Rows3, SortAsc } from 'lucide-react';
import React from 'react';

import { useTaskView } from '../../store/task.store';

export const TaskGroupBy = {
	DEFAULT: 'default',
	PRIORITY: 'priority',
	DUE_DATE: 'due_date',
} as const;

export type TaskGroupBy = (typeof TaskGroupBy)[keyof typeof TaskGroupBy];

export const TaskSortBy = {
	AUTO: 'auto',
	TITLE: 'title',
	PRIORITY: 'priority',
	DUE_DATE: 'due_date',
	CREATED_AT: 'created_at',
} as const;

export type TaskSortBy = (typeof TaskSortBy)[keyof typeof TaskSortBy];

export const TaskSortOrder = {
	ASC: 'asc',
	DESC: 'desc',
} as const;

export type TaskSortOrder = (typeof TaskSortOrder)[keyof typeof TaskSortOrder];

export const TaskViewSelector: React.FC = () => {
	const [open, setOpen] = React.useState(false);

	const { taskView, setGroupBy, setSortBy, setSortOrder, setTaskView, groupBy, sortBy, sortOrder } = useTaskView();

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger className="flex items-center gap-2.5 py-3 px-3 rounded-md border border-border hover:bg-muted/40 transition-colors">
				<MonitorCog className="size-4.5 text-muted-foreground" />
				<span className="text-sm font-medium">Display</span>
				<ChevronDown
					className={cn(
						'size-4.5 text-muted-foreground transition-transform duration-300',
						open ? 'rotate-180' : 'rotate-0',
					)}
				/>
			</PopoverTrigger>

			<PopoverContent
				align="end"
				sideOffset={8}
				className="w-70 rounded-xl p-3 bg-yellow-400!"
			>
				<div className="flex flex-col gap-y-4">
					<div className="flex flex-col gap-y-2.5">
						<span className="font-heading text-lg font-medium">View</span>
						<div
							className={cn(
								'flex items-center justify-center gap-x-2 p-1 bg-muted rounded-2xl transition-[left] duration-200 relative',
								taskView === 'board' && 'left-[calc(50%+4px)]',
							)}
						>
							<div className="h-12 bg-background rounded-xl  absolute w-1/2 top-1/2 -translate-y-1/2 left-1 z-2"></div>
							<div className="flex items-center  justify-center flex-col basis-1/2 h-12 rounded-xl py-1 relative z-3">
								<Rows3 className="size-5" />
								<span className="text-sm font-medium">List</span>
							</div>
							<div className="flex items-center justify-center flex-col basis-1/2 h-12 rounded-xl py-1 relative z-3">
								<Columns3 className="size-5" />
								<span className="text-sm font-medium">Board</span>
							</div>
						</div>
						{/* <ToggleGroup
							value={[taskView]}
							onValueChange={value => setTaskView(value[0] as TaskView)}
							className="
                grid w-full grid-cols-2
                rounded-lg bg-muted/60 p-1
              "
						>
							<ToggleGroupItem
								value={TASK_VIEW.LIST}
								aria-label="List view"
								className="
                  relative gap-2 rounded-md
                  text-muted-foreground
                  transition-all duration-150
                  data-[state=on]:bg-background
                  data-[state=on]:text-foreground
                  data-[state=on]:shadow-sm
                "
							>
								<List className="size-4" />
								<span>List</span>
							</ToggleGroupItem>

							<ToggleGroupItem
								value={TASK_VIEW.BOARD}
								aria-label="Board view"
								className="
                  gap-2 rounded-md
                  text-muted-foreground
                  transition-all duration-150
                  data-[state=on]:bg-background
                  data-[state=on]:text-foreground
                  data-[state=on]:shadow-sm
                "
							>
								<Columns3 className="size-4" />
								<span>Board</span>
							</ToggleGroupItem>
						</ToggleGroup> */}
					</div>

					<Separator />

					{/* Group by */}
					<div className="space-y-2">
						<span className="px-1 text-xs font-medium text-muted-foreground">Group by</span>

						<div className="flex items-center gap-2">
							<div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/40 text-muted-foreground">
								<Layers3 className="size-4" />
							</div>

							<Select defaultValue={TaskGroupBy.DEFAULT}>
								<SelectTrigger className="h-9 flex-1">
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value={TaskGroupBy.DEFAULT}>Default</SelectItem>

									<SelectItem value={TaskGroupBy.PRIORITY}>Priority</SelectItem>

									<SelectItem value={TaskGroupBy.DUE_DATE}>Due date</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Sort by */}
					<div className="space-y-2">
						<span className="px-1 text-xs font-medium text-muted-foreground">Sort by</span>

						<div className="flex items-center gap-2">
							<div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/40 text-muted-foreground">
								<ListOrdered className="size-4" />
							</div>

							<Select defaultValue={TaskSortBy.AUTO}>
								<SelectTrigger className="h-9 flex-1">
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value={TaskSortBy.AUTO}>Automatic</SelectItem>

									<SelectItem value={TaskSortBy.TITLE}>Title</SelectItem>

									<SelectItem value={TaskSortBy.PRIORITY}>Priority</SelectItem>

									<SelectItem value={TaskSortBy.DUE_DATE}>Due date</SelectItem>

									<SelectItem value={TaskSortBy.CREATED_AT}>Created date</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Sort order */}
					<div className="space-y-2">
						<span className="px-1 text-xs font-medium text-muted-foreground">Order</span>

						<div className="flex items-center gap-2">
							<div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/40 text-muted-foreground">
								<SortAsc className="size-4" />
							</div>

							<Select defaultValue={TaskSortOrder.ASC}>
								<SelectTrigger className="h-9 flex-1">
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value={TaskSortOrder.ASC}>Ascending</SelectItem>

									<SelectItem value={TaskSortOrder.DESC}>Descending</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
