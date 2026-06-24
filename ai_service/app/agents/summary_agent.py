import json
import re

from app.services.mistral_service import generate


def generate_summary(article):

    prompt = f"""
You are an economic intelligence analyst.

Summarize this article.

Return ONLY valid JSON.

{{
    "summary": [
        "point 1",
        "point 2",
        "point 3"
    ]
}}

Rules:
- Exactly 3 bullet points
- Maximum 20 words per point
- Focus on economic implications

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

        print("Summary Error:", e)

        return {
            "summary": [
                "Summary unavailable"
            ]
        }