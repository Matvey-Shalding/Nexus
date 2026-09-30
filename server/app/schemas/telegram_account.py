from pydantic import BaseModel


class ConnectAccountRequest(BaseModel):
    telegram_user_id: int
    link: str
    telegram_username: str

class Account(BaseModel):
    telegram_username: str