from app.services.source_service import get_active_sources
from app.collectors.collector_factory import run_collector


def collect_news():

    sources = get_active_sources()

    all_articles = []

    for source in sources:

        articles = run_collector(source)

        all_articles.extend(articles)

    return all_articles