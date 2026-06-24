from fastapi import APIRouter

from app.services.news_collection_service import collect_news
from app.services.news_analysis_service import analyze_article
from app.services.article_pipeline import analyze_and_save
from app.core.database import db

router = APIRouter()


@router.get("/analyze-first")
def analyze_first():

    articles = collect_news()

    if not articles:
        return {
            "message": "No articles found"
        }

    return analyze_article(
        articles[0]
    )

@router.get("/analyze-top-5")
def analyze_top_5():

    articles = collect_news()

    results = []

    for article in articles[:5]:

        results.append(
            analyze_article(article)
        )

    return {
        "count": len(results),
        "articles": results
    }

@router.get("/analyze-important")
def analyze_important():

    articles = collect_news()

    results = []

    for article in articles[:5]:

        analyzed = analyze_article(
            article
        )

        if not analyzed.get(
            "filtered",
            False
        ):
            results.append(
                analyzed
            )

    return {
        "count": len(results),
        "articles": results
    }

@router.get("/analyze-and-save")
def analyze_and_save_route():

    return analyze_and_save()

@router.get("/articles")
def get_articles():

    articles = list(
        db.articles.find(
            {},
            {"_id": 0}
        )
    )

    return {
        "count": len(articles),
        "articles": articles
    }

@router.get("/high-impact")
def high_impact():


    articles = list(
        db.articles.find(
            {
                "impact": "HIGH"
            },
            {
                "_id": 0
            }
        )
    )

    return {
        "count": len(articles),
        "articles": articles
    }

@router.get("/latest")
def latest_articles():

    articles = list(
        db.articles.find(
            {},
            {"_id": 0}
        ).sort(
            "createdAt",
            -1
        ).limit(10)
    )

    return {
        "count": len(articles),
        "articles": articles
    }


@router.get("/stats")
def stats():

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

    return {
        "totalArticles": total,
        "highImpact": high,
        "mediumImpact": medium,
        "lowImpact": low
    }