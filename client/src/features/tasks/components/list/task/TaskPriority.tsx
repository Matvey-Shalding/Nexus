'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { formatPriority } from '../../../utils/formatPriority';

interface Props {
	className?: string;
	priorityNumber: number;
}

// Dynamic mapping object using your theme variables
const priorityStyles: Record<number, string> = {
	3: 'bg-priority-high-bg text-priority-high-fg hover:bg-priority-high-bg/80',
	2: 'bg-priority-medium-bg text-priority-medium-fg hover:bg-priority-medium-bg/80',
	1: 'bg-priority-low-bg text-priority-low-fg hover:bg-priority-low-bg/80',
	0: 'bg-priority-none-bg text-priority-none-fg hover:bg-priority-none-bg/80',
};

export const TaskPriority: React.FC<Props> = ({ priorityNumber, className }) => {
	const priorityLabel = formatPriority(priorityNumber);
	const styleClass = priorityStyles[priorityNumber] ?? priorityStyles[0];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="border-border flex items-center justify-center gap-x-4 border-r py-1.5 pr-2">
				<Button
					size="sm"
					className={cn('h-full shrink basis-full rounded-lg text-lg transition-colors', styleClass, className)}
				>
					{priorityLabel}
				</Button>
				<ChevronsUpDown className="text-muted-foreground size-4.5 min-w-4.5" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-popover flex w-40 flex-col gap-y-2 p-4">
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
	);
};
