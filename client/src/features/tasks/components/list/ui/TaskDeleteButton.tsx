import { Trash } from 'lucide-react';
import React from 'react';

interface Props {
	onDelete: () => void;
}
export const TaskDeleteButton: React.FC<Props> = ({ onDelete }) => {
	return (
		<div
			onClick={onDelete}
			className="group hover:bg-muted/40 grid place-content-center py-3 transition-colors duration-300"
		>
			<Trash className="group-hover:text-destructive size-6 transition-colors duration-300" />
		</div>
	);
};
