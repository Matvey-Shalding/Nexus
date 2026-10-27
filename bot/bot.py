import asyncio
import logging

from aiogram import Bot, Dispatcher

from .config import Config
from .router import router


async def main():

    config = Config()

    bot = Bot(str(config.BOT_TOKEN))

    dp = Dispatcher()

    dp.include_router(router)

    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Bot was stopped")
