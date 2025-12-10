from base_scraper import BaseScraper, Entry
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

        try:
            response = requests.get(temp_url)
            # response.raise_for_status()
            response = response.json()
        except requests.RequestException as e:
            raise Exception(f"Request failed for {temp_url}: {e}") from e
        except ValueError as e:
            raise Exception("Response is not valid JSON") from e

        status = response.get("status")
        if status not in ("OK", 200):
            raise Exception(f"API error status: {status}")

        self._extract_data(response)

    @abstractmethod
    def _extract_data(self, response): ...


class NYTScrapper(ApiScraper):
    def _extract_data(self, response):
        for result in response["results"]:
            try:
                entry = {
                    "title": result["title"],
                    "description": result["abstract"],
                    "url": result["url"],
                    "category": result["des_facet"] + result["org_facet"],
                }
                self.data.append(Entry(**entry))
            except:
                pass


class BBCScraper(ApiScraper):
    def _extract_data(self, response):
        for key, values in response.items():
            if isinstance(values, list):
                for value in values:
                    try:
                        entry = {
                            "title": value["title"],
                            "description": value["summary"],
                            "url": value["news_link"],
                            "category": [key],
                        }
                        self.data.append(Entry(**entry))
                    except:
                        pass
