from sqlalchemy.ext.asyncio import AsyncSession

from datetime import datetime,timedelta

from app.models.telegram_link import TelegramLink

class BotRepository:
    async def create_link(self,db: AsyncSession,user_id: int,hashed_token: str):

        expires_at: datetime = datetime.now() + timedelta(minutes=15)

        link_model = TelegramLink(
            user_id=user_id,
            token_hash=hashed_token,
            expires_at=expires_at
        )

        db.add(link_model)

        await db.commit()

        await db.refresh(link_model)