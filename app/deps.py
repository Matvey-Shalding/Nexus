from typing import Annotated

from fastapi import Depends


from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db

from app.models.user import User

from dependencies.user import get_current_user



db_dependency = Annotated[AsyncSession,Depends(get_db)]

user_dependency = Annotated[User, Depends(get_current_user)]