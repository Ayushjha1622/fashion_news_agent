from fastapi import APIRouter
from app.services.news_collection_service import collect_news


router = APIRouter()

@router.get("/collect-news")
def collect_news_route():

    articles = collect_news()

    return {
        "success": True,
        "count": len(articles),
        "articles": articles
    }

