import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { GripVertical } from 'lucide-react';
import React from 'react';
interface Props {
	title: string;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	handleTitleUpdate: (value: string) => void;
}
export const TaskTitleField: React.FC<Props> = ({ title, handleTitleUpdate, inputProps: props }) => {
	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleTitleUpdate(e.target.value);
	};

	return (
		<div className="border-border flex items-center gap-x-3 border-r py-2 pr-1">
			<GripVertical className="size-6" />
			<Checkbox className="size-6" />
			<Input
				value={title}
				onChange={onTitleChange}
				{...props}
				className="font-heading! rounded-none border-none bg-transparent p-0 text-lg! font-medium focus-visible:ring-0"
			/>
		</div>
	);
};
