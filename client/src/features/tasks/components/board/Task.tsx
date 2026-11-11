'use client';

import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/Calendar';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { Textarea } from '@/shared/ui/textarea';
import { CheckCheck, GripVertical, Trash } from 'lucide-react';
import React from 'react';

import { useTaskActions } from '../../hooks/useTaskActions';
import { useTaskController } from '../../hooks/useTaskController';
import { TPriority } from '../../types/Priority';
import { ITask } from '../../types/Task';
import { getPriorityStyles, priorityStyles } from '../../utils/getPriorityStyles';

import { TaskLayout } from './TaskLayout';

interface Props {
	className?: string;
	task: ITask;
	groupId: string;
}
export const Task: React.FC<Props> = ({ task, groupId }) => {
	const {
		ref,
		isDragging,
		updateTitle,
		title,
		prevServerTitle,
		setPrevServerTitle,
		formattedDate,
		datePopupOpen,
		setDatePopupOpen,
		priorityLabel,
		styleClass,
		priorityPopupOpen,
		setPriorityPopupOpen,
	} = useTaskController(task, groupId);

	const { updateDate, updatePriority, updateCompleted, deleteTask } = useTaskActions(
		task,
		setDatePopupOpen,
		setPriorityPopupOpen,
		updateTitle,
		prevServerTitle,
		setPrevServerTitle,
		title,
	);

	return (
		<TaskLayout
			isDragging={isDragging}
			ref={ref}
			isCompleted={task.completed}
		>
			<div className="flex gap-x-2.5">
				<div className="flex h-fit items-center gap-x-0.5">
					<div className="cursor-grab px-1 rounded-lg transition-colors duration-150">
						<GripVertical className={cn('size-6 text-muted-foreground', task.completed && 'opacity-60')} />
					</div>

					<Checkbox
						checked={task.completed}
						onCheckedChange={updateCompleted}
						className="size-6"
					/>
				</div>

				<Textarea
					autoCapitalize="on"
					value={title}
					onChange={e => updateTitle(e.target.value)}
					className={cn(
						'font-heading! rounded-none border-none bg-transparent p-0 text-lg/tight! font-medium transition-colors focus-visible:ring-0 align-middle',
						task.completed && 'text-muted-foreground decoration-muted-foreground/70 line-through decoration-2',
					)}
				/>
			</div>
			<div className="flex items-center justify-between basis-full">
				<div className="flex items-center gap-x-2.5">
					<DropdownMenu
						open={datePopupOpen}
						onOpenChange={setDatePopupOpen}
					>
						<DropdownMenuTrigger
							disabled={task.completed}
							className={cn(
								'grid place-content-center rounded-md border border-border px-3 py-0.5',
								'font-heading text-lg font-medium',
								'transition-[background-color,transform,opacity] duration-150',
								'hover:bg-muted/40',
								'active:scale-[0.98]',
								'data-[state=open]:bg-muted/60',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
								task.completed && 'cursor-not-allowed opacity-60',
							)}
						>
							<span>{formattedDate}</span>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							onPointerDown={e => {
								e.preventDefault();
								e.stopPropagation();
							}}
							className="w-auto p-0"
							align="start"
						>
							<Calendar
								selected={task.due_date ? new Date(task.due_date) : undefined}
								onSelect={updateDate}
							/>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu
						open={priorityPopupOpen}
						onOpenChange={setPriorityPopupOpen}
					>
						<DropdownMenuTrigger
							disabled={task.completed}
							className={cn(
								'flex items-center justify-center rounded-md px-3 py-0.5 text-lg',
								'transition-[background-color,transform,opacity] duration-150',
								'hover:bg-muted/40',
								'active:scale-[0.98]',
								'data-[state=open]:bg-muted/60',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
								task.completed && 'cursor-not-allowed opacity-60',
								styleClass,
							)}
						>
							<span>{priorityLabel}</span>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							onPointerDown={e => {
								e.preventDefault();
								e.stopPropagation();
							}}
							className="bg-popover/90 flex min-w-44 flex-col gap-2 p-3"
						>
							{Object.keys(priorityStyles).map(key => {
								const priority = Number(key) as TPriority;

								return (
									<Button
										key={key}
										size="sm"
										onClick={() => updatePriority(priority)}
										className={cn(
											'relative justify-start rounded-lg px-3 pr-9 text-base transition-colors',
											getPriorityStyles(priority),
										)}
									>
										{priorityLabel}

										{task.priority === priority && <CheckCheck className="absolute right-3 size-4" />}
									</Button>
								);
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<Trash
					onClick={() => deleteTask()}
					className="
						size-6
						text-muted-foreground
						transition-[color,transform] duration-150
						hover:text-destructive
						hover:scale-105
						active:scale-95
					"
				/>
			</div>
		</TaskLayout>
	);
};
