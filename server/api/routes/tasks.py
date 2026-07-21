from typing import Annotated

from fastapi import APIRouter, Depends

from starlette import status

from app.schemas.task import CreateTaskRequest, TaskResponse, UpdateTaskRequest

from dependencies.user import get_current_user
from app.models.user import User

from app.deps import db_dependency
from services.task import TaskService   

user_dependency = Annotated[User, Depends(get_current_user)]

task_service = TaskService()

tasks_router = APIRouter(prefix="/tasks", tags=["tasks"])


@tasks_router.post("/", status_code=status.HTTP_201_CREATED,response_model=TaskResponse)
async def create_task(
    request: CreateTaskRequest, current_user: user_dependency, db: db_dependency
):
    

    return await task_service.create_task(
        request=request, db=db, current_user=current_user
    )

@tasks_router.patch("/{task_id}", status_code=status.HTTP_200_OK,response_model=TaskResponse)

async def update_task(task_id: int, request: UpdateTaskRequest, current_user: user_dependency, db: db_dependency):

    return await task_service.update_task(task_id=task_id, request=request, db=db, current_user=current_user)

@tasks_router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)

async def delete_task(task_id: int, current_user: user_dependency, db: db_dependency):

    return await task_service.delete_task(task_id=task_id, db=db, current_user=current_user)