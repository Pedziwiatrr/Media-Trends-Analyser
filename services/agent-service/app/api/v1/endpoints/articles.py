from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from datetime import date, datetime, timedelta
from app.database.database import get_db
from app.models import Article
from app.schemas import ArticleResponse

router = APIRouter(prefix="/articles")


@router.get("/date/{article_date}", response_model=list[ArticleResponse])
def get_articles_by_date(article_date: date, db: Session = Depends(get_db)):
    start_date = datetime.combine(article_date, datetime.min.time())
    end_date = start_date + timedelta(days=1)

    articles = (
        db.query(Article)
        .filter(Article.published_at >= start_date)
        .filter(Article.published_at < end_date)
        .all()
    )
    return articles
