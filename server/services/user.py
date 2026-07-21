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
from app.schemas.user import UpdateUserRequest

from app.config import NAME_MAX_LENGTH, NAME_MIN_LENGTH, EMAIL_REGEXP

import re

from app.error import InvalidName, InvalidEmail


class UserService:

    async def update_user(
        self, request: UpdateUserRequest, db: AsyncSession, current_user: User
    ) -> User:

        data = request.model_dump(exclude_unset=True)

        if "name" in data:
            name = data["name"]

            if len(name) < NAME_MIN_LENGTH or len(name) > NAME_MAX_LENGTH:
                raise InvalidName()

        # validate such user exists

        if "email" in data:

            email = data["email"]

            if not re.search(EMAIL_REGEXP, email):
                raise InvalidEmail()

            user = await UserRepository().get_user_by_email(db=db, email=email)

            if user and user.id != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Such email already exists.",
                )

        for key, value in data.items():
            setattr(current_user, key, value)

        await db.commit()

        await db.refresh(current_user)

        return current_user
