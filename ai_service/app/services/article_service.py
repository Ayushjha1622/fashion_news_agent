from app.core.database import db
from datetime import datetime


def save_article(article):

    existing = db.articles.find_one(
        {"url": article["url"]}
    )

    if existing:
        return False

    article["createdAt"] = datetime.utcnow()

    db.articles.insert_one(article)

    return True


def article_exists(url: str) -> bool:
    return db.articles.find_one({"url": url}) is not None