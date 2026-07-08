from sqlalchemy import select
from app.models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.user import CreateUserRequest
from app.security import bcrypt_context



class UserRepository:
    async def get_user_by_email(self,db: AsyncSession, email: str):
        result = await db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()
    
    async def get_user_by_id(self,db: AsyncSession, id:int):
        result = await db.execute(select(User).where(User.id == id))
        return result.scalar_one_or_none()
    
    
    async def add_user(self,create_user_request: CreateUserRequest,db:AsyncSession):
        user_model = User(
            name=create_user_request.name,
            hashed_password=bcrypt_context.hash(create_user_request.password),
            email=create_user_request.email,
        )


        db.add(user_model)

        await db.commit()

        await db.refresh(user_model)

        return user_model
