from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.task import CreateTaskRequest
from app.models.task import Task

import datetime


class TaskRepository:

    async def add_task(
        self, db: AsyncSession, create_task_request: CreateTaskRequest, user_id: int
    ) -> Task:
        


        task_model = Task(
            title=create_task_request.title,
            due_date=create_task_request.due_date,
            priority=create_task_request.priority,
            completed=create_task_request.completed,
            position=create_task_request.position,
            user_id=user_id,
        )

        db.add(task_model)

        await db.commit()

        await db.refresh(task_model)

        return task_model
