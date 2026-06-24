import json
import re

from app.services.mistral_service import generate


def analyze_impact(article):

    prompt = f"""
You are an economic intelligence analyst.

Determine the economic impact of this article.

Return ONLY JSON.

{{
    "impact": "HIGH",
    "reason": ""
}}

Rules:

HIGH:
- Major policy changes
- Inflation
- GDP
- Trade
- Interest rates
- Recession risk

MEDIUM:
- Industry developments
- Corporate news
- Regional effects

LOW:
- Minor updates
- Opinion pieces
- Low significance events

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

        print("Impact Error:", e)

        return {
            "impact": "LOW",
            "reason": "Analysis failed"
        }