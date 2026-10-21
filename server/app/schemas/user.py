from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class CreateUserRequest(BaseModel):
    name: str = Field(min_length=2, max_length=20)

    email: EmailStr

    password: str = Field(min_length=6, max_length=20)


class LoginUserRequest(BaseModel):
    email: str

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
    name: str | None = Field(min_length=2, max_length=20)
    email: EmailStr | None = None
