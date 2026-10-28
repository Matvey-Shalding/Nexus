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
	updatePriority: (priority: TPriority) => void;
	isCompleted?: boolean;
}

export const TaskPriorityField: React.FC<Props> = ({ selectedPriority, updatePriority, isCompleted = false }) => {
	const priorityLabel = formatPriority(selectedPriority);
	const styleClass = getPriorityStyles(selectedPriority);

	const [isOpen, setIsOpen] = React.useState(false);

	const handleSelect = (priority: TPriority) => {
		setIsOpen(false);
		updatePriority(priority);
	};

	return (
		<DropdownMenu
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DropdownMenuTrigger
				disabled={isCompleted}
				className={cn(
					'border-border flex items-center group justify-center gap-x-4 border-r py-2 px-2.5',
					isCompleted ? 'opacity-60' : ' hover:bg-muted/40 transition-colors',
				)}
			>
				<span
					className={cn(
						'h-full shrink basis-full rounded-lg text-lg transition-colors flex items-center justify-center',
						styleClass,
						isCompleted && 'pointer-events-none',
					)}
				>
					{priorityLabel}
				</span>
				<ChevronsUpDown
					className={cn(
						'text-muted-foreground size-4.5 min-w-4.5 transition-[transform_color] duration-300',
						isOpen ? 'rotate-180' : 'rotate-0',
						!isCompleted && 'group-hover:text-foreground',
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
