from datetime import datetime
from app.core.database import db


def add_competitor(name):

    name = name.lower()

    existing = db.competitors.find_one(
        {
            "name": name
        }
    )

    if existing:
        return False

    db.competitors.insert_one(
        {
            "name": name,
            "active": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    )

    return True

def get_competitors():

    return list(
        db.competitors.find(
            {"active": True},
            {"_id": 0}
        )
    )


def get_all_competitors():

    return list(
        db.competitors.find(
            {},
            {
                "_id": 0
            }
        )
    )

def detect_competitors(article):

    competitors = get_competitors()

    content = (
        article.get("title", "")
        + " "
        + article.get("description", "")
        + " "
        + article.get("content", "")
    ).lower()

    found = []

    for competitor in competitors:

        name = competitor["name"].lower()

        if name in content:

            found.append(
                competitor["name"]
            )

    return found
