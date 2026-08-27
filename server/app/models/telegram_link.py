from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, func

from app.database import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.user import User


class TelegramLink(Base):
    __tablename__: str = "telegram_links"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    token_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    user: Mapped["User"] = relationship(back_populates="telegram_links")

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    expires_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )

    used_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
