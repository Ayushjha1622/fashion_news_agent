from fastapi import APIRouter
from app.services.topic_service import (
    get_all_topics,
    add_topic
)
from app.core.database import db


router = APIRouter(
    prefix="/topics",
    tags=["Topics"]
)


@router.get("")
def topics():

    return get_all_topics()


@router.post("")
def create_topic(
    name: str
):

    add_topic(name)

    return {
        "success": True,
        "message": "Topic added"
    }


@router.delete("/{name}")
def delete_topic(name: str):

    db.topics.delete_one(
        {"name": name}
    )

    return {
        "success": True
    }