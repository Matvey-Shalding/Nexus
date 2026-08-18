import {
	TASK_GROUP_BY,
	TASK_SORT_BY,
	TASK_SORT_ORDER,
	TASK_VIEW,
	TaskGroupBy,
	TaskSortBy,
	TaskSortOrder,
	TaskView,
} from '@/features/tasks/types/TaskView';
import { Columns3, Layers3, ListOrdered, LucideIcon, Rows3, SortAsc } from 'lucide-react';

interface TaskGroupByItem {
	label: string;
	value: TaskGroupBy;
}

export const taskGroupByOptions: TaskGroupByItem[] = [
	{ label: 'Default', value: TASK_GROUP_BY.DEFAULT },
	{ label: 'Priority', value: TASK_GROUP_BY.PRIORITY },
	{ label: 'Due date', value: TASK_GROUP_BY.DUE_DATE },
] as const;

interface TaskSortByItem {
	label: string;
	value: TaskSortBy;
}

export const taskSortByOptions: TaskSortByItem[] = [
	{ label: 'Automatic', value: TASK_SORT_BY.AUTO },
	{ label: 'Title', value: TASK_SORT_BY.TITLE },
	{ label: 'Priority', value: TASK_SORT_BY.PRIORITY },
	{ label: 'Due date', value: TASK_SORT_BY.DUE_DATE },
	{ label: 'Created date', value: TASK_SORT_BY.CREATED_AT },
] as const;

interface TaskSortOrderItem {
	label: string;
	value: TaskSortOrder;
}

export const taskSortOrderOptions: TaskSortOrderItem[] = [
	{ label: 'Ascending', value: TASK_SORT_ORDER.ASC },
	{ label: 'Descending', value: TASK_SORT_ORDER.DESC },
] as const;

interface TaskFilterItem {
	title: string;
	icon: LucideIcon;
	options: TaskGroupByItem[] | TaskSortByItem[] | TaskSortOrderItem[];
}

export const taskViewFilters: TaskFilterItem[] = [
	{
		title: 'Group by',
		icon: Layers3,
		options: taskGroupByOptions,
	},
	{
		title: 'Sort by',
		icon: ListOrdered,
		options: taskSortByOptions,
	},
	{
		title: 'Order',
		icon: SortAsc,
		options: taskSortOrderOptions,
	},
] as const;

interface TaskViewItem {
	label: string;
	value: TaskView;
	icon: LucideIcon;
}

export const taskViewOptions: TaskViewItem[] = [
	{
		label: 'List',
		value: TASK_VIEW.LIST,
		icon: Rows3,
	},
	{
		label: 'Board',
		value: TASK_VIEW.BOARD,
		icon: Columns3,
	},
] as const;
