from app.core.config import CONTEXT
from app.scrapers.base_scraper import API_SCRAPERS


def process_articles(limit_per_source: int = 5):
    data = []

    for source in CONTEXT:
        source_data = CONTEXT[source]
        base_url = source_data["endpoint"]["base_url"]
        scraper = API_SCRAPERS[source_data["type"]]
        scraper = scraper(base_url)

        if source_data["endpoint"]["categories"]:
            categories = source_data["endpoint"]["categories"]
            for category in categories[:limit_per_source]:
                data += scraper.collect_data(category)[:limit_per_source]
        else:
            data += scraper.collect_data()[:limit_per_source]
