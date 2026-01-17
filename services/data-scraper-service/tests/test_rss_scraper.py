from unittest.mock import patch

import pytest
import requests
from app.scrapers.rss.rss_scraper import RssScraper

SAMPLE_RSS_XML = """
<rss version="2.0">
    <channel>
        <item>
            <title>ODWAŻNA Roxie Węgiel w nowym, ostrym wydaniu! Pręży się w słonecznym Świebodzinie... Przesadziła? [ZOBACZ ZDJĘCIA]</title>
            <link>http://pudelek.pl/roxie-wegiel-testowy-tytul-html-news</link>
            <description>Fani są w SZOKU. Jaki wpływ będzie to miało na polską technologię? Eksperci pytają: "Czy to jeszcze stylizacja, czy już wołanie o atencję?" [ZDJĘCIA]</description>
            <pubDate>Sat, 01 Jan 2026 20:20:00 +0100</pubDate>
            <category>Skandale</category>
            <author>Pudelek</author>
        </item>
    </channel>
</rss>
"""


# --- FIXTURES ---
@pytest.fixture
def mock_article_create():
    with patch("app.scrapers.rss.rss_scraper.Article.create") as mock_create:
        yield mock_create


@pytest.fixture
def rss_scraper():
    instance = RssScraper(
        url="http://kacpersiemionek.com/rss", source_name="Test Source"
    )
    return instance


# --- UNIT TESTS ---
@patch("app.scrapers.rss.rss_scraper.requests.get")
def test_collect_data_request_failure(mock_get, rss_scraper):
    mock_get.side_effect = requests.RequestException("Network error")

    with pytest.raises(Exception) as exc:
        rss_scraper.collect_data()

    assert "Request failed for" in str(exc.value)
