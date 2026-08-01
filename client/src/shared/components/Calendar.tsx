import React from 'react';
import { OnSelectHandler } from 'react-day-picker';
import { Calendar as CalendarBase } from '../ui/calendar';
interface Props {
	selected: Date | undefined;
	onSelect: OnSelectHandler<Date | undefined>;
}
export const Calendar: React.FC<Props> = ({ selected, onSelect }) => {
	return (
		<CalendarBase
			selected={selected}
			onSelect={onSelect}
			disabled={{ before: new Date() }}
			fixedWeeks
			captionLayout="dropdown"
			weekStartsOn={1}
			showOutsideDays
			mode="single"
			classNames={{
				day_button:
					'transition-all duration-150 hover:bg-accent hover:text-accent-foreground active:scale-95 font-medium size-8.5 pointer-events-all! rounded-xl! data-[selected-single=true]:hover:bg-primary! transition-transform',
				outside: 'pointer-events-none text-muted-foreground/40',
				today: 'rounded-xl! bg-muted border-red!',
			}}
		/>
	);
};
