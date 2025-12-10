from base_scraper import BaseScraper, Entry

import xml.etree.ElementTree as ET
import requests


class RssScraper(BaseScraper):
    def collect_data(self, category: str = None) -> None:
        """
        ...
        """
        temp_url = self.url % category if category else self.url
        response = requests.get(temp_url)
        root = ET.fromstring(response.content)
        for item in root.iter("item"):
            entry = {
                "title": item.find(".//title").text,
                "description": item.find(".//description").text,
                "url": item.find(".//link").text,
                "category": [
                    category.text
                    for category in item.findall(".//category")
                    if category.text
                ],
            }
            self.data.append(Entry(**entry))
