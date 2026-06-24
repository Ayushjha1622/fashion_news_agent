from app.agents.unified_analysis_agent import analyze_news


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

    return article