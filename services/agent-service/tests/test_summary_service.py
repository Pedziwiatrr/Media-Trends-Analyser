from datetime import date, datetime
from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Article, DailySummary, ViewDailySummary
from app.schemas.daily_summary import DailySummary as DailySummarySchema
from app.services import summary_service


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
def test_fetch_articles_found(mock_db):
    mock_query = mock_db.query.return_value
    mock_filter1 = mock_query.filter.return_value
    mock_filter2 = mock_filter1.filter.return_value
    mock_filter2.all.return_value = [Article(id=1, title="Test")]

    result = summary_service.fetch_articles(mock_db, date(2026, 1, 1))
    assert len(result) == 1
    assert result[0].title == "Test"


def test_fetch_articles_not_found(mock_db):
    mock_db.query.return_value.filter.return_value.filter.return_value.all.return_value = []

    with pytest.raises(HTTPException) as exc:
        summary_service.fetch_articles(mock_db, date(2026, 1, 1))
    assert exc.value.status_code == 404
