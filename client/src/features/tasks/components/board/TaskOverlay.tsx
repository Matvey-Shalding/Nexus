import { ITask } from '@/features/tasks/types/Task';
import { formatPriority } from '@/features/tasks/utils/formatPriority';
import { getPriorityStyles } from '@/features/tasks/utils/getPriorityStyles';
import { mapDateToClient } from '@/features/tasks/utils/mapDateToClient';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/shared/ui/checkbox';
import { GripVertical } from 'lucide-react';
import React from 'react';

interface Props {
	task: ITask;
}

export const TaskOverlay: React.FC<Props> = ({ task }) => {
	const priorityLabel = formatPriority(task.priority);
	const styleClass = getPriorityStyles(task.priority);
	const date = mapDateToClient(task.due_date);

	return (
		<div className="w-75 rounded-lg border-border border shadow-xl shadow-black/20 flex flex-col gap-y-5 p-3 bg-background">
			<div className="flex gap-x-2.5">
				<div className="flex h-fit items-center gap-x-0.5">
					<div className="cursor-grab px-1 rounded-lg transition-colors duration-150">
						<GripVertical className={cn('size-6 text-muted-foreground', task.completed && 'opacity-60')} />
					</div>

					<Checkbox
						checked={task.completed}
						className="size-6"
					/>
				</div>
				<span
					className={cn(
						'font-heading text-lg/tight font-medium',
						task.completed && 'text-muted-foreground decoration-muted-foreground/70 line-through decoration-2',
					)}
				>
					{task.title}
				</span>
			</div>
			<div className="flex items-center gap-x-2.5">
				<button
					className={cn(
						'grid place-content-center rounded-md border border-border px-3 py-0.5',
						'font-heading text-lg font-medium',
						task.completed && 'opacity-60',
					)}
				>
					{date}
				</button>
				<button
					className={cn(
						'flex items-center justify-center rounded-md px-3 py-0.5 text-lg',
						task.completed && 'opacity-60',
						'transition-[background-color,transform,opacity] duration-150',
						styleClass,
					)}
				>
					{priorityLabel}
				</button>
			</div>
		</div>
	);
};
