'use client';

import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/Calendar';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import { CheckCheck, ChevronsUpDown, GripVertical, Trash } from 'lucide-react';
import React from 'react';

import { useTaskActions } from '../../hooks/useTaskActions';
import { useTaskController } from '../../hooks/useTaskController';
import { TPriority } from '../../types/Priority';
import { ITask } from '../../types/Task';
import { formatPriority } from '../../utils/formatPriority';
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
			<div className="border-border flex items-center gap-x-1 border-r py-2 pr-1">
				<div className="cursor-grab p-1 rounded-lg transition-colors duration-150">
					<GripVertical className={cn('size-6 text-muted-foreground', task.completed && 'opacity-60')} />
				</div>

				<Checkbox
					checked={task.completed}
					onCheckedChange={checked => updateCompleted(checked)}
					className="size-6 mr-2"
				/>

				<Input
					autoCapitalize="on"
					value={title}
					onChange={e => updateTitle(e.target.value)}
					className={cn(
						'font-heading! rounded-none border-none bg-transparent p-0 text-lg! font-medium transition-colors focus-visible:ring-0',
						task.completed && 'text-muted-foreground decoration-muted-foreground/70 line-through decoration-2',
					)}
				/>
			</div>
			<DropdownMenu
				open={datePopupOpen}
				onOpenChange={setDatePopupOpen}
			>
				<DropdownMenuTrigger
					disabled={task.completed}
					className={cn(
						'border-border w-full border-r flex items-center justify-between p-2.5 group',
						task.completed ? 'opacity-60' : 'hover:bg-muted/40 transition-colors',
					)}
				>
					<span className="font-heading text-lg font-medium">{formattedDate}</span>
					<ChevronsUpDown
						className={cn(
							'text-muted-foreground size-4.5 transition-[transform_color] duration-300',
							datePopupOpen ? 'rotate-180' : 'rotate-0',
							!task.completed && 'group-hover:text-foreground ',
						)}
					/>
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
						'border-border flex items-center group justify-center gap-x-4 border-r py-2 px-2.5',
						task.completed ? 'opacity-60' : ' hover:bg-muted/40 transition-colors',
					)}
				>
					<span
						className={cn(
							'h-full shrink basis-full rounded-lg text-lg transition-colors flex items-center justify-center',
							styleClass,
							task.completed && 'pointer-events-none',
						)}
					>
						{priorityLabel}
					</span>
					<ChevronsUpDown
						className={cn(
							'text-muted-foreground size-4.5 min-w-4.5 transition-[transform_color] duration-300',
							datePopupOpen ? 'rotate-180' : 'rotate-0',
							!task.completed && 'group-hover:text-foreground',
						)}
					/>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					onPointerDown={e => {
						e.preventDefault();
						e.stopPropagation();
					}}
					className="bg-popover/90 flex min-w-44 flex-col gap-2 p-3"
				>
					{Object.keys(priorityStyles).map(key => {
						const priority = Number(key) as TPriority
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
								{formatPriority(priority)}
								{task.priority === priority && <CheckCheck className="absolute right-3 size-4" />}
							</Button>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
			<div
				onClick={() => deleteTask()}
				className="group hover:bg-muted/40 grid place-content-center py-3 transition-colors duration-300"
			>
				<Trash className="group-hover:text-destructive size-6 transition-colors duration-300" />
			</div>
		</TaskLayout>
	);
};
