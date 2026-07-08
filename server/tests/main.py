
from api.main import app
from app.database import get_db

from tests.database import override_get_db

app.dependency_overrides[get_db] = override_get_db



