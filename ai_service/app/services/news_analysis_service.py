from app.agents.relevance_agent import analyze_relevance
from app.agents.summary_agent import generate_summary
from app.agents.impact_agent import analyze_impact


def analyze_article(article):

    relevance = analyze_relevance(article)

    article["relevanceScore"] = relevance.get("relevanceScore", 0)

    article["reason"] = relevance.get("reason", "")

    if article["relevanceScore"] < 50:
        article["filtered"] = True

        return article

    summary = generate_summary(article)

    impact = analyze_impact(article)

    article["summary"] = summary.get("summary", [])

    article["impact"] = impact.get("impact", "LOW")

    article["impactReason"] = impact.get("reason", "")

    article["filtered"] = False

    return article
