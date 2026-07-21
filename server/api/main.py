from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

import asyncio

from app.database import Base, engine

from dotenv import load_dotenv

from api.routes.auth import auth_router

from api.routes.users import users_router

from api.routes.tasks import tasks_router

# enable .env configuration

load_dotenv()


app = FastAPI()

origins = [
    "http://localhost:3000",  # Your Next.js local address
    "https://yourdomain.com",  # Your production frontend domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from your specific frontend domains
    allow_credentials=True,  # Allows cookies/auth headers to pass through
    allow_methods=["*"],  # Allows all HTTP methods (POST, GET, OPTIONS, PUT, etc.)
    allow_headers=["*"],  # Allows all custom request headers (like Authorization)
)


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


app.include_router(router=auth_router)
app.include_router(router=users_router)
app.include_router(router=tasks_router)


if __name__ == "__main__":
    asyncio.run(create_tables())
