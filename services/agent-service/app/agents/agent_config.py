import os
from pydantic_settings import BaseSettings
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
    sources: list[str] = [
        "RSS",
        "Reddit",
        "BBC",
        "New York Times"
    ]

    @property
    def daily_summary_prompt(self):
        categories_str = ', '.join(self.article_categories)
        sources_str = ', '.join(self.sources)

        return f"""
            Based on the following articles, generate a summary in JSON format:
            
            {{articles}}
            
            You must include all sources from the following list, even if some sources have no articles: {sources_str}
            
            Return JSON with the following fields:
            - summaries: a dict where each key is a source name and each value is a detailed summary 
              (at least 5–7 sentences) describing the main events, topics, and trends covered by articles 
              from that specific source.
            - categories: a dict where each key is a source name and each value 
              is another dict containing category counts for that specific source 
              (keys: {categories_str})
            - references: a dict where each key is a source name and each value is a list of 
              3–5 URLs to the most important articles from that specific source.
            
            Return only JSON, without additional info.
        """