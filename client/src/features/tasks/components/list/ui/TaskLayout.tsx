import React, { RefObject } from 'react';
interface Props {
	taskRef?: RefObject<HTMLDivElement | null>;
	children: React.ReactNode;
}
export const TaskLayout: React.FC<Props> = ({ taskRef, children }) => {
	return (
		<div
			ref={taskRef}
			className="border-border grid min-h-14 w-full grid-cols-[8fr_2fr_2fr_0.5fr] gap-3.5 border-y pl-2.5"
		>
			{children}
		</div>
	);
};
