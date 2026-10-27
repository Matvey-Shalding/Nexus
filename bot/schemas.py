from typing import TypedDict


class GetAccountResponse(TypedDict):
    is_connected: bool


class GetProfileResponse(TypedDict):
    name: str
    email: str
    created_at: str
