from fastapi import APIRouter

from app.services.news_collection_service import collect_news
from app.services.news_analysis_service import analyze_article

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

    for article in articles[:20]:

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