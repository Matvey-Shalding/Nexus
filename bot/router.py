from typing import Any

from aiogram import Router

from aiogram.filters import CommandStart, CommandObject

from aiogram.utils.deep_linking import decode_payload

from aiogram.types import Message

from api import API

from decouple import config

router = Router()


@router.message(CommandStart(deep_link=True))
async def cmd_start(message: Message, command: CommandObject):

    TOKEN: Any = config("BOT_TOKEN", cast=str, default="")

    API_URL = config("API_URL", cast=str, default="")

    BASE_URL: Any = config("API_URL", cast=str, default="")

    BOT_ID: Any = config("BOT_ID", cast=str, default="")

    assert API_URL

    assert BASE_URL

    link = command.args

    if not link:
        await message.answer("You don't have any telegram account connected")
    else:
        if message.from_user and message.from_user.username:
            await API(base_url=BASE_URL, bot_id=BOT_ID).connect_telegram(
                telegram_username=message.from_user.username,
                telegram_user_id=message.from_user.id,
                link=link,
            )

    await message.answer(
        f"Your payload: {link}/n Your username: {message.from_user.username if message.from_user else ''}"
    )
