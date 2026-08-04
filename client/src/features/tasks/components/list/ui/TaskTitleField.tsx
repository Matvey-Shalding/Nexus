import { cn } from '@/lib/utils';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { GripVertical } from 'lucide-react';
import React from 'react';

interface Props {
	title: string;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	handleTitleUpdate: (value: string) => void;
	disableCheckbox?: boolean;
	isCompleted?: boolean;
	handleCompletedUpdate?: (value: boolean) => void;
}

export const TaskTitleField: React.FC<Props> = ({
	title,
	handleTitleUpdate,
	inputProps,
	disableCheckbox,
	isCompleted = false,
	handleCompletedUpdate,
}) => {
	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleTitleUpdate(e.target.value);
	};

	return (
		<div className="border-border flex items-center gap-x-3 border-r py-2 pr-1">
			<GripVertical className={cn('size-6 transition-opacity', isCompleted && 'text-muted-foreground opacity-60')} />

			<Checkbox
				checked={isCompleted}
				onCheckedChange={checked => handleCompletedUpdate?.(!!checked)}
				disabled={disableCheckbox}
				className="size-6"
			/>

			<Input
				value={title}
				onChange={onTitleChange}
				{...inputProps}
				className={cn(
					'font-heading! rounded-none border-none bg-transparent p-0 text-lg! font-medium transition-colors focus-visible:ring-0',
					isCompleted && 'text-muted-foreground decoration-muted-foreground/70 line-through decoration-2',
				)}
			/>
		</div>
	);
};
