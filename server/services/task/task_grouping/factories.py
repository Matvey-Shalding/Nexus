from datetime import date

from app.enums.grouping import TaskDefaultGroup

from app.models.task import PriorityEnum

from app.types.task import (
    TaskGroup,
    TaskGroupCreationDefaults,
    TaskGroupCreationOptions,
)


def create_group(
    group_id: str,
    title: str,
    enabled: bool,
    defaults: TaskGroupCreationDefaults | None = None,
) -> TaskGroup:
    return TaskGroup(
        id=group_id,
        title=title,
        tasks=[],
        creation=TaskGroupCreationOptions(enabled=enabled, defaults=defaults),
    )


def create_completed_group() -> TaskGroup:
    return create_group(
        group_id=TaskDefaultGroup.COMPLETED,
        title="Completed",
        enabled=False,
    )


def create_no_date_group() -> TaskGroup:

    return create_group(
        group_id=TaskDefaultGroup.NO_DATE,
        title="No date",
        enabled=True,
        defaults=TaskGroupCreationDefaults(due_date=None),
    )


def create_expired_group() -> TaskGroup:

    return create_group(
        group_id=TaskDefaultGroup.EXPIRED,
        title="Expired",
        enabled=False,
    )


def create_today_group(
    value: date,
) -> TaskGroup:

    return create_group(
        group_id=TaskDefaultGroup.TODAY,
        title="Today",
        enabled=True,
        defaults=TaskGroupCreationDefaults(due_date=value),
    )


def create_tomorrow_group(
    value: date,
):

    return create_group(
        group_id=TaskDefaultGroup.TOMORROW,
        title="Tomorrow",
        enabled=True,
        defaults=TaskGroupCreationDefaults(due_date=value),
    )


def create_this_week_group(
    value: date,
):

    return create_group(
        group_id=TaskDefaultGroup.THIS_WEEK,
        title="On this week",
        enabled=True,
        defaults=TaskGroupCreationDefaults(due_date=value),
    )


def create_next_week_group(
    value: date,
):

    return create_group(
        group_id=TaskDefaultGroup.NEXT_WEEK,
        title="On next week",
        enabled=True,
        defaults=TaskGroupCreationDefaults(due_date=value),
    )


def create_later_group(
    value: date,
):

    return create_group(
        group_id=TaskDefaultGroup.LATER,
        title="Later",
        enabled=True,
        defaults=TaskGroupCreationDefaults(due_date=value),
    )


def create_priority_group(
    priority: PriorityEnum,
    title: str,
):

    return create_group(
        group_id=str(priority),
        title=title,
        enabled=True,
        defaults=TaskGroupCreationDefaults(priority=priority),
    )
