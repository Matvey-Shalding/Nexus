from enum import StrEnum


class TaskGroupBy(StrEnum):
    DEFAULT = "default"
    PRIORITY = "priority"
    DUE_DATE = "due_date"


class TaskSortBy(StrEnum):
    DEFAULT = "default" # manual sorting
    AUTO = "auto"
    TITLE = "title"
    PRIORITY = "priority"
    DUE_DATE = "due_date"
    CREATED_AT = "created_at"


class TaskSortOrder(StrEnum):
    ASC = "asc"
    DESC = "desc"