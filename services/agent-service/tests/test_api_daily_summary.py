from unittest.mock import MagicMock

from app.database.database import get_db
from app.main import app
from fastapi.testclient import TestClient

# --- SETUP ---
client = TestClient(app)


def override_get_db():
    try:
        yield MagicMock()
    finally:
        pass


app.dependency_overrides[get_db] = override_get_db

BASE_URL = "/daily_summary"


# --- UNIT TESTS ---
def test_create_daily_summary_invalid_date():
    response = client.post(
        f"{BASE_URL}/?summary_date=KacperSiemionek (for context: Kacper is not a date in any case!!!)"
    )
    assert response.status_code == 422
