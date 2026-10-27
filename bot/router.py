import logging
from datetime import datetime

from aiogram import F, Router
from aiogram.filters import CommandObject, CommandStart
from aiogram.types import CallbackQuery, Message
from aiogram.utils.formatting import Bold, Text

from .api import API
from .keyboard import (
    connected_keyboard,
    inline_not_connected_keyboard,
    not_connected_keyboard,
    settings_disconnect_keyboard,
    settings_keyboard,
)
from .schemas import GetProfileResponse

logger = logging.getLogger(__name__)
router = Router()
API_instance = API()


@router.message(CommandStart())
async def cmd_start(message: Message, command: CommandObject):
    if not message.from_user:
        return

    telegram_user_id = message.from_user.id
    telegram_username = message.from_user.username
    link = command.args

    try:
        if link:
            await API_instance.connect_telegram(
                telegram_user_id=telegram_user_id,
                telegram_username=telegram_username or "",
                link=link,
            )
            await message.answer(
                "Your Nexus account has been successfully connected.",
                reply_markup=connected_keyboard(),
            )
            return

        account = await API_instance.get_telegram(telegram_user_id)

        if account["is_connected"]:
            await message.answer(
                f"Welcome back, {telegram_username or 'there'}!",
                reply_markup=connected_keyboard(),
            )
        else:
            await message.answer(
                "Your Nexus account isn't connected yet.",
                reply_markup=not_connected_keyboard(),
            )

    except Exception as _:
        logger.exception("Failed to connect or retrieve Telegram account.")
        await message.answer(
            "I couldn't verify your Nexus account. Please try again later."
        )


@router.message(F.text == "⚙️ Settings")
async def open_settings(message: Message):
    await message.answer(
        "⚙️ Settings\n\nManage your Nexus account.\nChoose an option:",
        reply_markup=settings_keyboard(),
    )


@router.message(F.text == "🔗 Connect Nexus Account")
async def connect_account(message: Message):
    await message.answer(
        "Connect your Nexus account.\nTo use Nexus through Telegram, you first need to link your account.\nLink: http://localhost:3000/?connect=telegram",
        reply_markup=inline_not_connected_keyboard(),
    )


@router.callback_query(F.data == "settings:back")
async def go_back(call: CallbackQuery):
    await call.answer()

    if not call.message:
        return

    await call.message.answer(
        text="Back to main menu", reply_markup=connected_keyboard()
    )


@router.callback_query(F.data == "settings:profile")
async def open_profile(call: CallbackQuery):
    await call.answer()

    if not call.message:
        return

    try:
        profile: GetProfileResponse = await API_instance.get_profile(call.from_user.id)
    except Exception:
        logger.exception("Failed to load profile for user %s", call.from_user.id)
        await call.message.answer(
            "Something went wrong while loading your profile. Please try again."
        )
        return

    timestamp = profile.get("created_at")
    formatted_date = (
        datetime.fromisoformat(timestamp).strftime("%B %d, %Y")
        if timestamp
        else "Unknown"
    )

    profile_text = Text(
        Bold("Your Nexus profile"),
        "\n\n",
        Bold("Name"),
        "\n",
        profile.get("name") or "Not set",
        "\n\n",
        Bold("Email"),
        "\n",
        profile.get("email") or "Not set",
        "\n\n",
        Bold("Member since"),
        "\n",
        formatted_date,
    )

    if isinstance(call.message, Message):
        await call.message.edit_text(
            text=profile_text.as_html(),
            parse_mode="HTML",
            # reply_markup=connected_keyboard(),
        )


@router.callback_query(F.data == "settings:disconnect")
async def disconnect_telegram(call: CallbackQuery):
    await call.answer()

    if not call.message:
        return

    if isinstance(call.message, Message):
        await call.message.edit_text(
            text="🔌 Disconnect Nexus\nAre you sure you want to disconnect your account? Telegram features that require a linked Nexus account will stop working.",
            reply_markup=settings_disconnect_keyboard(),
        )


@router.callback_query(F.data == "settings:disconnect:confirm")
async def disconnect_telegram_confirm(call: CallbackQuery):
    await call.answer()

    if not call.message:
        return

    try:
        await API_instance.disconnect_telegram(call.from_user.id)

        if isinstance(call.message, Message):
            await call.message.edit_text(
                text="Account successfully disconnected.",
            )
            await call.message.answer(
                "You are now disconnected.", reply_markup=not_connected_keyboard()
            )

    except Exception as _:
        logger.exception("Failed to disconnect account for user %s", call.from_user.id)
        await call.message.answer(
            "Something went wrong while disconnecting your account. Please try again."
        )
