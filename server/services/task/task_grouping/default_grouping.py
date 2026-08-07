import datetime

from app.enums.grouping import TaskDefaultGroup
from app.models.task import Task
from app.types.task import TaskGroup

from .factories import (
    create_completed_group,
    create_no_date_group,
    create_expired_group,
    create_today_group,
    create_tomorrow_group,
    create_this_week_group,
    create_next_week_group,
    create_later_group,
)
from .utils import (
    get_today,
    get_tomorrow,
    get_this_week_end,
    get_next_week_start,
)


class DefaultTaskGrouping:
    def group(self, tasks: list[Task]) -> list[TaskGroup]:
        today = get_today()
        tomorrow = get_tomorrow(today)

        this_week_end = get_this_week_end(today)
        next_week_start = get_next_week_start(today)
        next_week_end = next_week_start + datetime.timedelta(days=6)
        later_start = next_week_end + datetime.timedelta(days=1)

        groups: list[TaskGroup] = [
            create_no_date_group(),
            create_expired_group(),
            create_today_group(today),
            create_tomorrow_group(tomorrow),
        ]

        if today.isoweekday() < 7:
            groups.append(create_this_week_group(this_week_end))

        groups.extend(
            [
                create_next_week_group(next_week_start),
                create_later_group(later_start),
                create_completed_group(),
            ]
        )

        lookup = {group["id"]: group for group in groups}

        for task in tasks:
            if task.completed:
                lookup[TaskDefaultGroup.COMPLETED]["tasks"].append(task)
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

            elif due <= this_week_end and TaskDefaultGroup.THIS_WEEK in lookup:
                lookup[TaskDefaultGroup.THIS_WEEK]["tasks"].append(task)

            elif due <= next_week_end:
                lookup[TaskDefaultGroup.NEXT_WEEK]["tasks"].append(task)

            else:
                lookup[TaskDefaultGroup.LATER]["tasks"].append(task)

        return groups
