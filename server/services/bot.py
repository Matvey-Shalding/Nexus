import secrets

from app.security import bcrypt_context
from app.models.user import User
from repositories.bot import BotRepository
from sqlalchemy.ext.asyncio import AsyncSession


class BotService:

    bot_repository = BotRepository()

    def _generate_telegram_link(self) -> str:
        return secrets.token_urlsafe(32)

    def _hash_telegram_link(self, link: str) -> str:
        return bcrypt_context.hash(link)

    async def get_link(self, user: User, db: AsyncSession) -> str:

        raw_token = self._generate_telegram_link()

        hashed_token = self._hash_telegram_link(raw_token)

        await self.bot_repository.create_link(db, user.id, hashed_token)

        return raw_token
