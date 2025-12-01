from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models import DailySummary
from app.schemas import DailySummaryCreate, DailySummaryResponse

router = APIRouter(prefix="/daily_summaries")


@router.post(
    "/", response_model=DailySummaryResponse, status_code=status.HTTP_201_CREATED
)
def create_daily_summary(
    summary_data: DailySummaryCreate, db: Session = Depends(get_db)
):
    existing_summary = (
        db.query(DailySummary).filter(DailySummary.date == summary_data.date).first()
    )

    if existing_summary:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Daily summary for {summary_data.date} already exists",
        )

    db_summary = DailySummary(**summary_data.model_dump())
    db.add(db_summary)
    db.commit()
    db.refresh(db_summary)

    return db_summary
