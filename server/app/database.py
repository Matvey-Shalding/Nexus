from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

# database engine

engine: AsyncEngine = create_async_engine(settings.DATABASE_URL, pool_pre_ping=True)


# one connection to a conversation

SessionLocal = async_sessionmaker(
    bind=engine, autoflush=False, autocommit=False, expire_on_commit=False
)

# a util function which is used to create a db session and automatically close it


async def get_db():

    db = SessionLocal()

    try:
        # return a connection

        yield db

    except Exception:
        await db.rollback()
        raise

    finally:
        # close a connection

        await db.close()


# base class for all sqlalcehmy models


class Base(DeclarativeBase):
    pass
