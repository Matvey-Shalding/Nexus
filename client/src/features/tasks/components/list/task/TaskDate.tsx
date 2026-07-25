'use client';

import { Calendar } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import React, { useMemo } from 'react';
import { formatDate } from '../../../utils/formatDate';

interface Props {
	className?: string;
	dateStr: string | null;
}

export const TaskDate: React.FC<Props> = ({ dateStr, className }) => {
	const date = useMemo(() => {
		return formatDate(dateStr);
	}, [dateStr]);

	return (
		<Popover>
			<PopoverTrigger className="border-border flex w-full items-center justify-between border-r py-2 pr-3 text-lg font-medium transition-colors">
				<span className="font-heading text-lg font-medium">{date}</span>
				<ChevronsUpDown className="text-muted-foreground size-4.5" />
			</PopoverTrigger>

			<PopoverContent
				className="bg-popover/95 w-auto rounded-2xl border p-0 shadow-xl backdrop-blur-md"
				align="start"
			>
				<Calendar
					disabled={{ before: new Date() }}
					fixedWeeks
					captionLayout="dropdown"
					weekStartsOn={1}
					showOutsideDays
					mode="single"
					className={className}
					classNames={{
						day_button:
							'transition-all duration-150 hover:bg-accent hover:text-accent-foreground active:scale-95 font-medium size-8.5 pointer-events-all! rounded-xl! data-[selected-single=true]:hover:bg-primary! transition-transform',
						outside: 'pointer-events-none text-muted-foreground/40',
						today: 'rounded-xl! bg-muted border-red!',
					}}
				/>
			</PopoverContent>
		</Popover>
	);
};
