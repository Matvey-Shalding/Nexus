from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.error import AuthError, TelegramAccountNotFound
from app.models.user import User
from app.schemas.user import UpdateUserRequest
from repositories.bot import BotRepository
from repositories.user import UserRepository


class UserService:
    user_repository = UserRepository()

    bot_repository = BotRepository()

    async def update_user(
        self, request: UpdateUserRequest, db: AsyncSession, current_user: User
    ) -> User:

        data = request.model_dump(exclude_unset=True)

        if "email" in data:
            email = data["email"]
            user = await self.user_repository.get_user_by_email(db=db, email=email)

            if user and user.id != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Such email already exists.",
                )

        user = self.user_repository.update_user(db, data, current_user)

        await db.commit()

        await db.refresh(user)

        return user

    async def get_user_by_telegram_id(
        self, telegram_user_id: int, db: AsyncSession
    ) -> User:
        account = await self.bot_repository.get_account_by_telegram_user_id(
            db, telegram_user_id
        )

        if not account:
            raise TelegramAccountNotFound()

        user = await self.user_repository.get_user_by_id(db, account.user_id)

        if not user:
            raise AuthError()

        return user
