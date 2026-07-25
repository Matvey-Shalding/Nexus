import { Trash } from 'lucide-react';
import React from 'react';
interface Props {
	className?: string;
}
export const TaskDelete: React.FC<Props> = ({}) => {
	return (
		<div className="group -ml-3.5 grid place-content-center py-3">
			<Trash className="group-hover:text-destructive size-6 transition-colors duration-300" />
		</div>
	);
};
