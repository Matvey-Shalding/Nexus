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
		<div
			className={cn(
				'grid h-15 w-full',
				'grid-cols-[8fr_2.75fr_2.25fr]',
				'gap-3.5',
				'overflow-hidden',
				'rounded-lg',
				'border border-border/70',
				'bg-background',
				'shadow-xl shadow-black/20',
				'ring-1 ring-black/5',
				'cursor-grabbing',
				'select-none',
			)}
		>
			{/* Task */}
			<div className={cn('border-border/60', 'flex items-center gap-x-3', 'border-r', 'py-2 pr-1 pl-2.5')}>
				<GripVertical className="text-muted-foreground/60 size-6 shrink-0" />

				<Checkbox
					checked={task.completed}
					disabled
					className="pointer-events-none size-6 opacity-60"
				/>

				<span className="font-heading truncate text-lg font-medium text-muted-foreground">{task.title}</span>
			</div>

			{/* Date */}
			<div className={cn('border-border/60', 'flex min-h-full items-center', 'border-r', 'py-2 pr-3')}>
				<span className="font-heading truncate text-lg font-medium text-muted-foreground">{date}</span>
			</div>

			{/* Priority */}
			<div
				className={cn('border-border/60', 'flex items-center justify-center', 'border-r', 'py-1.5 pr-2', 'opacity-70')}
			>
				<div
					className={cn(
						'grid h-full w-full place-items-center',
						'rounded-lg',
						'text-lg',
						'pointer-events-none',
						styleClass,
					)}
				>
					{priorityLabel}
				</div>
			</div>
		</div>
	);
};
