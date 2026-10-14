from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
)


def not_connected_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="🔗 Connect Nexus Account")]],
        resize_keyboard=True,
        input_field_placeholder="Connect your account to start...",
    )


def inline_not_connected_keyboard():
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🔗 Open Nexus to connect",
                    callback_data="connect_account"
                )
            ]
        ]
    )


def connected_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="📋 Tasks"), KeyboardButton(text="⚙️ Settings")]],
        resize_keyboard=True,
        input_field_placeholder="Select an option...",
    )


def settings_keyboard():
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="👤 Profile",
                    callback_data="settings:profile",
                )
            ],
            [
                InlineKeyboardButton(
                    text="🔌 Disconnect",
                    callback_data="settings:disconnect",
                )
            ],
            [InlineKeyboardButton(text="Back", callback_data="settings:back")],
        ]
    )


def settings_disconnect_keyboard():
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Yes, disconnect",
                    callback_data="settings:disconnect:confirm",
                )
            ],
            [
                InlineKeyboardButton(
                    text="Cancel",
                    callback_data="settings:disconnect",
                )
            ],
        ]
    )
