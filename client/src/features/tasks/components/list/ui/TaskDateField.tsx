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
}
export const TaskDateField: React.FC<Props> = ({ selectedDate, calendarRef, handleDateUpdate }) => {
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
			<DropdownMenuTrigger className="border-border flex w-full items-center justify-between border-r py-2 pr-3 text-lg font-medium transition-colors">
				<span className="font-heading text-lg font-medium">{date}</span>
				<ChevronsUpDown className="text-muted-foreground size-4.5" />
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
