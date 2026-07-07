import pytest

from tests.database import create_tables,drop_tables


from httpx import AsyncClient,ASGITransport

from api.main import app

@pytest.fixture(scope="session")

async def setup_database():

    await drop_tables()

    await create_tables()
    
    yield

    await drop_tables()


@pytest.fixture()
async def http_client():

    async with AsyncClient(transport=ASGITransport(app=app),base_url="http://test") as client:

        yield client
    