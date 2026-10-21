import hashlib
import secrets
from datetime import UTC, datetime, timedelta
from typing import Any

from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.deps import db_dependency
from app.error import (
    AuthError,
    DuplicateEmailError,
)
from app.models.refresh_token import RefreshToken
from app.models.user import User
from app.schemas.user import CreateUserRequest
from app.security import bcrypt_context
from app.types.auth import AccessToken, Session
from repositories.refresh_token import RefreshTokenRepository
from repositories.user import UserRepository


class AuthService:
    user_repository = UserRepository()

    refresh_token_repository = RefreshTokenRepository()

    async def register(
        self,
        db: db_dependency,
        create_user_request: CreateUserRequest,
    ) -> User:

        user = await self.user_repository.get_user_by_email(
            db=db, email=create_user_request.email
        )

        if user:
            raise DuplicateEmailError()

        user = User(
            name=create_user_request.name,
            hashed_password=bcrypt_context.hash(create_user_request.password),
            email=create_user_request.email,
        )

        self.user_repository.add_user(db, user)

        await db.commit()

        await db.refresh(user)

        return user

    async def authenticate_user(
        self, email: str, password: str, db: db_dependency
    ) -> User | None:

        user = await self.user_repository.get_user_by_email(db, email=email)

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

        return await self.user_repository.get_user_by_id(
            db=db,
            id=user_id,
        )

    def hash_token(self, refresh_token: str) -> str:
        return hashlib.sha256(refresh_token.encode("utf-8")).hexdigest()

    async def create_session(self, user: User, db: db_dependency) -> Session:
        refresh_token = secrets.token_urlsafe(64)

        refresh_token_hashed = self.hash_token(refresh_token)

        await self.refresh_token_repository.delete_by_user_id(db, user.id)

        expires_at = datetime.now(UTC) + timedelta(
            seconds=settings.REFRESH_TOKEN_EXPIRE_SECONDS
        )

        token_model: RefreshToken = RefreshToken(
            user_id=user.id, expires_at=expires_at, token_hash=refresh_token_hashed
        )

        self.refresh_token_repository.insert(db, token_model)

        access_token = self.create_access_token(user_id=user.id)

        await db.commit()

        return {"access_token": access_token, "refresh_token": refresh_token}

    def create_access_token(self, user_id: int) -> str:
        encode: dict[str, Any] = {"id": user_id}

        expires = datetime.now(UTC) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINS
        )

        encode.update({"exp": expires})

        return jwt.encode(
            encode, settings.AUTH_SECRET_KEY, algorithm=settings.AUTH_ALGORITHM
        )

    async def refresh(self, refresh_token: str, db: db_dependency) -> AccessToken:

        refresh_token_hashed = self.hash_token(refresh_token)

        db_token = await self.refresh_token_repository.get_by_token(
            db, refresh_token_hashed
        )

        if not db_token:
            raise AuthError

        # prevent runtime errors and manually fetch user

        user = await self.user_repository.get_user_by_id(db, db_token.user_id)

        if not user:
            raise AuthError

        if db_token.expires_at < datetime.now(UTC):
            await self.refresh_token_repository.delete_by_user_id(db, user.id)

            await db.commit()

            raise AuthError

        access_token = self.create_access_token(user_id=user.id)

        return {"access_token": access_token, "token_type": "Bearer"}

    async def logout(self, refresh_token: str, db: db_dependency) -> None:

        hashed_token = self.hash_token(refresh_token)

        await self.refresh_token_repository.delete_by_token(db, hashed_token)

        await db.commit()
