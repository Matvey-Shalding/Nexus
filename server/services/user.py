from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User

from typing import Annotated
import os

from fastapi import Depends, HTTPException
from jose import JWTError, jwt
from starlette import status

from app.deps import db_dependency
from app.models.user import User

from repositories.user import UserRepository
from repositories.bot import BotRepository
from app.schemas.user import UpdateUserRequest, UserResponseForTelegram

from app.config import NAME_MAX_LENGTH, NAME_MIN_LENGTH, EMAIL_REGEXP

import re

from app.error import AuthError, InvalidName, InvalidEmail, TelegramAccountNotFound


class UserService:

    user_repository = UserRepository()

    async def _validate_user(self, current_user: User, data: dict, db: AsyncSession):

        if "name" in data:
            name = data["name"]

            if len(name) < NAME_MIN_LENGTH or len(name) > NAME_MAX_LENGTH:
                raise InvalidName()

        # validate such user exists

        if "email" in data:

            email = data["email"]

            if not re.search(EMAIL_REGEXP, email):
                raise InvalidEmail()

            user = await self.user_repository.get_user_by_email(db=db, email=email)

            if user and user.id != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Such email already exists.",
                )

    async def update_user(
        self, request: UpdateUserRequest, db: AsyncSession, current_user: User
    ) -> User:

        data = request.model_dump(exclude_unset=True)

        await self._validate_user(current_user, data, db)

        return await self.user_repository.update_user(data, db, current_user)

    async def get_user_by_telegram_id(
        self, telegram_user_id: int, db: AsyncSession
    ) -> UserResponseForTelegram:
        account = await BotRepository().get_account_by_telegram_user_id(
            db, telegram_user_id
        )

        if not account:
            raise TelegramAccountNotFound()

        user = await UserRepository().get_user_by_id(db, account.user_id)

        if not user:
            raise AuthError()

        return UserResponseForTelegram(
            name=user.name, email=user.email, created_at=user.created_at
        )
