from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from starlette import status

from app.deps import db_dependency
from app.models.user import User
from app.security import http_bearer
from services.auth import AuthService


async def get_current_user(
    db: db_dependency,
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(http_bearer)],
) -> User:

    token = credentials.credentials

    user = await AuthService().get_user_by_token(token, db)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user.",
        )

    return user


user_dependency = Annotated[User, Depends(get_current_user)]
