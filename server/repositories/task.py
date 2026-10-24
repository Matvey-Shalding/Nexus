from typing import Any

from app.models.task import Task
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


class TaskRepository:
    def add_task(self, db: AsyncSession, task: Task) -> Task:
        db.add(task)
        return task

    async def get_task_by_id(
        self, db: AsyncSession, task_id: int, user_id: int
    ) -> Task | None:
        res = await db.execute(
            select(Task).where(Task.id == task_id).where(Task.user_id == user_id)
        )

        return res.scalar_one_or_none()

    def update_task(self, task: Task, update_task_request: dict[str, Any]):

        for key, values in update_task_request.items():
            if values:
                setattr(task, key, values)

        return task

    def delete_task(self, db: AsyncSession, task: Task):
        db.delete(task)  # type: ignore

    async def get_tasks(self, db: AsyncSession, user_id: int):
        return (
            (await db.execute(select(Task).where(Task.user_id == user_id)))
            .scalars()
            .all()
        )
