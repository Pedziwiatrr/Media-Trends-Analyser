from pydantic_settings import BaseSettings


class AgentSettings(BaseSettings):
    article_categories: list[str] = [
        "Technology",
        "Politics",
        "Economy",
        "Sport",
        "Culture",
    ]
    sources: list[str] = ["RSS", "Reddit", "BBC", "New York Times"]
