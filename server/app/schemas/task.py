from datetime import date

from pydantic import BaseModel


class CreateTaskRequest(BaseModel):

    title: str

    due_date: date | None = None

    priority: int

    completed: bool

    position: int | None = None



class CreateTaskResponse(BaseModel):

    title: str

    due_date: date | None

    priority: int

    completed: bool

    position: int | None = None
