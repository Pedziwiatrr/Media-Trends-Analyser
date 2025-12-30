from fastapi import APIRouter

from app.scrapers.rss.rss_scraper import RssScraper
from app.scrapers.api.api_scraper import NYTScrapper, BBCScraper, API_SCRAPERS

from dotenv import load_dotenv
import json
import os


def load_context():
    with open("app/utils/config.json", "r") as fh:
        obj = json.load(fh)
    return obj


load_dotenv()
CONTEXT = load_context()
router = APIRouter()


@router.get("/entries/{source}")
@router.get("/entries/{source}/{category}")
async def get_entries(source: str, category: str | None = None):
    """
    Endpoint for getting available entries from online sources like APIs and RSS feeds

    :param source: name of accessed source e.g. RSS, API
    :type source: str
    :param category: catrgory of source entries to get, None if source categories are not defined
    :type category: str | None
    """
    try:
        source_data = CONTEXT[source]
        base_url = source_data["endpoint"]["base_url"]
        if source_data["type"] == "rss":
            scraper = RssScraper
        elif source_data["type"] == "api":
            scraper = API_SCRAPERS[source_data["classType"]]
            # api_key = os.getenv("API_KEY")
        else:
            raise Exception("Invalid URL data")

    except KeyError as e:
        print(
            f"Invalid query path - source or category does not match available ones: {e}"
        )

    if category and category not in source_data["endpoint"]["categories"]:
        raise Exception("Wrong category passed")

    scraper = scraper(base_url)

    return scraper.collect_data(category)


# if __name__ == "__main__":
#     import asyncio

#     res = asyncio.run(get_entries("bbc", "news"))
#     print(res)
