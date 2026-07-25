import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { GripVertical } from 'lucide-react';
import React from 'react';
interface Props {
	className?: string;
	title: string;
}
export const TaskTitle: React.FC<Props> = ({ title }) => {
	return (
		<div className="border-border flex items-center gap-x-3 border-r py-2 pr-1">
			<GripVertical className="size-6" />
			<Checkbox className="size-6" />
			{/* <span className="font-heading text-lg font-medium">{title}</span>
			 */}
			<Input
				defaultValue={title}
				className="font-heading! rounded-none border-none bg-transparent p-0 text-lg! font-medium focus-visible:ring-0"
			/>
		</div>
	);
};
