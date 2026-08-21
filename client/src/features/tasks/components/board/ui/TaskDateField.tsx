'use client';

import { mapDateToClient } from '@/features/tasks/utils/mapDateToClient';
import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/Calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import React, { useState } from 'react';

interface Props {
	selectedDate: Date | undefined;
	handleDateUpdate: (date: Date | undefined) => void;
	isCompleted?: boolean;
}

export const TaskDateField: React.FC<Props> = ({ selectedDate, handleDateUpdate, isCompleted = false }) => {
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
					'grid place-content-center rounded-md border border-border px-3 py-0.5',
					'font-heading text-lg font-medium',
					'transition-[background-color,transform,opacity] duration-150',
					'hover:bg-muted/40',
					'active:scale-[0.98]',
					'data-[state=open]:bg-muted/60',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
					isCompleted && 'cursor-not-allowed opacity-60',
				)}
			>
				<span>{date}</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				onPointerDown={e => {
					e.preventDefault();
					e.stopPropagation();
				}}
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
