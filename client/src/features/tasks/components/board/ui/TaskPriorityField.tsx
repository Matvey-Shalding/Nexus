'use client';

import { TPriority } from '@/features/tasks/types/Priority';
import { getPriorityStyles, priorityStyles } from '@/features/tasks/utils/getPriorityStyles';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { CheckCheck } from 'lucide-react';
import React from 'react';

import { formatPriority } from '../../../utils/formatPriority';

interface Props {
	selectedPriority: TPriority;
	handlePriorityUpdate: (priority: TPriority) => void;
	isCompleted?: boolean;
}

export const TaskPriorityField: React.FC<Props> = ({ selectedPriority, handlePriorityUpdate, isCompleted = false }) => {
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
				className={cn(
					'flex items-center justify-center rounded-md px-3 py-0.5 text-lg',
					'transition-[background-color,transform,opacity] duration-150',
					'hover:bg-muted/40',
					'active:scale-[0.98]',
					'data-[state=open]:bg-muted/60',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
					isCompleted && 'cursor-not-allowed opacity-60',
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
