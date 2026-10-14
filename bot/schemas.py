from typing import TypedDict

from datetime import datetime

class GetAccountResponse(TypedDict):
        is_connected: bool

class GetProfileResponse(TypedDict):
    name: str
    email: str
    created_at: str
