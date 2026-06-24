from app.core.database import db


def get_competitors():

    competitors = list(
        db.competitors.find(
            {},
            {"_id": 0}
        )
    )

    return competitors


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