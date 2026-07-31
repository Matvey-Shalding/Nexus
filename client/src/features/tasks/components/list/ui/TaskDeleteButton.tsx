import { Trash } from 'lucide-react';
import React from 'react';
interface Props {
	onDelete: () => void;
}
export const TaskDeleteButton: React.FC<Props> = ({ onDelete }) => {
	return (
		<div
			onClick={onDelete}
			className="group -ml-3.5 grid place-content-center py-3"
		>
			<Trash className="group-hover:text-destructive size-6 transition-colors duration-300" />
		</div>
	);
};
