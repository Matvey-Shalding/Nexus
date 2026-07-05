from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User

from typing import Annotated
import os

from fastapi import Depends, HTTPException
from jose import JWTError, jwt
from starlette import status

from app.deps import db_dependency
from app.models.user import User
from app.security import oauth2_bearer

from repositories.user import UserRepository
from app.schemas.user import UpdateUserRequest


class UserService:

    
    async def update_user(self,request: UpdateUserRequest,db: AsyncSession,current_user: User) -> User:
        
        data = request.model_dump(exclude_unset=True)

        # validate such user exists

        if "email" in data:

            user = await UserRepository().get_user_by_email(
                db=db, email=data["email"]
            )

            if user and user.id != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Such email already exists.",
                )
        
        for key,value in data.items():
            setattr(current_user,key,value)
        
        await db.commit()

        await db.refresh(current_user)

        return current_user


        

