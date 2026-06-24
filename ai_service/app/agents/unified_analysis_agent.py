import json
import re

from app.services.mistral_service import generate
from app.core.database import db

def analyze_news(article):

    topics = get_topics()
    prompt = f"""
You are an Economic Intelligence Analyst.

Analyze the following news article.

Return ONLY valid JSON.

{{
    "relevanceScore": 0,
    "reason": "",
    "summary": [
        "",
        "",
        ""
    ],
    "impact": "LOW",
    "impactReason": ""
}}

Scoring Rules:

0-20:
Irrelevant to economics

21-40:
Minor economic relevance

41-60:
Moderately important economic news

61-80:
Major economic development

81-100:
Critical economic event


Important:

Fiscal policy, government spending,
taxation, public debt, inflation,
GDP growth, recession risk,
trade policy and employment
should usually receive scores above 70.


Scoring Examples:

GDP growth slows sharply
Score: 90
Impact: HIGH

Inflation reaches 8%
Score: 95
Impact: HIGH

Government faces fiscal crisis
Score: 90
Impact: HIGH

Brexit economic impact analysis
Score: 85
Impact: HIGH

Central bank raises interest rates
Score: 95
Impact: HIGH

Mass layoffs at major technology company
Score: 70
Impact: MEDIUM

New product launch
Score: 30
Impact: LOW

Celebrity news
Score: 0
Impact: LOW


Impact must be one of:

HIGH
MEDIUM
LOW

Title:
{article["title"]}

Description:
{article["description"]}

Content:
{article["content"]}

Monitored Topics:

{topics}

Give higher relevance scores
to articles related to these topics.
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

        print(
            "Unified Agent Error:",
            e
        )

        return {
            "relevanceScore": 0,
            "reason": "Analysis failed",
            "summary": [],
            "impact": "LOW",
            "impactReason": "Analysis failed"
        }
    

def get_topics():

    topics = list(
        db.topics.find(
            {},
            {"_id": 0}
        )
    )

    return [
        topic["name"]
        for topic in topics
    ]