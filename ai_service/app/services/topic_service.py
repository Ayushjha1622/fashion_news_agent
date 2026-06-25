from datetime import datetime
from app.core.database import db


def get_topics():

    return list(
        db.topics.find(
            {"active": True},
            {"_id": 0}
        )
    )


def get_all_topics():

    return list(
        db.topics.find(
            {},
            {"_id": 0}
        )
    )


def add_topic(name):

    name = name.lower()

    existing = db.topics.find_one(
        {
            "name": name
        }
    )

    if existing:
        return False

    db.topics.insert_one(
        {
            "name": name,
            "active": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    )

    return True