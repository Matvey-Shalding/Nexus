import { TPriority } from '../types/Priority';

export const priorityStyles: Record<TPriority, string> = {
	3: 'bg-priority-high-bg text-priority-high-fg hover:bg-priority-high-bg/80',
	2: 'bg-priority-medium-bg text-priority-medium-fg hover:bg-priority-medium-bg/80',
	1: 'bg-priority-low-bg text-priority-low-fg hover:bg-priority-low-bg/80',
	0: 'bg-priority-none-bg text-priority-none-fg hover:bg-priority-none-bg/80',
};

export const getPriorityStyles = (priority: TPriority) => {
	return priorityStyles[priority];
};
