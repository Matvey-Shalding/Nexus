from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.refresh_token import RefreshToken


class RefreshTokenRepository:
    async def get_by_token(
        self, db: AsyncSession, hashed_token: str
    ) -> RefreshToken | None:
        result = (
            await db.execute(
                select(RefreshToken).where(RefreshToken.token_hash == hashed_token)
            )
        ).scalar_one_or_none()

        return result

    async def delete_by_user_id(
        self,
        db: AsyncSession,
        user_id: int,
    ) -> None:
        await db.execute(delete(RefreshToken).where(RefreshToken.user_id == user_id))

    async def delete_by_token(self, db: AsyncSession, hashed_token: str) -> None:
        await db.execute(
            delete(RefreshToken).where(RefreshToken.token_hash == hashed_token)
        )

    def insert(self, db: AsyncSession, refresh_token: RefreshToken) -> None:
        db.add(refresh_token)
