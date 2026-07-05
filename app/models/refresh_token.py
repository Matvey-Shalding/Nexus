from app.database import Base

from datetime import datetime

from sqlalchemy import ForeignKey, String,DateTime,func

# hack to ignore linter warnings

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.user import User

from sqlalchemy.orm import Mapped,mapped_column,relationship

class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id: Mapped[int] = mapped_column(primary_key=True,autoincrement=True)

    user : Mapped["User"] = relationship(back_populates="refresh_token")

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"),unique=True)

    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True),nullable=False)

    token_hash: Mapped[str] = mapped_column(String(255),nullable=False)

    created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    server_default=func.now(),
    )