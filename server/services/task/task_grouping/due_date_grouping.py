from app.enums.grouping import TaskDefaultGroup
from app.models.task import Task
from app.types.task import TaskGroup, TaskGroupCreationDefaults

from .factories import (
    create_no_date_group,
    create_expired_group,
    create_today_group,
    create_tomorrow_group,
    create_completed_group,
    create_group,
)
from .utils import (
    get_today,
    get_tomorrow,
    format_date,
)


class DueDateTaskGrouping:
    def group(self, tasks: list[Task]) -> list[TaskGroup]:
        today = get_today()
        tomorrow = get_tomorrow(today)

        fixed_groups = [
            create_no_date_group(),
            create_expired_group(),
            create_today_group(today),
            create_tomorrow_group(tomorrow),
        ]

        completed_group = create_completed_group()

        dynamic_groups: dict[str, TaskGroup] = {}
        lookup = {group["id"]: group for group in fixed_groups}

        for task in tasks:

            if task.completed:
                completed_group["tasks"].append(task)
                continue

            due = task.due_date

            if due is None:
                lookup[TaskDefaultGroup.NO_DATE]["tasks"].append(task)

            elif due < today:
                lookup[TaskDefaultGroup.EXPIRED]["tasks"].append(task)

            elif due == today:
                lookup[TaskDefaultGroup.TODAY]["tasks"].append(task)

            elif due == tomorrow:
                lookup[TaskDefaultGroup.TOMORROW]["tasks"].append(task)

            else:
                group_id = due.strftime("%Y-%m-%d")

                if group_id not in dynamic_groups:
                    dynamic_groups[group_id] = create_group(
                        group_id=group_id,
                        title=format_date(due),
                        enabled=True,
                        defaults=TaskGroupCreationDefaults(due_date=due),
                    )

                dynamic_groups[group_id]["tasks"].append(task)

        return [
            *fixed_groups,
            *[dynamic_groups[key] for key in sorted(dynamic_groups.keys())],
            completed_group,
        ]
