'use client';

import { formatPriority } from '@/features/tasks/utils/formatPriority';
import { generateID } from '@/features/tasks/utils/generateId';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Checkbox } from '@/shared/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { ChevronsUpDown, GripVertical, Trash } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
interface Props {
	className?: string;
}
export const AddTask: React.FC<Props> = ({}) => {
	const [mode, setMode] = useState<'default' | 'focused'>('default');

	const [title, setTitle] = useState<string>('');

	const priorityNumber = 0;

	const priorityStyles: Record<number, string> = {
		3: 'bg-priority-high-bg text-priority-high-fg hover:bg-priority-high-bg/80',
		2: 'bg-priority-medium-bg text-priority-medium-fg hover:bg-priority-medium-bg/80',
		1: 'bg-priority-low-bg text-priority-low-fg hover:bg-priority-low-bg/80',
		0: 'bg-priority-none-bg text-priority-none-fg hover:bg-priority-none-bg/80',
	};

	const priorityLabel = formatPriority(priorityNumber);
	const styleClass = priorityStyles[priorityNumber] ?? priorityStyles[0];

	const taskId = useMemo(() => generateID(), []);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;

			if (!target) return;

			const taskElement = target.closest(`[data-task-id='${taskId}']`);

			if (!taskElement && mode === 'focused' && title) {
				console.log('CREATING TASK');
			} else {
				console.log('continue');
			}
		};

		window.addEventListener('click', handleClick);

		return () => window.removeEventListener('click', handleClick);
	}, [mode, title, taskId]);

	if (mode === 'default') {
		return (
			<Button
				variant="ghost"
				className="border-border flex min-h-14 items-center justify-start rounded-none border-x-0 border-y py-2 pl-2.5"
				onClick={() => setMode('focused')}
			>
				<span className="text-muted-foreground text-lg">Add task...</span>
			</Button>
		);
	} else {
		return (
			<div className="border-border grid min-h-14 w-full grid-cols-[8fr_2fr_2fr_0.5fr] gap-3.5 border-y pl-2.5">
				<div className="border-border flex items-center gap-x-3 border-r py-2 pr-1">
					<GripVertical className="size-6" />
					<Checkbox className="size-6" />
					<Input
						value={title}
						onChange={e => setTitle(e.target.value)}
						autoFocus
						className="font-heading! rounded-none border-none bg-transparent p-0 text-lg! font-medium focus-visible:ring-0"
					/>
				</div>
				<Popover>
					<PopoverTrigger className="border-border flex w-full items-center justify-between border-r py-2 pr-3 text-lg font-medium transition-colors">
						<span className="font-heading text-lg font-medium">No date</span>
						<ChevronsUpDown className="text-muted-foreground size-4.5" />
					</PopoverTrigger>

					<PopoverContent
						data-task-id={taskId}
						className="bg-popover/95 w-auto rounded-2xl border p-0 shadow-xl backdrop-blur-md"
						align="start"
					>
						<Calendar
							disabled={{ before: new Date() }}
							fixedWeeks
							captionLayout="dropdown"
							weekStartsOn={1}
							showOutsideDays
							mode="single"
							classNames={{
								day_button:
									'transition-all duration-150 hover:bg-accent hover:text-accent-foreground active:scale-95 font-medium size-8.5 pointer-events-all! rounded-xl! data-[selected-single=true]:hover:bg-primary! transition-transform',
								outside: 'pointer-events-none text-muted-foreground/40',
								today: 'rounded-xl! bg-muted border-red!',
							}}
						/>
					</PopoverContent>
				</Popover>
				<DropdownMenu>
					<DropdownMenuTrigger className="border-border flex items-center justify-center gap-x-4 border-r py-1.5 pr-2">
						<Button
							size="sm"
							className={cn('h-full shrink basis-full rounded-lg text-lg transition-colors', styleClass)}
						>
							{priorityLabel}
						</Button>
						<ChevronsUpDown className="text-muted-foreground size-4.5 min-w-4.5" />
					</DropdownMenuTrigger>
					<DropdownMenuContent
						data-task-id={taskId}
						className="bg-popover flex w-40 flex-col gap-y-2 p-4"
					>
						{Object.keys(priorityStyles).map((key: string) => (
							<Button
								key={key}
								size="sm"
								className={cn('min-h-8.5 min-w-25 rounded-lg text-base transition-colors', priorityStyles[+key])}
							>
								{formatPriority(+key)}
							</Button>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<div
					onClick={() => setMode('default')}
					className="group -ml-3.5 grid place-content-center py-3"
				>
					<Trash className="group-hover:text-destructive size-6 transition-colors duration-300" />
				</div>
			</div>
		);
	}
};
