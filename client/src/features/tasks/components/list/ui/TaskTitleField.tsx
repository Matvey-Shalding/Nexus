import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { GripVertical } from 'lucide-react';
import React from 'react';
interface Props {
	title: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export const TaskTitleField: React.FC<Props> = ({ title, setTitle, inputProps: props }) => {
	return (
		<div className="border-border flex items-center gap-x-3 border-r py-2 pr-1">
			<GripVertical className="size-6" />
			<Checkbox className="size-6" />
			<Input
				value={title}
				onChange={e => setTitle(e.target.value)}
				{...props}
				// defaultValue={title}
				className="font-heading! rounded-none border-none bg-transparent p-0 text-lg! font-medium focus-visible:ring-0"
			/>
		</div>
	);
};
