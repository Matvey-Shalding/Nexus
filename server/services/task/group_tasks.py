from app.enums.task import TaskGroupBy

from app.models.task import PriorityEnum, Task

import datetime

GroupedTasks = dict[str, list[Task]]


def group_tasks(tasks: list[Task], group_by: TaskGroupBy) -> GroupedTasks:
    match group_by:
        case TaskGroupBy.DEFAULT:
            return _group_by_default(tasks)
        case TaskGroupBy.PRIORITY:
            return _group_by_priority(tasks)
        case TaskGroupBy.DUE_DATE:
            return _group_by_due_date(tasks)


def _group_by_default(tasks: list[Task]) -> GroupedTasks:

    result: GroupedTasks = {
        "No date": [],
        "Expired": [],
        "Today": [],
        "Tomorrow": [],
        "On this week": [],
        "On next week": [],
        "Later": [],
    }

    for task in tasks:

        date = task.due_date

        if date is None:
            result["No date"].append(task)

        elif date < date.today():
            result["Expired"].append(task)

        elif date == date.today():
            result["Today"].append(task)

        elif date == date.today() + datetime.timedelta(days=1):
            result["Tomorrow"].append(task)

        elif date >= date.today() and date <= date.today() + datetime.timedelta(days=7):
            result["On this week"].append(task)

        elif date >= date.today() + datetime.timedelta(
            days=7
        ) and date <= date.today() + datetime.timedelta(days=14):
            result["On next week"].append(task)

        else:
            result["Later"].append(task)

    return result


def _group_by_priority(tasks: list[Task]) -> GroupedTasks:

    result: GroupedTasks = {"Default": [], "Low": [], "Medium": [], "High": []}

    for task in tasks:

        priority: int = task.priority

        match priority:
            case PriorityEnum.DEFAULT:
                result["Default"].append(task)
            case PriorityEnum.LOW:
                result["Low"].append(task)
            case PriorityEnum.MEDIUM:
                result["Medium"].append(task)
            case PriorityEnum.HIGH:
                result["High"].append(task)

    return result


def _group_by_due_date(tasks: list[Task]) -> GroupedTasks:

    result: GroupedTasks = {
        "No date": [],
        "Expired": [],
    }

    for task in tasks:

        if task.due_date is None:
            result["No date"].append(task)

            continue

        if task.due_date < datetime.date.today():
            result["Expired"].append(task)

            continue

        date = task.due_date.strftime("%y-%m-%d")

        if date not in result:
            result[date] = []

        result[date].append(task)

    return result
