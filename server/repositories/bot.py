import os

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from datetime import datetime, timedelta, timezone

from app.models.telegram_link import TelegramLink

from app.security import bcrypt_context
from app.models.telegram_account import TelegramAccount


class BotRepository:
    async def create_link(self, db: AsyncSession, user_id: int, hashed_token: str):

        expires_at: datetime = datetime.now(timezone.utc) + timedelta(minutes=15)

        link_model = TelegramLink(
            user_id=user_id, token_hash=hashed_token, expires_at=expires_at
        )

        db.add(link_model)

        await db.commit()

        await db.refresh(link_model)

    async def get_link(self, db: AsyncSession, hashed_link: str) -> TelegramLink | None:
        res = await db.execute(
            select(TelegramLink).where(TelegramLink.token_hash == hashed_link)
        )

        return res.scalar_one_or_none()

    async def connect_telegram(
        self, db: AsyncSession, user_id: int, telegram_user_id: int, link: TelegramLink
    ):

        account_model = TelegramAccount(
            telegram_user_id=telegram_user_id, user_id=user_id
        )

        db.add(account_model)

        setattr(link, "used_at", datetime.now(timezone.utc))

        await db.commit()

        await db.refresh(account_model)

        await db.refresh(link)
