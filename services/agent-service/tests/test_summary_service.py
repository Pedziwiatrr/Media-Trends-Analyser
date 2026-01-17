from datetime import date
from unittest.mock import MagicMock

import pytest
from app.schemas.daily_summary import DailySummary as DailySummarySchema
from sqlalchemy.orm import Session


# --- FIXTURES ---
@pytest.fixture
def mock_db():
    return MagicMock(spec=Session)


@pytest.fixture
def mock_agent():
    agent = MagicMock()
    mock_daily_result = MagicMock(spec=DailySummarySchema)
    mock_daily_result.model_dump.return_value = {
        "date": date(2026, 1, 1),
        "summaries": {},
        "categories": {},
        "references": {},
    }
    mock_daily_result.references = {}
    agent.get_daily_summary.return_value = mock_daily_result
    return agent


# --- HELPER TESTS ---


# --- UNIT TESTS ---
