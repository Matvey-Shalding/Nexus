from typing import Annotated

from app.models.telegram_link import TelegramLink
from services.bot import BotService

from .users import user_dependency

from app.schemas.link import LinkResponse

from app.schemas.telegram_account import Account, ConnectAccountRequest

from fastapi import APIRouter, Header

from starlette import status

from app.deps import db_dependency

telegram_router = APIRouter(prefix="/telegram", tags=["telegram"])


@telegram_router.get(
    "/link", status_code=status.HTTP_200_OK, response_model=LinkResponse
)
async def get_bot_link(user: user_dependency, db: db_dependency) -> LinkResponse:

    link = await BotService().get_link(user=user, db=db)

    return LinkResponse(link=link)


@telegram_router.post("/account", status_code=status.HTTP_200_OK)


async def connect_account(
    db: db_dependency,
    bot_id: Annotated[str, Header()],
    connect_account_request: ConnectAccountRequest,
):

    await BotService().connect_account(
        bot_id=bot_id, connect_account_request=connect_account_request, db=db
    )


@telegram_router.get(
    "/account", status_code=status.HTTP_200_OK, response_model=Account | None
)
async def get_account(db: db_dependency, current_user: user_dependency):

    return await BotService().get_account(db, current_user)

@telegram_router.delete(
    "/account", status_code=status.HTTP_200_OK
)
async def delete_account(db: db_dependency, current_user: user_dependency):

    return await BotService().delete_account(db, current_user)