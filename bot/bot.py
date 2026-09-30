import asyncio
import os

from aiogram import Bot, Dispatcher

from router import router

from decouple import config


async def main():
    token = config("BOT_TOKEN", cast=str, default="")

    assert token

    bot = Bot(str(token))

    dp = Dispatcher()

    dp.include_router(router)

    await dp.start_polling(bot)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Bot was stopped")
