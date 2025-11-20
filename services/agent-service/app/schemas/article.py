from datetime import datetime
from pydantic import BaseModel, HttpUrl


class Article(BaseModel):
    id: int
    url: HttpUrl
    published_at: datetime
    title: str
    description: str
    source: str

    @property
    def full_description(self):
        return f"title: {self.title}, description: {self.description}, url: {self.url}, source: {self.source}"
