from fastapi import APIRouter


router = APIRouter()


@router.get("/get_data")
async def get_data():
    return {"data": 123456789}
