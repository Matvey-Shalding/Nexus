from httpx import AsyncClient

from .schemas import GetAccountResponse, GetProfileResponse


class API:
    async def connect_telegram(
        self,
        telegram_user_id: int,
        link: str,
        telegram_username: str,
        client: AsyncClient,
    ):

        data: dict[str, str | int] = {
            "telegram_user_id": telegram_user_id,
            "link": link,
            "telegram_username": telegram_username,
        }

        await client.post(url="/telegram/account", json=data)

    async def get_telegram(
        self, telegram_user_id: int, client: AsyncClient
    ) -> GetAccountResponse:

        return (await client.get(url=f"/telegram/account/{telegram_user_id}")).json()

    async def get_profile(
        self, telegram_user_id: int, client: AsyncClient
    ) -> GetProfileResponse:
        return (await client.get(url=f"/users/{telegram_user_id}/me")).json()

    async def disconnect_telegram(self, telegram_user_id: int, client: AsyncClient):
        await client.delete(url=f"/telegram/account/{telegram_user_id}")
