import os
import requests
from dotenv import load_dotenv

load_dotenv()


def fetch_gnews(query="fashion"):
    """
    Fetch articles from GNews API and normalize them.
    """

    api_key = os.getenv("GNEWS_API_KEY")

    if not api_key:
        print("GNEWS_API_KEY not found")
        return []

    try:
        response = requests.get(
            "https://gnews.io/api/v4/search",
            params={
                "q": query,
                "lang": "en",
                "max": 10,
                "apikey": api_key,
            },
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        articles = []

        for article in data.get("articles", []):

            normalized_article = {
                "title": article.get("title", ""),
                "description": article.get("description", ""),
                "source": article.get("source", {}).get("name", "GNews"),
                "url": article.get("url", ""),
                "publishedAt": article.get("publishedAt", ""),
                "content": article.get("content", ""),
            }

            articles.append(normalized_article)

        return articles

    except requests.exceptions.RequestException:
        return []

    except Exception:
        return []