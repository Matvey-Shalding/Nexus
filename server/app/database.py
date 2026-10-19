import asyncio
import os

from dotenv import load_dotenv
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")

assert DATABASE_URL

# database engine

engine: AsyncEngine = create_async_engine(DATABASE_URL, pool_pre_ping=True)


# async def check_connection(engine: AsyncEngine):
#     async with engine.connect() as conn:
#         await conn.execute(text("SELECT 1"))
#         await engine.dispose()


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
