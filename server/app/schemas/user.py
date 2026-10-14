from pydantic import BaseModel

from datetime import datetime

class CreateUserRequest(BaseModel):
    name: str

    email:str

    password:str


class LoginUserRequest(BaseModel):

    email:str

    password: str

class UserResponse(BaseModel):
    name: str
    id: int
    email: str

class UserResponseForTelegram(BaseModel):
    name: str
    email: str
    created_at: datetime

class UpdateUserRequest(BaseModel):
    name: str | None = None
    email: str | None = None

    