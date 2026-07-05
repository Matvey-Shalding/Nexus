from typing import Annotated
import os

from fastapi import Depends, HTTPException
from jose import JWTError, jwt
from starlette import status

from app.deps import db_dependency
from app.models.user import User
from app.security import oauth2_bearer


from services.auth import AuthService


async def get_current_user(
    token: Annotated[str, Depends(oauth2_bearer)],
    db: db_dependency,
) -> User:

    user = await AuthService().get_user_by_token(token, db)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user.",
        )

    return user
