import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { LucideIcon } from 'lucide-react';

interface FilterSelectProps<T extends string> {
	title: string;
	icon: LucideIcon;
	value: T;
	onChange: (value: T) => void;
	options: readonly { label: string; value: T }[];
}

export const TaskViewFilterSelect = <T extends string>({
	title,
	icon: Icon,
	value,
	onChange,
	options,
}: FilterSelectProps<T>) => {
	const handleSelect = (value: T | null) => {
		if (value) {
			onChange(value);
		}
	};

	return (
		<div className="flex flex-col gap-1.5">
			<span className="px-0.5 text-xs font-medium text-muted-foreground">{title}</span>

			<Select
				items={options}
				value={value}
				onValueChange={handleSelect}
			>
				<SelectTrigger
					className={cn(
						'h-10 w-full rounded-lg',
						'border-border/80 bg-muted/30',
						'transition-colors duration-150',
						'hover:bg-muted/60',
					)}
				>
					<div className="flex min-w-0 items-center gap-2">
						<Icon className="size-4 shrink-0 text-muted-foreground" />

						<SelectValue />
					</div>
				</SelectTrigger>

				<SelectContent
					sideOffset={6}
					alignItemWithTrigger={false}
				>
					{options.map(option => (
						<SelectItem
							key={option.value}
							value={option.value}
						>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
