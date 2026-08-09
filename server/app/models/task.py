import enum

from sqlalchemy import Boolean, CheckConstraint, Date, Enum, Float, ForeignKey, Integer

from sqlalchemy import DateTime, String, func

from app.database import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship

from datetime import date, datetime

from typing import TYPE_CHECKING

from app.enums.priority import PriorityEnum

if TYPE_CHECKING:
    from app.models.user import User


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    title: Mapped[str] = mapped_column(
        String(1024),
        nullable=False,
    )

    due_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    priority: Mapped[PriorityEnum] = mapped_column(
        Integer,
        default=PriorityEnum.DEFAULT,
        nullable=False,
    )

    completed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    position: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="tasks", cascade="all, delete")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    __table_args__ = (
        CheckConstraint(
            "priority IN (0,1,2,3)",
            name="ck_task_priority",
        ),
    )
