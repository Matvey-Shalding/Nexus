from enum import StrEnum

class TaskDefaultGroup(StrEnum):
    NO_DATE = "no_date"
    EXPIRED = "expired"
    TODAY = "today"
    TOMORROW = "tomorrow"
    THIS_WEEK = "this_week"
    NEXT_WEEK = "next_week"
    LATER = "later"
    COMPLETED = "completed"

class TaskPriorityGroup(StrEnum):
    LOW = "priority:low"
    MEDIUM = "priority:medium"
    HIGH = "priority:high"
    DEFAULT = "priority:default"
    COMPLETED = "completed"

class TaskDateGroup(StrEnum):
    NO_DATE = "no_date"
    EXPIRED = "expired"
    TODAY = "today"
    TOMORROW = "tomorrow"
    COMPLETED = "completed"

