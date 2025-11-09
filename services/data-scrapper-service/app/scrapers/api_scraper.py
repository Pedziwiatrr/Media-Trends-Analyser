from base_scraper import BaseScraper
from abc import abstractmethod

import requests


class ApiScraper(BaseScraper):
    def __init__(self, url: str, api_key: str = None) -> None:
        """ """
        super().__init__(url)
        if api_key:
            self.api_key = api_key
            self.url += self.api_key

    def collect_data(self, category: str = None) -> None:
        """ """
        temp_url = self.url % category if category else self.url
        response = requests.get(temp_url)
        try:
            response = response.json()
        except:
            pass
        if response.get("status") not in ("OK", 200):
            raise Exception("API connection error")
        self._extract_data(response)

    @abstractmethod
    def _extract_data(self, response): ...
