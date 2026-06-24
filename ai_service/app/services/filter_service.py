def is_relevant(article):

    score = article.get(
        "relevanceScore",
        0
    )

    return score >= 50