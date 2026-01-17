import os
import sys

import pytest
from app.models.articles import ArticleDB
from sqlalchemy import StaticPool, create_engine
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.orm import sessionmaker

# mock database URL for testing
os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


@compiles(JSONB, "sqlite")
def compile_jsonb_sqlite(type_, compiler, **kw):
    return "JSON"


@pytest.fixture(scope="session")
def engine():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    ArticleDB.metadata.create_all(bind=engine)
    return engine


@pytest.fixture
def db_session(engine):
    connection = engine.connect()

    transaction = connection.begin()

    SessionLocal = sessionmaker(bind=connection)
    session = SessionLocal()

    yield session

    session.close()
    transaction.rollback()
    connection.close()
