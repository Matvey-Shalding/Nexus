from app.database import Base

from datetime import datetime


from app.models.telegram_account import TelegramAccount


from .refresh_token import RefreshToken

from .task import Task

from .telegram_link import TelegramLink

from sqlalchemy.orm import Mapped, mapped_column, relationship

from sqlalchemy import String, DateTime, func


class User(Base):
    __tablename__: str = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    name: Mapped[str] = mapped_column(
        String(
            50,
        ),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    refresh_token: Mapped["RefreshToken"] = relationship(
        back_populates="user", uselist=False, cascade="all, delete-orphan"
    )

    telegram_links: Mapped[list["TelegramLink"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )

    telegram_account: Mapped["TelegramAccount | None"] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )

    tasks: Mapped[list["Task"]] = relationship(
        "Task", back_populates="user", cascade="all, delete-orphan"
    )

    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
