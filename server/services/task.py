from datetime import datetime, timezone, date
import re
import time
from typing import Any


from app.schemas.task import CreateTaskRequest, UpdateTaskRequest

from sqlalchemy.ext.asyncio import AsyncSession

from repositories.task import TaskRepository
from app.models.user import User
from app.models.task import Task

from app.error import InvalidDate, InvalidTaskId

from datetime import date


class TaskService:

    def _validate_task(self, task_date: date | None):

        if task_date is not None and task_date < date.today():
            raise InvalidDate()

    async def create_task(
        self, request: CreateTaskRequest, db: AsyncSession, current_user: User
    ) -> Task:

        task_repository = TaskRepository()

        self._validate_task(request.due_date)

        return await task_repository.add_task(db, request, current_user.id)

    async def update_task(
        self,
        task_id: int,
        request: UpdateTaskRequest,
        db: AsyncSession,
        current_user: User,
    ):

        task_repository = TaskRepository()

        self._validate_task(request.due_date)

        task = await task_repository.get_task_by_id(db, task_id)

        if task is None:
            raise InvalidTaskId()

        return await task_repository.update_task(db, task, request)

    async def delete_task(self,db: AsyncSession, task_id: int, current_user: User):

        task_repository = TaskRepository()

        task = await task_repository.get_task_by_id(db, task_id)

        if task is None:
            raise InvalidTaskId()

        return await task_repository.delete_task(db, task)