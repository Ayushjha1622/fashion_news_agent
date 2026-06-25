def serialize(document):

    if not document:
        return document

    if "_id" in document:
        document["_id"] = str(
            document["_id"]
        )

    return document
