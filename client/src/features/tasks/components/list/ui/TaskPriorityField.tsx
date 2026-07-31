'use client';

import { TPriority } from '@/features/tasks/types/Priority';
import { getPriorityStyles, priorityStyles } from '@/features/tasks/utils/getPriorityStyles';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { CheckCheck, ChevronsUpDown } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import { formatPriority } from '../../../utils/formatPriority';

interface Props {
	selectedPriority: TPriority;
	setSelectedPriority: Dispatch<SetStateAction<TPriority>>;
	priorityRef?: React.RefObject<HTMLDivElement | null>;
}

export const TaskPriorityField: React.FC<Props> = ({ selectedPriority, setSelectedPriority, priorityRef }) => {
	const priorityLabel = formatPriority(selectedPriority);
	const styleClass = getPriorityStyles(selectedPriority);

	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		setOpen(false);
	}, [selectedPriority]);

	return (
		<DropdownMenu
			open={open}
			onOpenChange={setOpen}
		>
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
				ref={priorityRef}
				className="bg-popover flex min-w-44 flex-col gap-2 p-3"
			>
				{Object.keys(priorityStyles).map(key => {
					const priority = Number(key) as TPriority;

					return (
						<Button
							key={key}
							size="sm"
							onClick={() => setSelectedPriority(priority)}
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
