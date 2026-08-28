from app.models.telegram_link import TelegramLink
from services.bot import BotService

from .users import user_dependency

from app.schemas.link import LinkResponse

from fastapi import APIRouter

from starlette import status

from app.deps import db_dependency

telegram_router = APIRouter(prefix="/telegram", tags=["telegram"])


@telegram_router.get(
    "/link", status_code=status.HTTP_200_OK, response_model=LinkResponse
)
async def get_bot_link(user: user_dependency, db: db_dependency) -> LinkResponse:

    link = await BotService().get_link(user=user, db=db)

    return LinkResponse(link=link)

@telegram_router.post("/account",status_code=status.HTTP_200_OK)

async def connect_account(db: db_dependency,telegram_user_id: int,link:str,bot_id: str):

    await BotService().connect_account(telegram_user_id=telegram_user_id,link=link,db=db,bot_id=bot_id)



