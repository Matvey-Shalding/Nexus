from datetime import datetime, timezone, date
import re
import time
from typing import Any

from app.schemas.task import CreateTaskRequest

from sqlalchemy.ext.asyncio import AsyncSession

from repositories.task import TaskRepository
from app.models.user import User
from app.models.task import Task

from app.error import InvalidDate

from datetime import date


class TaskService:

    async def create_task(
        self, request: CreateTaskRequest, db: AsyncSession, current_user: User
    ) -> Task:

        task_repository = TaskRepository()

        if request.due_date is not None and request.due_date < date.today():

            raise InvalidDate()

        # now = date.today()

        # if request.due_date is not None:

        #     try:
        #         formatted_date = datetime.strptime(request.due_date, "%Y-%m-%d").date()

        #     except:
        #         raise InvalidDate()

        # if request.due_date is not None and request.due_date < now:

        #     raise InvalidDate()

        return await task_repository.add_task(db, request, current_user.id)
