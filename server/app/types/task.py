from datetime import date
from typing import NotRequired, TypedDict

from app.models.task import Task


class TaskGroupCreationDefaults(TypedDict, total=False):
    due_date: date | None

    priority: int | None


class TaskGroupCreationOptions(TypedDict):
    enabled: bool

    defaults: NotRequired[TaskGroupCreationDefaults | None]


class TaskGroup(TypedDict):
    id: str

    title: str

    tasks: list[Task]

    creation: TaskGroupCreationOptions
