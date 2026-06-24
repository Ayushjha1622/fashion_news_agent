from app.agents.unified_analysis_agent import analyze_news
from app.services.competitor_service import detect_competitors


def analyze_article(article):

    analysis = analyze_news(article)

    article["relevanceScore"] = analysis.get(
        "relevanceScore",
        0
    )

    article["reason"] = analysis.get(
        "reason",
        ""
    )

    article["summary"] = analysis.get(
        "summary",
        []
    )

    article["impact"] = analysis.get(
        "impact",
        "LOW"
    )

    article["impactReason"] = analysis.get(
        "impactReason",
        ""
    )

    article["filtered"] = (
        article["relevanceScore"] < 30
    )

    article["competitorsMentioned"] = detect_competitors(article)

    return article