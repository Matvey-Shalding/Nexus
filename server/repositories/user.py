from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


class UserRepository:
    async def get_user_by_email(self, db: AsyncSession, email: str) -> User | None:
        result = await db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def get_user_by_id(self, db: AsyncSession, id: int) -> User | None:
        result = await db.execute(select(User).where(User.id == id))
        return result.scalar_one_or_none()

    def add_user(self, db: AsyncSession, user_model: User) -> User:
        db.add(user_model)
        return user_model

    def update_user(self, db: AsyncSession, data: dict, current_user: User) -> User:
        for key, value in data.items():
            setattr(current_user, key, value)

        return current_user
