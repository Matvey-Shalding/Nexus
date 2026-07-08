from app.database import Base

from datetime import datetime

# hack to ignore linter warnings

from typing import TYPE_CHECKING

if TYPE_CHECKING:

    from .refresh_token import RefreshToken

from sqlalchemy.orm import Mapped,mapped_column,validates,relationship

from sqlalchemy import String,DateTime,func

import re

class User(Base):
    __tablename__ :str  = "users"

    id: Mapped[int] = mapped_column(primary_key=True,autoincrement=True)

    name: Mapped[str] = mapped_column(String(50,),nullable=False)

    email: Mapped[str] = mapped_column(String(50),unique=True,nullable=False)

    refresh_token: Mapped["RefreshToken"] = relationship(back_populates="user",uselist=False)
    
    hashed_password: Mapped[str] = mapped_column(String(255),nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    server_default=func.now(),
    onupdate=func.now(),
    )



