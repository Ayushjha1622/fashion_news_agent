from fastapi import APIRouter
from app.core.database import db

router = APIRouter()


@router.get("/dashboard-summary")
def dashboard_summary():

    total = db.articles.count_documents({})

    high = db.articles.count_documents(
        {"impact": "HIGH"}
    )

    medium = db.articles.count_documents(
        {"impact": "MEDIUM"}
    )

    low = db.articles.count_documents(
        {"impact": "LOW"}
    )

    topics = db.topics.count_documents({})

    competitors = db.competitors.count_documents({})

    return {
        "totalArticles": total,
        "highImpact": high,
        "mediumImpact": medium,
        "lowImpact": low,
        "topics": topics,
        "competitors": competitors
    }