import hashlib
import secrets
from datetime import UTC, datetime

from app.config import settings
from app.error import (
    ExpiredTelegramLink,
    InvalidBotId,
    InvalidTelegramLink,
    TelegramAccountAlreadyConnected,
    UsedTelegramLink,
)
from app.models.telegram_account import TelegramAccount
from app.models.user import User
from app.schemas.telegram_account import ConnectAccountRequest
from repositories.bot import BotRepository
from sqlalchemy.ext.asyncio import AsyncSession


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

        await db.commit()

        return f"https://t.me/{settings.TELEGRAM_BOT_NAME}?start={raw_token}"

    def _validate_bot(self, bot_id: str):

        return settings.TELEGRAM_BOT_ID == bot_id

    async def connect_account(
        self,
        db: AsyncSession,
        bot_id: str,
        connect_account_request: ConnectAccountRequest,
    ):

        telegram_user_id, link, telegram_username = (
            connect_account_request.model_dump().values()
        )

        if not self._validate_bot(bot_id=bot_id):
            raise InvalidBotId()

        hashed_link = self._hash_telegram_link(link)

        db_link = await self.bot_repository.get_link(db=db, hashed_link=hashed_link)

        if not db_link:
            raise InvalidTelegramLink()

        if db_link.used_at is not None:
            raise UsedTelegramLink()

        if db_link.expires_at < datetime.now(UTC):
            raise ExpiredTelegramLink()

        existing_account = await self.bot_repository.get_account_by_user_id(
            db, db_link.user_id
        )

        if existing_account:
            raise TelegramAccountAlreadyConnected()

        existing_telegram_account = (
            await self.bot_repository.get_account_by_telegram_user_id(
                db, telegram_user_id
            )
        )

        if existing_telegram_account:
            raise TelegramAccountAlreadyConnected()

        await self.bot_repository.connect_telegram(
            db=db,
            user_id=db_link.user_id,
            telegram_user_id=telegram_user_id,
            link=db_link,
            telegram_username=telegram_username,
        )

        await db.commit()

    async def get_account(
        self, db: AsyncSession, current_user: User
    ) -> TelegramAccount | None:

        return await self.bot_repository.get_account_by_user_id(db, current_user.id)

    async def delete_account(self, db: AsyncSession, current_user: User):
        await self.bot_repository.delete_account_by_user_id(db, current_user.id)

        await db.commit()

    async def delete_account_by_telgram_id(
        self, db: AsyncSession, telegram_user_id: int
    ):
        await self.bot_repository.delete_account_by_telegram_id(db, telegram_user_id)

        await db.commit()

    async def get_account_by_telegram_user_id(
        self, db: AsyncSession, telegram_user_id: int
    ):

        return await self.bot_repository.get_account_by_telegram_user_id(
            db, telegram_user_id
        )
