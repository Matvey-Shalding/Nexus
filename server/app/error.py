from fastapi import HTTPException
from starlette import status


AUTH_ERROR = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate user.",
)

DUPLICATE_EMAIL_ERROR = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail="Such email already exists.",
)

NO_LOGIN_ERROR = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="User is not logged in.",
)


class ValidationError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
        )


class InvalidName(ValidationError):
    def __init__(self):
        super().__init__("Name length must be between 2 and 20 characters.")


class InvalidPassword(ValidationError):
    def __init__(self):
        super().__init__("Password length must be between 6 and 20 characters.")


class InvalidEmail(ValidationError):
    def __init__(self):
        super().__init__("Email address is invalid.")

class InvalidDate(ValidationError):
    def __init__(self):
        super().__init__("Expired dates are not allowed.")