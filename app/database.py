import os

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from sqlalchemy.orm import DeclarativeBase


from dotenv import load_dotenv

load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")

assert DATABASE_URL

# database engine

engine = create_async_engine(DATABASE_URL)

# one connection to a conversation

SessionLocal = async_sessionmaker(bind=engine, autoflush=False, autocommit=False)

# a util function which is used to create a db session and automatically close it


async def get_db():

    db = SessionLocal()

    try:

        # return a connection

        yield db

    finally:

        # close a connection

        await db.close()


# base class for all sqlalcehmy models


class Base(DeclarativeBase):
    pass
