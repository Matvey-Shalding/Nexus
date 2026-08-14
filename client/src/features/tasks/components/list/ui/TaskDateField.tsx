'use client';

import { mapDateToClient } from '@/features/tasks/utils/mapDateToClient';
import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/Calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import React, { RefObject, useState } from 'react';

interface Props {
	selectedDate: Date | undefined;
	handleDateUpdate: (date: Date | undefined) => void;
	calendarRef?: RefObject<HTMLDivElement | null>;
	isCompleted?: boolean;
}
export const TaskDateField: React.FC<Props> = ({
	selectedDate,
	calendarRef,
	handleDateUpdate,
	isCompleted = false,
}) => {
	const date = mapDateToClient(selectedDate);

	const [open, setOpen] = useState(false);

	const handleSelect = (date: Date | undefined) => {
		handleDateUpdate(date);
		setOpen(false);
	};

	return (
		<DropdownMenu
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenuTrigger
				disabled={isCompleted}
				className={cn(
					'border-border w-full border-r flex items-center justify-between p-2.5 group',
					isCompleted ? 'opacity-60' : 'hover:bg-muted/40 transition-colors',
				)}
			>
				<span className="font-heading text-lg font-medium">{date}</span>
				<ChevronsUpDown
					className={cn(
						'text-muted-foreground size-4.5 transition-[transform_color] duration-300',
						open ? 'rotate-180' : 'rotate-0',
						!isCompleted && 'group-hover:text-foreground ',
					)}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				ref={calendarRef}
				className="w-auto p-0"
				align="start"
			>
				<Calendar
					selected={selectedDate}
					onSelect={handleSelect}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
