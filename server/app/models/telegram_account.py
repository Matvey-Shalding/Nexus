from datetime import datetime

from sqlalchemy import BigInteger, DateTime, ForeignKey, func, null

from app.database import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.user import User


class TelegramAccount(Base):
    __tablename__ = "telegram_accounts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    telegram_user_id: Mapped[int] = mapped_column(BigInteger,nullable=False,unique=True)

    user: Mapped["User"] = relationship(back_populates="telegram_account")

    user_id: Mapped[int] = mapped_column(ForeignKey(column="users.id",ondelete="CASCADE"),unique=True,nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

