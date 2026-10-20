import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any

from app.config import settings
from app.deps import db_dependency
from app.error import (
    AuthError,
    DuplicateEmailError,
)
from app.models.user import User
from app.schemas.user import CreateUserRequest
from app.security import bcrypt_context
from app.types.auth import AccessToken, Session
from jose import JWTError, jwt
from repositories.refresh_token import RefreshTokenRepository
from repositories.user import UserRepository
from sqlalchemy.ext.asyncio import AsyncSession


class AuthService:
    async def register(
        self,
        db: db_dependency,
        create_user_request: CreateUserRequest,
    ) -> User:

        user = await UserRepository().get_user_by_email(
            db=db, email=create_user_request.email
        )

        if user:
            raise DuplicateEmailError()

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
        try:
            payload = jwt.decode(
                token,
                settings.AUTH_SECRET_KEY,
                algorithms=[settings.AUTH_ALGORITHM],
            )

            user_id: int | None = payload.get("id")

            if user_id is None:
                raise AuthError
        except JWTError:
            raise AuthError

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
            seconds=settings.REFRESH_TOKEN_EXPIRE_SECONDS
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
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINS
        )

        encode.update({"exp": expires})

        return jwt.encode(
            encode, settings.AUTH_SECRET_KEY, algorithm=settings.AUTH_ALGORITHM
        )

    async def refresh(self, refresh_token: str, db: db_dependency) -> AccessToken:

        refresh_token_hashed = self.hash_token(refresh_token)

        db_token = await RefreshTokenRepository().get_by_token(
            refresh_token_hashed, db=db
        )

        if not db_token:
            raise AuthError

        # prevent runtime errors and manually fetch user

        user = await UserRepository().get_user_by_id(db, db_token.user_id)

        if not user:
            raise AuthError

        if db_token.expires_at < datetime.now(timezone.utc):
            await RefreshTokenRepository().delete_by_user_id(user.id, db)

            await db.commit()

            raise AuthError

        access_token = self.create_access_token(user_id=user.id)

        return {"access_token": access_token, "token_type": "Bearer"}

    async def logout(self, refresh_token: str, db: db_dependency) -> None:

        hashed_token = self.hash_token(refresh_token)

        await RefreshTokenRepository().delete_by_token(hashed_token, db=db)

        await db.commit()
