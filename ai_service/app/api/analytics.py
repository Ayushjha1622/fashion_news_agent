from fastapi import APIRouter
from app.core.database import db

router = APIRouter()


@router.get("/analytics")
def analytics():

    high = db.articles.count_documents(
        {"impact": "HIGH"}
    )

    medium = db.articles.count_documents(
        {"impact": "MEDIUM"}
    )

    low = db.articles.count_documents(
        {"impact": "LOW"}
    )

    competitors = db.competitors.count_documents({})

    topics = db.topics.count_documents({})

    return {
        "impactDistribution": {
            "high": high,
            "medium": medium,
            "low": low
        },
        "overview": {
            "topics": topics,
            "competitors": competitors
        }
    }
