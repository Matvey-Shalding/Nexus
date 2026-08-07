from app.models.task import Task, PriorityEnum
from app.types.task import TaskGroup
from app.enums.grouping import TaskDefaultGroup

from .factories import (
    create_priority_group,
    create_completed_group,
)


class PriorityTaskGrouping:
    def group(self, tasks: list[Task]) -> list[TaskGroup]:
        groups = [
            create_priority_group(PriorityEnum.DEFAULT, "Default"),
            create_priority_group(PriorityEnum.LOW, "Low"),
            create_priority_group(PriorityEnum.MEDIUM, "Medium"),
            create_priority_group(PriorityEnum.HIGH, "High"),
            create_completed_group(),
        ]

        lookup = {group["id"]: group for group in groups}

        for task in tasks:
            if task.completed:
                lookup[TaskDefaultGroup.COMPLETED]["tasks"].append(task)
                continue

            lookup[str(task.priority)]["tasks"].append(task)

        return groups
