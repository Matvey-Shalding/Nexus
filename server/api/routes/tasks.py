from typing import Annotated

from fastapi import APIRouter, Depends

from starlette import status

from app.schemas.task import CreateTaskRequest, CreateTaskResponse

from dependencies.user import get_current_user
from app.models.user import User

from app.deps import db_dependency
from services.task import TaskService   

user_dependency = Annotated[User, Depends(get_current_user)]

task_service = TaskService()

tasks_router = APIRouter(prefix="/tasks", tags=["tasks"])


@tasks_router.post("/", status_code=status.HTTP_201_CREATED,response_model=CreateTaskResponse)
async def create_task(
    request: CreateTaskRequest, current_user: user_dependency, db: db_dependency
):
    

    return await task_service.create_task(
        request=request, db=db, current_user=current_user
    )
