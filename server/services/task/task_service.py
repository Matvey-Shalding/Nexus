from datetime import date

from app.enums.task import TaskGroupBy, TaskSortBy, TaskSortOrder
from app.error import InvalidDate, InvalidTaskId
from app.models.task import Task
from app.models.user import User
from app.schemas.task import (
    CreateTaskRequest,
    UpdateTaskRequest,
)
from app.schemas.task import (
    TaskGroup as TaskGroupDTO,
)
from app.types.task import TaskGroup
from repositories.task import TaskRepository
from services.task.task_grouping.service import group_tasks
from services.task.task_mapper.task_mapping_service import map_tasks
from services.task.task_sorting.sort_tasks_service import sort_tasks
from sqlalchemy.ext.asyncio import AsyncSession


class TaskService:
    task_repository = TaskRepository()

    def _validate_task(self, task_date: date | None):

        if task_date is not None and task_date < date.today():
            raise InvalidDate()

    async def create_task(
        self, request: CreateTaskRequest, db: AsyncSession, current_user: User
    ) -> Task:

        if request.due_date:
            self._validate_task(request.due_date)

        return await self.task_repository.add_task(db, request, current_user.id)

    async def update_task(
        self,
        task_id: int,
        request: UpdateTaskRequest,
        db: AsyncSession,
        current_user: User,
    ):

        self._validate_task(request.due_date)

        task = await self.task_repository.get_task_by_id(db, task_id, current_user.id)

        if task is None:
            raise InvalidTaskId()

        return await self.task_repository.update_task(db, task, request)

    async def delete_task(self, db: AsyncSession, task_id: int, current_user: User):

        task = await self.task_repository.get_task_by_id(db, task_id, current_user.id)

        if task is None:
            raise InvalidTaskId()

        return await self.task_repository.delete_task(db, task)

    async def get_tasks(
        self,
        db: AsyncSession,
        current_user: User,
        group_by: TaskGroupBy = TaskGroupBy.DEFAULT,
        sort_by: TaskSortBy = TaskSortBy.AUTO,
        sort_order: TaskSortOrder = TaskSortOrder.ASC,
    ) -> list[TaskGroupDTO]:

        tasks: list[Task] = list(
            await self.task_repository.get_tasks(db, current_user.id)
        )

        task_groups: list[TaskGroup] = group_tasks(tasks, group_by)

        sort_tasks(task_groups, sort_by, order_by=sort_order)

        return map_tasks(task_groups)
