from datetime import date, datetime

from pydantic import BaseModel, ConfigDict

from app.enums.priority import PriorityEnum


class CreateTaskRequest(BaseModel):

    title: str

    due_date: date | None = None

    priority: int

    completed: bool



class UpdateTaskRequest(BaseModel):

    title: str | None = None

    due_date: date | None = None

    priority: int | None = None

    completed: bool | None = None



class TaskResponse(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id: int

    title: str

    due_date: date | None

    priority: PriorityEnum

    completed: bool



class TaskGroupCreationDefaults(BaseModel):

    due_date: date | None = None

    priority: int | None = None


class TaskGroupCreationOptions(BaseModel):

    enabled: bool

    defaults: TaskGroupCreationDefaults | None = None


class TaskGroup(BaseModel):

    id: str

    title: str

    tasks: list[TaskResponse]

    creation: TaskGroupCreationOptions
