from fastapi import APIRouter, Cookie, HTTPException


from fastapi.responses import JSONResponse

from starlette import status

from app.deps import db_dependency

from services.auth import AuthService

from app.types.auth import AccessToken

from app.schemas.user import CreateUserRequest, LoginUserRequest

from starlette import status

from services.auth import AuthService

from app.config import REFRESH_TOKEN_EXPIRE_SECONDS, Environment

from app.error import AUTH_ERROR, NO_LOGIN_ERROR

auth_router = APIRouter(prefix="/auth", tags=["auth"])


@auth_router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(create_user_request: CreateUserRequest, db: db_dependency):

    await AuthService().register(db=db, create_user_request=create_user_request)


@auth_router.post("/login", status_code=status.HTTP_200_OK)
async def login(login_user_request: LoginUserRequest, db: db_dependency):

    service = AuthService()

    user = await service.authenticate_user(
        email=login_user_request.email, password=login_user_request.password, db=db
    )

    if not user:
        raise AUTH_ERROR

    session = await service.create_session(user=user, db=db)

    content = {"access_token": session.get("access_token"), "token_type": "Bearer"}

    response = JSONResponse(content=content)

    # refresh_token only stored in http only cookie

    response.set_cookie(
        "refresh_token",
        session.get("refresh_token"),
        httponly=True,
        max_age=REFRESH_TOKEN_EXPIRE_SECONDS,
        secure=Environment == Environment.PRODUCTION,
    )

    return response


@auth_router.post(
    "/refresh", response_model=AccessToken, status_code=status.HTTP_200_OK
)
async def refresh(db: db_dependency, refresh_token: str | None = Cookie(None)):

    try:

        if not refresh_token:
            raise NO_LOGIN_ERROR

        service = AuthService()

        return await service.refresh(refresh_token, db)

    except HTTPException as e:

        response = JSONResponse(content={"detail": "Session expired."}, status_code=401)

        response.delete_cookie(
            "refresh_token",
            httponly=True,
            secure=Environment == Environment.PRODUCTION,
        )

        return response


@auth_router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(db: db_dependency, refresh_token: str | None = Cookie(None)):

    service = AuthService()

    if refresh_token:
        await service.logout(refresh_token, db)

    response = JSONResponse(content=None)

    response.delete_cookie(
        "refresh_token",
        httponly=True,
        secure=Environment == Environment.PRODUCTION,
    )

    return response
