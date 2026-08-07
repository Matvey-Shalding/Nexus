from datetime import date


from app.schemas.task import (
    CreateTaskRequest,
    TaskGroup as TaskGroupDTO,
    UpdateTaskRequest,
)

from sqlalchemy.ext.asyncio import AsyncSession

from repositories.task import TaskRepository
from app.models.user import User
from app.models.task import Task

from app.error import InvalidDate, InvalidTaskId

from datetime import date

from app.enums.task import TaskGroupBy, TaskSortBy, TaskSortOrder

from services.task.task_mapper.task_mapping_service import map_tasks
from services.task.task_grouping.service import group_tasks

from services.task.task_sorting.sort_tasks_service import sort_tasks

from app.types.task import TaskGroup


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

    async def delete_task(self, db: AsyncSession, task_id: int, current_user: User):

        task_repository = TaskRepository()

        task = await task_repository.get_task_by_id(db, task_id)

        if task is None:
            raise InvalidTaskId()

        return await task_repository.delete_task(db, task)

    async def get_tasks(
        self,
        db: AsyncSession,
        current_user: User,
        group_by: TaskGroupBy = TaskGroupBy.DEFAULT,
        sort_by: TaskSortBy = TaskSortBy.DEFAULT,
        sort_order: TaskSortOrder = TaskSortOrder.ASC,
    ) -> list[TaskGroupDTO]:

        task_repository = TaskRepository()

        tasks: list[Task] = list(await task_repository.get_tasks(db, current_user.id))

        task_groups: list[TaskGroup] = group_tasks(tasks, group_by)

        sort_tasks(task_groups, sort_by, order_by=sort_order)

        return map_tasks(task_groups)
