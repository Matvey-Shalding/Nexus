from datetime import datetime, timezone
import hashlib
import os
import secrets

from app.models.user import User
from repositories.bot import BotRepository
from sqlalchemy.ext.asyncio import AsyncSession

from app.error import (
    ExpiredTelegramLink,
    InvalidBotId,
    InvalidTelegramLink,
    UsedTelegramLink,
)


class BotService:

    bot_repository = BotRepository()

    def _generate_telegram_link(self) -> str:
        return secrets.token_urlsafe(32)

    def _hash_telegram_link(self, link: str) -> str:
        return hashlib.sha256(link.encode()).hexdigest()

    async def get_link(self, user: User, db: AsyncSession) -> str:

        raw_token = self._generate_telegram_link()

        hashed_token = self._hash_telegram_link(raw_token)

        await self.bot_repository.create_link(db, user.id, hashed_token)

        return f"https://t.me/{os.getenv('TELEGRAM_BOT_NAME')}?start={raw_token}"

    def _validate_bot(self, bot_id: str):

        my_bot_id = os.getenv("TELEGRAM_BOT_ID")

        return my_bot_id == bot_id

    async def connect_account(
        self, telegram_user_id: int, link: str, db: AsyncSession, bot_id: str
    ):

        if not self._validate_bot(bot_id=bot_id):
            raise InvalidBotId()

        hashed_link = self._hash_telegram_link(link)

        db_link = await self.bot_repository.get_link(db=db, hashed_link=hashed_link)

        if not db_link:
            raise InvalidTelegramLink()

        if db_link.used_at is not None:
            raise UsedTelegramLink()

        if db_link.expires_at < datetime.now(timezone.utc):
            raise ExpiredTelegramLink()

        await self.bot_repository.connect_telegram(
            db=db,
            user_id=db_link.user_id,
            telegram_user_id=telegram_user_id,
            link=db_link,
        )
