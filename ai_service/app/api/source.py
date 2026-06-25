from fastapi import APIRouter

from app.services.source_service import (
    get_all_sources,
    add_source
)

from app.core.database import db

router = APIRouter(
    prefix="/sources",
    tags=["Sources"]
)


@router.get("")
def sources():

    return get_all_sources()


@router.post("")
def create_source(
    name: str,
    type: str,
    url: str
):

    success = add_source(
        name,
        type,
        url
    )

    if not success:
        return {
            "success": False,
            "message": "Source already exists"
        }

    return {
        "success": True,
        "message": "Source added successfully"
    }


@router.delete("/{name}")
def delete_source(name: str):

    result = db.sources.delete_one(
        {
            "name": name
        }
    )

    return {
        "success": result.deleted_count > 0
    }