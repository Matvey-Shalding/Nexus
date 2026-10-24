from typing import Annotated

from app.deps import db_dependency
from app.models.user import User
from app.schemas.user import UpdateUserRequest, UserResponse, UserResponseForTelegram
from dependencies.user import get_current_user
from fastapi import APIRouter, Depends
from services.user import UserService
from starlette import status

users_router = APIRouter(prefix="/users", tags=["users"])

user_service = UserService()

user_dependency = Annotated[User, Depends(get_current_user)]


@users_router.get("/me", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def me(user: user_dependency) -> User:
    return user


@users_router.patch("/me", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def update_me(
    request: UpdateUserRequest, current_user: user_dependency, db: db_dependency
) -> User:

    return await user_service.update_user(
        request=request, db=db, current_user=current_user
    )


@users_router.get(
    "/{telegram_user_id}/me",
    status_code=status.HTTP_200_OK,
    response_model=UserResponseForTelegram,
)
async def get_user_by_telegram_id(db: db_dependency, telegram_user_id: int):
    return await user_service.get_user_by_telegram_id(telegram_user_id, db)
