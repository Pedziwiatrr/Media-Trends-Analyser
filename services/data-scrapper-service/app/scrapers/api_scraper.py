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
        for entry in response["results"]:
            try:
                temp_data = dict()
                temp_data["title"] = entry["title"]
                temp_data["description"] = entry["abstract"]
                temp_data["link"] = entry["url"]
                temp_data["category"] = entry["des_facet"] + entry["org_facet"]
                self.data.append(temp_data)
            except:
                pass


class BBCScraper(ApiScraper):
    def _extract_data(self, response):
        for key, value in response.items():
            if isinstance(value, list):
                for entry in value:
                    try:
                        temp_data = dict()
                        temp_data["title"] = entry["title"]
                        temp_data["description"] = entry["summary"]
                        temp_data["link"] = entry["news_link"]
                        temp_data["category"] = [key]
                        self.data.append(temp_data)
                    except:
                        pass
