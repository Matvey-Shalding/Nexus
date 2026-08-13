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
			<DropdownMenuTrigger className="border-border w-full border-r hover:bg-muted/40 pl-3.5 group">
				<button
					disabled={isCompleted}
					className="flex min-h-full w-full items-center justify-between py-2 pr-3"
				>
					<span className="font-heading text-lg font-medium">{date}</span>
					<ChevronsUpDown
						className={cn(
							'text-muted-foreground group-hover:text-foreground size-4.5 transition-[transform_color] duration-300',
							open ? 'rotate-180' : 'rotate-0',
						)}
					/>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				ref={calendarRef}
				className="w-auto p-0"
				// className="bg-popover/95 w-auto rounded-2xl border p-0 shadow-xl backdrop-blur-md"
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
