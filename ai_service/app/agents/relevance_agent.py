import json
import re

from app.services.mistral_service import generate


def analyze_relevance(article):

    prompt = f"""
You are an economic intelligence analyst.

Analyze the article.

Return ONLY valid JSON.

{{
    "relevanceScore": 0,
    "reason": ""
}}

Scoring Guide:

0-20:
Irrelevant to economics

21-40:
Minor business relevance

41-60:
Moderately important economic news

61-80:
Major economic development

81-100:
Critical economic event

Examples:

Brexit economic impact -> 90

Interest rate hike -> 95

Inflation surge -> 90

GDP slowdown -> 85

Government fiscal crisis -> 90

Corporate product launch -> 30

Celebrity news -> 0

Title:
{article["title"]}

Description:
{article["description"]}

Content:
{article["content"]}
"""

    try:

        response = generate(prompt)

        response = re.sub(
            r"```json|```",
            "",
            response
        ).strip()

        return json.loads(response)

    except Exception as e:

        print("Relevance Error:", e)

        return {
            "relevanceScore": 0,
            "reason": "Parsing failed"
        }