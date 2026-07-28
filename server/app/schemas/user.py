from pydantic import BaseModel

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

class UpdateUserRequest(BaseModel):
    name: str | None = None
    email: str | None = None

    