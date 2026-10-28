'use client';

import { mapDateToClient } from '@/features/tasks/utils/mapDateToClient';
import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/Calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
	selectedDate: string | null;
	updateDate: (date: Date | undefined) => void;
	isCompleted?: boolean;
}
export const TaskDateField: React.FC<Props> = ({ selectedDate, updateDate, isCompleted = false }) => {
	const date = mapDateToClient(selectedDate);

	const [open, setOpen] = useState(false);

	const handleSelect = (date: Date | undefined) => {
		updateDate(date);
		setOpen(false);
	};
	return (
		<DropdownMenu
			open={open}
			onOpenChange={open => {
				setOpen(open);
			}}
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
				onPointerDown={e => {
					e.preventDefault();
					e.stopPropagation();
				}}
				className="w-auto p-0"
				align="start"
			>
				<Calendar
					selected={date ? new Date(date) : undefined}
					onSelect={handleSelect}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
