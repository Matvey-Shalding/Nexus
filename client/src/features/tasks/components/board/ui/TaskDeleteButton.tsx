import { Trash } from 'lucide-react';
import React from 'react';

interface Props {
	onDelete: () => void;
}

export const TaskDeleteButton: React.FC<Props> = ({ onDelete }) => {
	return (
		<Trash
			onClick={onDelete}
			className="
				size-6
				text-muted-foreground
				transition-[color,transform] duration-150
				hover:text-destructive
				hover:scale-105
				active:scale-95
			"
		/>
	);
};
