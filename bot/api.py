from typing import Any

from httpx import AsyncClient

from .config import Config
from .schemas import GetAccountResponse, GetProfileResponse


class API:
    client: AsyncClient

    def __init__(self):

        config = Config()

        self.client = AsyncClient(
            base_url=config.BASE_URL, headers={"bot-id": config.BOT_ID}
        )

    async def connect_telegram(
        self, telegram_user_id: int, link: str, telegram_username: str
    ):

        data: dict[str, str | int] = {
            "telegram_user_id": telegram_user_id,
            "link": link,
            "telegram_username": telegram_username,
        }

        await self.client.post(url="/telegram/account", json=data)

    async def get_telegram(self, telegram_user_id: int) -> GetAccountResponse:

        return (
            await self.client.get(url=f"/telegram/account/{telegram_user_id}")
        ).json()

    async def get_profile(self, telegram_user_id: int) -> GetProfileResponse:
        return (await self.client.get(url=f"/users/{telegram_user_id}/me")).json()

    async def disconnect_telegram(self, telegram_user_id: int):
        await self.client.delete(url=f"/telegram/account/{telegram_user_id}")
