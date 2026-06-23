import feedparser

def fetch_rss(source):
    try:

        feed = feedparser.parse(source["url"])

        articles = []

        for item in feed.entries:

            articles.append({
                "title": item.get("title", ""),
                "description": item.get("summary", ""),
                "source": source["name"],
                "url": item.get("link", ""),
                "publishedAt": item.get("published", ""),
                "content": item.get("summary", "")
            })

        return articles

    except Exception:
        return []