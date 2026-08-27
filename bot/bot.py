import asyncio
import os

from aiogram import Bot,Dispatcher

from router import router

async def main():

    token = os.getenv("BOT_TOKEN")

    assert token

    bot = Bot(token)

    dp = Dispatcher()

    dp.include_router(router)

    await dp.start_polling(bot)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Bot was stopped")