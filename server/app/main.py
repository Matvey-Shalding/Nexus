from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

import asyncio

from app.database import Base, engine

from dotenv import load_dotenv

from api.routes.auth import auth_router

from api.routes.users import users_router

from api.routes.tasks import tasks_router

# enable .env configuration

# load_dotenv()


app = FastAPI()


@app.get("/health")
async def health():
    return {"status": "ok"}


origins = [
    "http://localhost:3000",  # Your Next.js local address
    "https://45.138.25.80:3000",  # Your production frontend domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from your specific frontend domains
    allow_credentials=True,  # Allows cookies/auth headers to pass through
    allow_methods=["*"],  # Allows all HTTP methods (POST, GET, OPTIONS, PUT, etc.)
    allow_headers=["*"],  # Allows all custom request headers (like Authorization)
)

app.include_router(router=auth_router)
app.include_router(router=users_router)
app.include_router(router=tasks_router)
