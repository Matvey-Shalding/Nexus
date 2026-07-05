import pytest

from tests.database import create_tables

@pytest.fixture(scope="session")

async def init_database():
    await create_tables()