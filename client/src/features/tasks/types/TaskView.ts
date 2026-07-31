export const TaskGroupBy = {
	DEFAULT: 'default',
	PRIORITY: 'priority',
	DUE_DATE: 'due_date',
};

export type TaskGroupBy = (typeof TaskGroupBy)[keyof typeof TaskGroupBy];

export const TaskSortBy = {
	DEFAULT: 'default',
	AUTO: 'auto',
	TITLE: 'title',
	PRIORITY: 'priority',
	DUE_DATE: 'due_date',
	CREATED_AT: 'created_at',
};

export type TaskSortBy = (typeof TaskSortBy)[keyof typeof TaskSortBy];

export const TaskSortOrder = {
	ASC: 'asc',
	DESC: 'desc',
};

export type TaskSortOrder = (typeof TaskSortOrder)[keyof typeof TaskSortOrder];
