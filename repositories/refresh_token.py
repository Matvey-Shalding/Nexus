from datetime import datetime

from sqlalchemy import delete, insert, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.refresh_token import RefreshToken

from app.models.user import User


class RefreshTokenRepository():
    async def get_by_token(self,hashed_token:str,db: AsyncSession) -> RefreshToken | None:
        result = (await db.execute(select(RefreshToken).where(RefreshToken.token_hash == hashed_token))).scalar_one_or_none()

        return result
    
    async def delete_by_user_id(self,user_id:int,db:AsyncSession):

        await db.execute(delete(RefreshToken).where(RefreshToken.user_id == user_id))

    async def delete_by_token(self,hashed_token:str,db:AsyncSession):

        await db.execute(delete(RefreshToken).where(RefreshToken.token_hash == hashed_token))


    async def insert(self,db:AsyncSession,user: User,expires_at:datetime,refresh_token_hashed:str):
        await db.execute(insert(RefreshToken).values(user_id = user.id,expires_at=expires_at,token_hash=refresh_token_hashed))




