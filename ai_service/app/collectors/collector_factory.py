from app.collectors.gnews_collector import fetch_gnews
from app.collectors.rss_collector import fetch_rss


def run_collector(source):

    if source["type"] == "api":
        return fetch_gnews(
        query=source.get("query", "fashion")
    )
    if source["type"] == "rss":
        return fetch_rss(source)

    return []