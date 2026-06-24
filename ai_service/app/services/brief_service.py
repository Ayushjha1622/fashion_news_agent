from datetime import datetime
from app.core.database import db


def generate_daily_brief():

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

    top_stories = list(
        db.articles.find(
            {},
            {"_id": 0}
        ).sort(
            "relevanceScore",
            -1
        ).limit(5)
    )

    high_impact = list(
        db.articles.find(
        {"impact": "HIGH"},
        {"_id": 0}
    ).sort(
        "relevanceScore",
        -1
    ).limit(5)
)

    competitor_news = list(
        db.articles.find(
            {
                "competitorsMentioned": {
                    "$exists": True,
                    "$ne": []
                }
            },
            {"_id": 0}
        ).limit(5)
    )

    return {
        "date": datetime.utcnow().strftime(
            "%Y-%m-%d"
        ),
        "stats": {
            "totalArticles": total,
            "highImpact": high,
            "mediumImpact": medium,
            "lowImpact": low
        },
        "topStories": top_stories,
        "highImpactStories": high_impact,
        "competitorMentions": competitor_news
    }