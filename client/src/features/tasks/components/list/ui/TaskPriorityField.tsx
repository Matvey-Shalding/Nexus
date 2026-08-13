'use client';

import { TPriority } from '@/features/tasks/types/Priority';
import { getPriorityStyles, priorityStyles } from '@/features/tasks/utils/getPriorityStyles';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { CheckCheck, ChevronsUpDown } from 'lucide-react';
import React from 'react';

import { formatPriority } from '../../../utils/formatPriority';

interface Props {
	selectedPriority: TPriority;
	priorityRef?: React.RefObject<HTMLDivElement | null>;
	handlePriorityUpdate: (priority: TPriority) => void;
	isCompleted?: boolean;
}

export const TaskPriorityField: React.FC<Props> = ({
	selectedPriority,
	priorityRef,
	handlePriorityUpdate,
	isCompleted = false,
}) => {
	const priorityLabel = formatPriority(selectedPriority);
	const styleClass = getPriorityStyles(selectedPriority);

	const [open, setOpen] = React.useState(false);

	const handleSelect = (priority: TPriority) => {
		setOpen(false);
		handlePriorityUpdate(priority);
	};

	return (
		<DropdownMenu
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenuTrigger
				disabled={isCompleted}
				className="border-border flex items-center group justify-center hover:bg-muted/40  gap-x-4 border-r py-1.5 pl-3.5 pr-2"
			>
				<Button
					size="sm"
					className={cn(
						'h-full shrink basis-full rounded-lg text-lg transition-colors',
						styleClass,
						isCompleted && 'pointer-events-none cursor-not-allowed opacity-60',
					)}
				>
					{priorityLabel}
				</Button>
				<ChevronsUpDown
					className={cn(
						'text-muted-foreground size-4.5 min-w-4.5 transition-[transform_color] duration-300 group-hover:text-foreground',
						open ? 'rotate-180' : 'rotate-0',
					)}
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				ref={priorityRef}
				className="bg-popover/90 flex min-w-44 flex-col gap-2 p-3"
			>
				{Object.keys(priorityStyles).map(key => {
					const priority = Number(key) as TPriority;

					return (
						<Button
							key={key}
							size="sm"
							onClick={() => handleSelect(priority)}
							className={cn(
								'relative justify-start rounded-lg px-3 pr-9 text-base transition-colors',
								getPriorityStyles(priority),
							)}
						>
							{formatPriority(priority)}

							{selectedPriority === priority && <CheckCheck className="absolute right-3 size-4" />}
						</Button>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
