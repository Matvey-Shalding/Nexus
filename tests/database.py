from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from app.database import Base

from api.main  import app

TEST_DATABASE_URL="postgresql+asyncpg://postgres:123456@localhost:5432/test_nexus"

engine = create_async_engine(TEST_DATABASE_URL)

TestingSessionLocal = async_sessionmaker(bind=engine, autoflush=False, autocommit=False)

async def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        await db.close()
    

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def drop_tables():

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
