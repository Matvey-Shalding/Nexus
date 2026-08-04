'use client';

import { mapDateToClient } from '@/features/tasks/utils/mapDateToClient';
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
			<DropdownMenuTrigger className="border-border w-full border-r">
				<button
					disabled={isCompleted}
					className="flex min-h-full w-full items-center justify-between py-2 pr-3"
				>
					<span className="font-heading text-lg font-medium">{date}</span>
					<ChevronsUpDown className="text-muted-foreground size-4.5" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				ref={calendarRef}
				className="bg-popover/95 w-auto rounded-2xl border p-0 shadow-xl backdrop-blur-md"
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
