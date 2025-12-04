from fastapi import APIRouter
from .endpoints import daily_summary, periodic_summary

api_router = APIRouter()

api_router.include_router(daily_summary.router)
api_router.include_router(periodic_summary.router)
