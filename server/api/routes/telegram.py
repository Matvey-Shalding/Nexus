from typing import Annotated

from app.deps import db_dependency
from app.schemas.link import LinkResponse
from app.schemas.telegram_account import (
    Account,
    AccountExistsResponse,
    ConnectAccountRequest,
)
from fastapi import APIRouter, Header
from services.bot import BotService
from starlette import status

from .users import user_dependency

telegram_router = APIRouter(prefix="/telegram", tags=["telegram"])

bot_service = BotService()


@telegram_router.get(
    "/link", status_code=status.HTTP_200_OK, response_model=LinkResponse
)
async def get_bot_link(user: user_dependency, db: db_dependency) -> LinkResponse:

    link = await bot_service.get_link(user=user, db=db)

    return LinkResponse(link=link)


@telegram_router.post("/account", status_code=status.HTTP_200_OK)
async def connect_account(
    db: db_dependency,
    bot_id: Annotated[str, Header()],
    connect_account_request: ConnectAccountRequest,
):

    await bot_service.connect_account(
        bot_id=bot_id, connect_account_request=connect_account_request, db=db
    )


# frontend
@telegram_router.get(
    "/account", status_code=status.HTTP_200_OK, response_model=Account | None
)
async def get_account(db: db_dependency, current_user: user_dependency):

    return await bot_service.get_account(db, current_user)


# bot
@telegram_router.get(
    "/account/{telegram_user_id}",
    status_code=status.HTTP_200_OK,
    response_model=Account | None,
)
async def get_telegram_account_by_telegram_user_id(
    db: db_dependency, telegram_user_id: int
) -> AccountExistsResponse:

    res = await bot_service.get_account_by_telegram_user_id(db, telegram_user_id)

    return AccountExistsResponse(is_connected=bool(res))


@telegram_router.delete("/account", status_code=status.HTTP_200_OK)
async def delete_account(db: db_dependency, current_user: user_dependency):

    return await bot_service.delete_account(db, current_user)


@telegram_router.delete("/account/{telegram_user_id}", status_code=status.HTTP_200_OK)
async def delete_account_by_telegram_id(db: db_dependency, telegram_user_id: int):
    await bot_service.delete_account_by_telgram_id(db, telegram_user_id)
