from datetime import date
from pydantic import BaseModel, Field


class PeriodSummary(BaseModel):
    start_date: date
    end_date: date
    summary: str
    categories_timeline: dict[str, list[int]] = Field(default_factory=dict)
    trends: list[str] = Field(default_factory=list)