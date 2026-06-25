from datetime import datetime
from app.core.database import db


def get_active_sources():

    return list(
        db.sources.find(
            {"active": True},
            {"_id": 0}
        )
    )


def get_all_sources():

    return list(
        db.sources.find(
            {},
            {"_id": 0}
        )
    )


def add_source(name, type, url):

    existing = db.sources.find_one(
        {
            "name": name
        }
    )

    if existing:
        return False

    db.sources.insert_one(
        {
            "name": name,
            "type": type,
            "url": url,
            "active": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    )

    return True