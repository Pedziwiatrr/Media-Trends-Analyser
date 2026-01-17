from app.utils.parser import parse_text


def test_parse_text_removes_html_tags():
    dirty_text = "<p>BlyBlyBlyBly <b>Kacper Siemionek</b> Kacper <br>Siemionek</p>"
    expected = "BlyBlyBlyBly Kacper Siemionek Kacper Siemionek"

    result = parse_text(dirty_text)

    assert result == expected


def test_parse_text_handles_none_and_empty():
    assert parse_text(None) == ""
    assert parse_text("") == ""


def test_parse_text_clean_string_remains_unchanged():
    clean = "Kacper Siemionek"
    assert parse_text(clean) == clean


def test_parse_text_complex_tags():
    dirty = '<a href="http://kacpersiemionek.com" class="btn">Link</a>'
    expected = "Link"
    assert parse_text(dirty) == expected
