import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()

class AgentSettings(BaseSettings):
    gemini_api_key: str = os.getenv("GEMINI_API_KEY")
    article_categories: list[str] = [
        "Technology",
        "Politics",
        "Economy",
        "Sport",
        "Culture"
    ]

    @property
    def daily_summary_prompt(self):
        categories_str = ', '.join(self.article_categories)

        return f"""
            Based on the following articles, generate a summary in JSON format:
            
            {{articles}}
            
            Return JSON with the following fields:
            - summary: the most important events of the day
            - categories: list of article count per category (keys: {categories_str})
            - references: list of 3-5 URLs to the most important articles of the day
            
            Return only JSON, without additional info.
        """