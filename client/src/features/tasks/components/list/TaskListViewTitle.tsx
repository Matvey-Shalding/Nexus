import React from 'react';

interface Props {
	className?: string;
}
export const TaskListViewTitle: React.FC<Props> = ({}) => {
	return (
		<div className="border-border grid w-full grid-cols-[6fr_3fr_2.5fr_0.6fr] items-center border-b pl-2">
			<span className="text-foreground border-border border-r py-2 pr-1 text-[22px] font-semibold">Task name</span>
			<span className="text-foreground border-border border-r text-[22px] py-2 pr-1 pl-3.5 font-semibold">
				Due date
			</span>
			<span className="text-foreground border-border border-r py-2 pl-3.5 pr-1 text-[22px] font-semibold">
				Priority
			</span>
			<span></span>
		</div>
	);
};
