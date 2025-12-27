from fastapi import FastAPI
from api.v1.data import router as data_router

app = FastAPI()

app.include_router(data_router)


@app.get("/")
async def scrapper_service():
    return {"service": "data-scraper"}
