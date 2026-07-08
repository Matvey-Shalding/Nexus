from datetime import timedelta, datetime, timezone
from encodings import palmos
from hashlib import sha256
import hashlib
import secrets
import time
from typing import Annotated, Any

import re

from app.types.auth import AccessToken, Session

from fastapi import Depends, HTTPException
from jose import JWTError, jwt

from repositories.user import UserRepository

from repositories.refresh_token import RefreshTokenRepository

from app.schemas.user import CreateUserRequest

from app.deps import db_dependency
from app.models.user import User

from app.error import AUTH_ERROR, DUPLICATE_EMAIL_ERROR


from app.security import bcrypt_context

import os

from sqlalchemy.ext.asyncio import AsyncSession

from app.config import (
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH,
    EMAIL_REGEXP,
)

from app.error import InvalidEmail, InvalidPassword, InvalidName


from app.config import ACCESS_TOKEN_EXPIRE_MINS, REFRESH_TOKEN_EXPIRE_DAYS


class AuthService:

    async def validate_user(
        self, create_user_request: CreateUserRequest, db: db_dependency
    ) -> None:

        if (
            len(create_user_request.name) < NAME_MIN_LENGTH
            or len(create_user_request.name) > NAME_MAX_LENGTH
        ):
            raise InvalidName()

        if (
            len(create_user_request.password) < PASSWORD_MIN_LENGTH
            or len(create_user_request.password) > PASSWORD_MAX_LENGTH
        ):
            raise InvalidPassword()

        if not re.search(EMAIL_REGEXP, create_user_request.email):
            raise InvalidEmail()

        user = await UserRepository().get_user_by_email(
            db=db, email=create_user_request.email
        )

        if user:
            raise DUPLICATE_EMAIL_ERROR

    async def register(
        self,
        db: db_dependency,
        create_user_request: CreateUserRequest,
    ) -> User:

        try:
            await self.validate_user(create_user_request, db)
        except Exception as e:
            raise e

        user = await UserRepository().add_user(create_user_request, db)

        return user

    async def authenticate_user(
        self, email: str, password: str, db: db_dependency
    ) -> User | None:

        user = await UserRepository().get_user_by_email(db, email=email)

        if not user:
            return None

        if not bcrypt_context.verify(password, user.hashed_password):
            return None

        return user

    async def get_user_by_token(self, token: str, db: AsyncSession) -> User | None:

        secret_key = os.getenv("AUTH_SECRET_KEY")
        algorithm = os.getenv("AUTH_ALGORITHM")

        assert secret_key is not None
        assert algorithm is not None

        try:
            payload = jwt.decode(
                token,
                secret_key,
                algorithms=[algorithm],
            )

            user_id: int | None = payload.get("id")

            if user_id is None:
                raise AUTH_ERROR
        except JWTError:
            raise AUTH_ERROR

        return await UserRepository().get_user_by_id(
            db=db,
            id=user_id,
        )

    def hash_token(self, refresh_token: str) -> str:
        return hashlib.sha256(refresh_token.encode("utf-8")).hexdigest()

    async def create_session(self, user: User, db: db_dependency) -> Session:
        refresh_token = secrets.token_urlsafe(64)

        refresh_token_hashed = self.hash_token(refresh_token)

        # remove prev session

        await RefreshTokenRepository().delete_by_user_id(user.id, db)

        expires_at = datetime.now(timezone.utc) + timedelta(
            days=REFRESH_TOKEN_EXPIRE_DAYS
        )

        # insert new one

        await RefreshTokenRepository().insert(
            db, user, expires_at, refresh_token_hashed
        )

        await db.commit()

        access_token = self.create_access_token(user_id=user.id)

        return {"access_token": access_token, "refresh_token": refresh_token}

    def create_access_token(self, user_id: int) -> str:
        encode: dict[str, Any] = {"id": user_id}

        expires = datetime.now(timezone.utc) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINS
        )

        encode.update({"exp": expires})

        secret_key = os.getenv("AUTH_SECRET_KEY")

        assert secret_key is not None

        algorithm = os.getenv("AUTH_ALGORITHM")

        assert algorithm is not None

        return jwt.encode(encode, secret_key, algorithm=algorithm)

    async def refresh(self, refresh_token: str, db: db_dependency) -> AccessToken:

        refresh_token_hashed = self.hash_token(refresh_token)

        db_token = await RefreshTokenRepository().get_by_token(
            refresh_token_hashed, db=db
        )

        if not db_token:
            raise AUTH_ERROR

        # prevent runtime errors and manually fetch user

        user = await UserRepository().get_user_by_id(db, db_token.user_id)

        if not user:
            raise AUTH_ERROR

        if db_token.expires_at < datetime.now(timezone.utc):

            await RefreshTokenRepository().delete_by_user_id(user.id, db)

            await db.commit()

            raise AUTH_ERROR

        access_token = self.create_access_token(user_id=user.id)

        return {"access_token": access_token, "token_type": "Bearer"}

    async def logout(self, refresh_token: str, db: db_dependency) -> None:

        hashed_token = self.hash_token(refresh_token)

        await RefreshTokenRepository().delete_by_token(hashed_token, db=db)

        await db.commit()
