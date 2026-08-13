import React from 'react';

interface Props {
	className?: string;
}
export const TaskListViewTitle: React.FC<Props> = ({}) => {
	return (
		<div className="border-border grid w-full grid-cols-[8fr_2.75fr_2.5fr_0.6fr] items-center border-b pl-2">
			<span className="text-foreground border-border border-r py-2 pr-1 text-lg font-medium">Task name</span>
			<span className="text-foreground border-border border-r py-2 pr-1 pl-3.5 text-lg font-medium">Due date</span>
			<span className="text-foreground border-border border-r py-2 pl-3.5 pr-1 text-lg font-medium">Priority</span>
			<span></span>
		</div>
	);
};
