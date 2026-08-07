from app.enums.task import TaskGroupBy
from app.models.task import Task
from app.types.task import TaskGroup

from .default_grouping import DefaultTaskGrouping
from .priority_grouping import PriorityTaskGrouping
from .due_date_grouping import DueDateTaskGrouping


class TaskGroupingService:

    def __init__(self):

        self.default_grouping = DefaultTaskGrouping()
        self.priority_grouping = PriorityTaskGrouping()
        self.due_date_grouping = DueDateTaskGrouping()

    def group_tasks(
        self,
        tasks: list[Task],
        group_by: TaskGroupBy,
    ) -> list[TaskGroup]:

        match group_by:

            case TaskGroupBy.DEFAULT:
                return self.default_grouping.group(tasks)

            case TaskGroupBy.PRIORITY:
                return self.priority_grouping.group(tasks)

            case TaskGroupBy.DUE_DATE:
                return self.due_date_grouping.group(tasks)

        raise ValueError(f"Unsupported grouping: {group_by}")


group_tasks = TaskGroupingService().group_tasks
