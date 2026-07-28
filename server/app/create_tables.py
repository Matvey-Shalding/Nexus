# create_tables.py

import asyncio

from app.database import Base, engine

# import ALL models
from app.models.user import User

from app.models.refresh_token import RefreshToken

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(create_tables())