from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.task import CreateTaskRequest, UpdateTaskRequest
from app.models.task import Task




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

    async def get_task_by_id(self, db: AsyncSession, task_id: int) -> Task | None:
        return await db.get(Task, ident=task_id)

    async def update_task(
        self, db: AsyncSession, task: Task, update_task_request: UpdateTaskRequest
    ):

        for key, values in update_task_request.model_dump(exclude_unset=True).items():
            setattr(task, key, values)

        await db.commit()

        await db.refresh(task)

        return task
    
    async def delete_task(self, db: AsyncSession, task: Task):

        await db.delete(task)

        await db.commit()
    
    async def get_tasks(self,db: AsyncSession, user_id: int):

        return(await db.execute(select(Task).where(Task.user_id == user_id))).scalars().all()
