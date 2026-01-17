import xml.etree.ElementTree as ET
from datetime import datetime

import requests

from app.schemas.articles import ArticleCreate
from app.scrapers.base_scraper import BaseScraper, save_scrapers
from app.utils.parser import parse_text


@save_scrapers
class RssScraper(BaseScraper):
    def collect_data(self, category: str | None = None) -> list:
        """
        ...
        """
        data = []
        temp_url = self.url % category if category else self.url

        try:
            response = requests.get(temp_url)
            root = ET.fromstring(response.content)
        except requests.RequestException as e:
            raise Exception(f"Request failed for {temp_url}: {e}")
        except Exception as e:
            raise Exception(e)

        for item in root.iter("item"):
            title_node = item.find(".//title")
            desc_node = item.find(".//description")
            link_node = item.find(".//link")

            if title_node is None or desc_node is None or link_node is None:
                continue

            title = parse_text(title_node.text)
            description = parse_text(desc_node.text)
            url = link_node.text

            if not title or not description or not url:
                continue

            date = item.find(".//pubDate").text
            try:
                date = date.replace("+0000", "GMT")
                published_date = (
                    datetime.strptime(date, "%a, %d %b %Y %H:%M:%S %Z")
                    if date
                    else datetime.now()
                )
            except Exception as e:
                print(f"Error parsing article publishing date - {e}")
                continue

            categories = (
                [category]
                if category
                else []
                + [
                    category.text
                    for category in item.findall(".//category")
                    if category.text
                ]
            )

            article = ArticleCreate.create(
                title=title,
                description=description,
                url=url,
                published_at=published_date,
                source=self.source_name,
                categories=categories,
            )
            if article:
                data.append(article)

        return data
