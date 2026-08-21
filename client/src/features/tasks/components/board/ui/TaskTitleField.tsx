import { cn } from '@/lib/utils';
import { Checkbox } from '@/shared/ui/checkbox';
import { Textarea } from '@/shared/ui/textarea';
import { GripVertical } from 'lucide-react';
import React from 'react';

interface Props {
	title: string;
	inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
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
	const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		handleTitleUpdate(e.target.value);
	};

	return (
		<div className="flex gap-x-2.5">
			<div className="flex h-fit items-center gap-x-0.5">
				<div
					className={cn(
						'cursor-grab px-1 rounded-lg transition-colors duration-150',
						addTaskMode && 'cursor-not-allowed',
					)}
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
					className="size-6"
				/>
			</div>

			<Textarea
				autoCapitalize="on"
				value={title}
				onChange={handleTitleChange}
				{...inputProps}
				className={cn(
					'font-heading! rounded-none border-none bg-transparent p-0 text-lg/tight! font-medium transition-colors focus-visible:ring-0 align-middle',
					isCompleted && 'text-muted-foreground decoration-muted-foreground/70 line-through decoration-2',
				)}
			/>
		</div>
	);
};
