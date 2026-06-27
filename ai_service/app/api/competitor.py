from fastapi import APIRouter
from app.services.competitor_service import (
    get_all_competitors,
    add_competitor
)
from app.core.database import db


router = APIRouter(
    prefix="/competitors",
    tags=["Competitors"]
)


@router.get("")
def competitors():

    return get_all_competitors()


from pydantic import BaseModel

class CompetitorCreate(BaseModel):
    name: str

@router.post("")
def create_competitor(competitor: CompetitorCreate):

    success = add_competitor(competitor.name)

    if not success:
        return {
            "success": False,
            "message": "Competitor already exists"
        }

    return {
        "success": True,
        "message": "Competitor added"
    }

@router.delete("/{name}")
def delete_competitor(name: str):

    result = db.competitors.delete_one(
        {"name": name}
    )

    return {
        "success": result.deleted_count > 0
    }