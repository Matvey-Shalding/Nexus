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

class InvalidPassword(Exception):
    """Exception raised when password length is too short(big)"""
    pass

class InvalidName(Exception):
    """Exception raised when name length is too short(big)"""
    pass

class InvalidEmail(Exception):
    """Exception raised when email is invalid"""
    pass