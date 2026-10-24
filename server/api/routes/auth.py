from fastapi import APIRouter, Cookie, HTTPException, Response
from starlette import status

from app.config import Environment, settings
from app.deps import db_dependency
from app.error import AuthError, NoLoginError
from app.schemas.auth import Session
from app.schemas.user import CreateUserRequest, LoginUserRequest
from services.auth import AuthService

auth_router = APIRouter(prefix="/auth", tags=["auth"])

service = AuthService()


def _set_auth_cookie(refresh_token: str, response: Response):
    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        max_age=settings.REFRESH_TOKEN_EXPIRE_SECONDS,
        secure=settings.ENVIRONMENT == Environment.PRODUCTION,
        samesite="lax",
    )


def _clear_auth_cookie(response: Response):
    response.delete_cookie(
        "refresh_token",
        httponly=True,
        secure=settings.ENVIRONMENT == Environment.PRODUCTION,
        samesite="lax",
    )


@auth_router.post(
    "/register", status_code=status.HTTP_201_CREATED, response_model=Session
)
async def register(
    create_user_request: CreateUserRequest, response: Response, db: db_dependency
):

    user = await service.register(db=db, create_user_request=create_user_request)

    access_token, refresh_token = await service.create_session(user=user, db=db)

    _set_auth_cookie(refresh_token, response)

    return {"access_token": access_token, "token_type": "Bearer"}


@auth_router.post("/login", status_code=status.HTTP_200_OK, response_model=Session)
async def login(
    login_user_request: LoginUserRequest, db: db_dependency, response: Response
):

    user = await service.authenticate_user(
        email=login_user_request.email, password=login_user_request.password, db=db
    )

    if not user:
        raise AuthError

    access_token, refresh_token = await service.create_session(user=user, db=db)

    _set_auth_cookie(refresh_token, response)

    return {"access_token": access_token, "token_type": "Bearer"}


@auth_router.post("/refresh", response_model=Session, status_code=status.HTTP_200_OK)
async def refresh(
    db: db_dependency, response: Response, refresh_token: str | None = Cookie(None)
):

    try:
        if not refresh_token:
            raise NoLoginError

        access_token: str = await service.refresh(db, refresh_token)

        return {"access_token": access_token, "token_type": "Bearer"}

    except HTTPException:
        if refresh_token:
            _clear_auth_cookie(response)

        raise AuthError()


@auth_router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(
    db: db_dependency, response: Response, refresh_token: str | None = Cookie(None)
):

    if refresh_token:
        await service.logout(db, refresh_token)
        _clear_auth_cookie(response)
