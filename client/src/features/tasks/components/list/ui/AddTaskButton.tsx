import { Button } from '@/shared/ui/button';
import React from 'react';

interface Props {
	handleClick: () => void;
}

export const AddTaskButton: React.FC<Props> = ({ handleClick }) => {
	return (
		<Button
			variant="ghost"
			className="border-border flex min-h-14 items-center justify-start rounded-none border-x-0 border-y py-2 pl-2.5"
			onClick={handleClick}
		>
			<span className="text-muted-foreground text-lg">Add task...</span>
		</Button>
	);
};
