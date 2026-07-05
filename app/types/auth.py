from typing import TypedDict


class Session(TypedDict):
    access_token: str
    refresh_token:str

class AccessToken(TypedDict):
    access_token: str
    token_type:str