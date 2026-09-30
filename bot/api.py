from httpx import AsyncClient


class API:

    client: AsyncClient

    def __init__(self, base_url: str, bot_id: str):
        self.client = AsyncClient(base_url=base_url, headers={"bot-id": bot_id})

    async def connect_telegram(
        self, telegram_user_id: int, link: str, telegram_username: str
    ):

        data: dict[str, str | int] = {
            "telegram_user_id": telegram_user_id,
            "link": link,
            "telegram_username": telegram_username,
        }

        response = (await self.client.post(url="/telegram/account", json=data)).json()

        print("Response", response)
