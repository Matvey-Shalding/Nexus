export const TASK_GROUP_BY = {
	DEFAULT: 'default',
	PRIORITY: 'priority',
	DUE_DATE: 'due_date',
} as const;

export type TaskGroupBy = (typeof TASK_GROUP_BY)[keyof typeof TASK_GROUP_BY];

export const TASK_SORT_BY = {
	AUTO: 'auto',
	TITLE: 'title',
	PRIORITY: 'priority',
	DUE_DATE: 'due_date',
	CREATED_AT: 'created_at',
} as const;

export type TaskSortBy = (typeof TASK_SORT_BY)[keyof typeof TASK_SORT_BY];

export const TASK_SORT_ORDER = {
	ASC: 'asc',
	DESC: 'desc',
} as const;

export type TaskSortOrder = (typeof TASK_SORT_ORDER)[keyof typeof TASK_SORT_ORDER];

export const TASK_VIEW = {
	LIST: 'list',
	BOARD: 'board',
} as const;

export type TaskView = (typeof TASK_VIEW)[keyof typeof TASK_VIEW];
