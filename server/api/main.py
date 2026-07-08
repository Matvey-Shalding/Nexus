from fastapi import FastAPI

import asyncio

from app.database import Base, engine

from dotenv import load_dotenv

from api.routes.auth import auth_router

from api.routes.users import users_router

# enable .env configuration

load_dotenv()


app = FastAPI()

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(router=auth_router)
app.include_router(router=users_router)



if __name__ == "__main__":
    asyncio.run(create_tables())

