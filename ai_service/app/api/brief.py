from fastapi import APIRouter

from app.services.brief_service import (
    generate_daily_brief
)

router = APIRouter(
    tags=["Daily Brief"]
)


@router.get("/daily-brief")
def daily_brief():

    return generate_daily_brief()