from datetime import datetime
from typing import Callable

from app.enums.task import TaskSortBy, TaskSortOrder
from app.models.task import Task
from app.types.task import TaskGroup
from app.schemas.task import UpdateTaskRequest

from sqlalchemy.ext.asyncio import AsyncSession


def sort_tasks(
    task_groups: list[TaskGroup],
    sort_by: TaskSortBy,
    order_by: TaskSortOrder,
) -> None:
    is_desc = order_by == TaskSortOrder.DESC

    for task_group in task_groups:

        column: list[Task] = task_group["tasks"]

        match sort_by:
            case TaskSortBy.AUTO:
                _sort_by_auto(column)
            case TaskSortBy.TITLE:
                _sort_by_title(column, is_desc)
            case TaskSortBy.PRIORITY:
                _sort_by_priority(column, is_desc)
            case TaskSortBy.DUE_DATE:
                _sort_by_due_date(column, is_desc)
            case TaskSortBy.CREATED_AT:
                _sort_by_created_at(column, is_desc)


def _sort_by_auto(tasks: list[Task]) -> None:
    pass


def _sort_by_title(tasks: list[Task], is_desc: bool) -> None:
    tasks.sort(
        reverse=is_desc,
        key=lambda task: task.title or "",
    )


def _sort_by_priority(tasks: list[Task], is_desc: bool) -> None:
    tasks.sort(
        reverse=is_desc,
        key=lambda task: task.priority if task.priority is not None else -1,
    )


def _sort_by_due_date(tasks: list[Task], is_desc: bool) -> None:

    def sort_key(task: Task):
        has_no_date = task.due_date is None

        # Flag ensuring None always goes to the end regardless of direction
        is_pushed_to_end = has_no_date if not is_desc else not has_no_date

        fallback_date = datetime.min if not is_desc else datetime.max
        actual_date = task.due_date if task.due_date is not None else fallback_date

        return (is_pushed_to_end, actual_date)

    tasks.sort(reverse=is_desc, key=sort_key)


def _sort_by_created_at(tasks: list[Task], is_desc: bool) -> None:
    tasks.sort(
        reverse=is_desc,
        key=lambda task: task.created_at,
    )
