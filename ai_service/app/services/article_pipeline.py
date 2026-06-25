from app.services.news_collection_service import collect_news
from app.services.news_analysis_service import analyze_article
from app.services.news_analysis_service import analyze_article
from app.services.article_service import save_article, article_exists


def analyze_and_save():

    articles = collect_news()

    # Process only first 3 articles during development
    articles = articles[:5]

    saved = 0
    skipped = 0
    filtered = 0

    for article in articles:

        try:

            if article_exists(article.get("url")):
                skipped += 1
                continue

            analyzed = analyze_article(article)

            if analyzed.get("filtered", False):
                filtered += 1
                continue

            if save_article(analyzed):
                saved += 1
            else:
                skipped += 1

        except Exception as e:

            print(
                f"Pipeline Error: {e}"
            )

    return {
        "processed": len(articles),
        "saved": saved,
        "filtered": filtered,
        "duplicates": skipped
    }