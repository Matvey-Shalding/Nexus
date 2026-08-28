from fastapi import HTTPException
from starlette import status


class NotFoundError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
        )


class ValidationError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
        )


class UnauthorizedError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
        )


class ConflictError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=detail,
        )


class DuplicateEmailError(ConflictError):
    def __init__(self):
        super().__init__("Such email already exists.")


class AuthError(UnauthorizedError):
    def __init__(self):
        super().__init__("Could not validate user.")


class NoLoginError(UnauthorizedError):
    def __init__(self):
        super().__init__("User is not logged in.")


class InvalidBotId(UnauthorizedError):
    def __init__(self):
        super().__init__("Invalid bot id.")


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


class InvalidTaskId(NotFoundError):
    def __init__(self):
        super().__init__("Such task does not exist.")


class InvalidTelegramLink(ValidationError):
    def __init__(self):
        super().__init__("Telegram link is invalid.")


class ExpiredTelegramLink(ValidationError):
    def __init__(self):
        super().__init__("Telegram link has expired.")


class UsedTelegramLink(ValidationError):
    def __init__(self):
        super().__init__("Telegram link has already been used.")
