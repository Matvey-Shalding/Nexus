from fastapi import FastAPI

import asyncio

from app.database import Base, engine
from app.models.user import User,RefreshToken

from dotenv import load_dotenv

from api.routes.auth import auth_router

# enable .env configuration

load_dotenv()


app = FastAPI()

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(auth_router)


@app.get("/")
async def root():
    return {"message": "Hello World"}



