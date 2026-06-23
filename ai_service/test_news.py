# from app.collectors.gnews_collector import fetch_gnews

# articles = fetch_gnews("fashion")

# print(f"Found {len(articles)} articles")

from app.collectors.rss_collector import fetch_rss

source = {
    # "name": "BBC Business",
    # "url": "https://feeds.bbci.co.uk/news/business/rss.xml"
    #  "name": "Google News",
    # "url": "https://news.google.com/rss/search?q=fashion"
    "name": "Economic Times",
    "url": "https://economictimes.indiatimes.com/rssfeedsdefault.cms"
}

articles = fetch_rss(source)

print("Articles:", len(articles))

if articles:
    print(articles[0]["title"])