from datetime import date

from pydantic import BaseModel


class CreateTaskRequest(BaseModel):

    title: str

    due_date: date | None = None

    priority: int

    completed: bool

    position: float | None = None

class UpdateTaskRequest(BaseModel):

    title: str | None = None

    due_date: date | None = None

    priority: int | None = None

    completed: bool | None = None

    position: float | None = None



class TaskResponse(BaseModel):

    title: str

    due_date: date | None

    priority: int

    completed: bool

    position: float | None = None
