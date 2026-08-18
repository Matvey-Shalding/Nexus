import { cn } from '@/lib/utils';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { GripVertical } from 'lucide-react';
import React from 'react';

interface Props {
	title: string;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	handleTitleUpdate: (value: string) => void;
	addTaskMode?: boolean;
	isCompleted?: boolean;
	handleCompletedUpdate?: (value: boolean) => void;
}

export const TaskTitleField: React.FC<Props> = ({
	title,
	handleTitleUpdate,
	inputProps,
	addTaskMode = false,
	isCompleted = false,
	handleCompletedUpdate,
}) => {
	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleTitleUpdate(e.target.value);
	};

	return (
		<div className="border-border flex items-center gap-x-1 border-r py-2 pr-1">
			<div
				className={cn('cursor-grab p-1 rounded-lg transition-colors duration-150', addTaskMode && 'cursor-not-allowed')}
			>
				<GripVertical
					className={cn(
						'size-6 text-muted-foreground',
						isCompleted && 'opacity-60',
						addTaskMode ? 'opacity-50' : 'hover:scale-105 hover:text-white transition-[color_transform]',
					)}
				/>
			</div>

			<Checkbox
				checked={isCompleted}
				onCheckedChange={checked => handleCompletedUpdate?.(!!checked)}
				disabled={addTaskMode}
				className="size-6 mr-2"
			/>

			<Input
				autoCapitalize="on"
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
