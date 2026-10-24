from datetime import UTC, datetime, timedelta

from app.models.telegram_account import TelegramAccount
from app.models.telegram_link import TelegramLink
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession


class BotRepository:
    async def create_link(self, db: AsyncSession, user_id: int, hashed_token: str):

        expires_at: datetime = datetime.now(UTC) + timedelta(minutes=15)

        link_model = TelegramLink(
            user_id=user_id, token_hash=hashed_token, expires_at=expires_at
        )

        db.add(link_model)

    async def get_link(self, db: AsyncSession, hashed_link: str) -> TelegramLink | None:
        res = await db.execute(
            select(TelegramLink).where(TelegramLink.token_hash == hashed_link)
        )

        return res.scalar_one_or_none()

    async def connect_telegram(
        self,
        db: AsyncSession,
        user_id: int,
        telegram_user_id: int,
        telegram_username: str,
        link: TelegramLink,
    ):

        account_model = TelegramAccount(
            telegram_user_id=telegram_user_id,
            user_id=user_id,
            telegram_username=telegram_username,
        )

        db.add(account_model)

        link.used_at = datetime.now(UTC)

    async def get_account_by_user_id(
        self, db: AsyncSession, user_id: int
    ) -> TelegramAccount | None:
        res = await db.execute(
            select(TelegramAccount).where(TelegramAccount.user_id == user_id)
        )

        return res.scalar_one_or_none()

    async def get_account_by_telegram_user_id(
        self, db: AsyncSession, telegram_user_id: int
    ) -> TelegramAccount | None:
        res = (
            await db.execute(
                select(TelegramAccount).where(
                    TelegramAccount.telegram_user_id == telegram_user_id
                )
            )
        ).scalar_one_or_none()

        return res

    async def delete_account_by_user_id(self, db: AsyncSession, user_id: int):

        await db.execute(
            delete(TelegramAccount).where(TelegramAccount.user_id == user_id)
        )

    async def delete_account_by_telegram_id(self, db: AsyncSession, telegram_id: int):

        await db.execute(
            delete(TelegramAccount).where(
                TelegramAccount.telegram_user_id == telegram_id
            )
        )
