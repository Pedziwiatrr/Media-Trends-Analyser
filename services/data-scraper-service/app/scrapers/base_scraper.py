from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class Entry:
    title: str
    description: str
    url: str
    category: list[str]


class BaseScraper(ABC):
    def __init__(self, url: str) -> None:
        self.url = url
        self.data = []

    @abstractmethod
    def collect_data(self): ...
