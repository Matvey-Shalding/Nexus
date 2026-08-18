'use client';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Separator } from '@/shared/ui/separator';
import { ChevronDown, Layers3, ListOrdered, MonitorCog, SortAsc } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

import {
	taskGroupByOptions,
	taskSortByOptions,
	taskSortOrderOptions,
	taskViewOptions,
} from '../../config/taskViewConfig';
import { useTaskView } from '../../store/task.store';
import { TASK_VIEW } from '../../types/TaskView';

import { TaskViewFilterSelect } from './TaskViewFilterSelect';

export const TaskViewSelector: React.FC = () => {
	const [open, setOpen] = React.useState(false);

	const { taskView, setTaskView, groupBy, setGroupBy, sortBy, setSortBy, sortOrder, setSortOrder } = useTaskView();

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger
				className={cn(
					'flex items-center gap-2 rounded-lg border border-border px-3 py-2.5',
					'text-sm font-medium',
					'transition-colors duration-150',
					'hover:bg-muted/50',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
					open && 'bg-muted/50',
				)}
			>
				<MonitorCog className="size-4.5 text-muted-foreground" />

				<span className="font-medium">View</span>

				<ChevronDown
					className={cn('size-4 text-muted-foreground transition-transform duration-200', open && 'rotate-180')}
				/>
			</PopoverTrigger>

			<PopoverContent
				align="end"
				sideOffset={8}
				className="w-72 rounded-xl p-4 shadow-xl ring-1 ring-foreground/5"
			>
				<div className="flex flex-col gap-4">
					{/* View */}
					<section className="flex flex-col gap-2">
						<div className="flex items-center justify-between px-0.5">
							<span className="font-heading text-base font-semibold">View</span>
						</div>

						<div className="relative grid grid-cols-2 rounded-xl bg-muted/70 p-1">
							<motion.div
								layout
								animate={{
									x: taskView === TASK_VIEW.BOARD ? '100%' : '0%',
								}}
								transition={{
									type: 'spring',
									stiffness: 500,
									damping: 35,
								}}
								className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg bg-popover/90 shadow-sm"
							/>

							{taskViewOptions.map(option => {
								const isActive = taskView === option.value;

								return (
									<button
										key={option.value}
										type="button"
										onClick={() => setTaskView(option.value)}
										className={cn(
											'relative z-10 flex h-11 items-center justify-center gap-2 rounded-lg',
											'text-sm font-medium',
											'transition-colors duration-150',
											'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
											isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
										)}
									>
										<option.icon className="size-4" />
										<span>{option.label}</span>
									</button>
								);
							})}
						</div>
					</section>

					<Separator />

					{/* Filters */}
					<section className="flex flex-col gap-3">
						<TaskViewFilterSelect
							title="Group by"
							icon={Layers3}
							value={groupBy}
							onChange={setGroupBy}
							options={taskGroupByOptions}
						/>

						<TaskViewFilterSelect
							title="Sort by"
							icon={ListOrdered}
							value={sortBy}
							onChange={setSortBy}
							options={taskSortByOptions}
						/>

						<TaskViewFilterSelect
							title="Order"
							icon={SortAsc}
							value={sortOrder}
							onChange={setSortOrder}
							options={taskSortOrderOptions}
						/>
					</section>
				</div>
			</PopoverContent>
		</Popover>
	);
};
