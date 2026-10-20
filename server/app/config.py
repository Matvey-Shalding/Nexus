from enum import Enum
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Environment(Enum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"


ENV_PATH = Path(__file__).resolve().parent.parent / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=ENV_PATH, extra="ignore")
    AUTH_SECRET_KEY: str = Field(...)
    AUTH_ALGORITHM: str = Field(...)
    DATABASE_URL: str = Field(...)
    ENVIRONMENT: Environment = Environment.DEVELOPMENT
    TELEGRAM_BOT_ID: str = Field(...)
    TELEGRAM_BOT_NAME: str = Field(...)
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    REFRESH_TOKEN_EXPIRE_SECONDS: int = 2592000  # 30 days
    ACCESS_TOKEN_EXPIRE_MINS: int = 20


settings = Settings()  # type: ignore
