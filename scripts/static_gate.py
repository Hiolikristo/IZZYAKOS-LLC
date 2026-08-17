from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = [
    ROOT / "index.html",
    ROOT / "fastpath" / "index.html",
    ROOT / "tracebridge" / "index.html",
    ROOT / "chopx" / "index.html",
    ROOT / "accra" / "index.html",
]


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[tuple[str, str]] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs):
        data = dict(attrs)
        if "id" in data:
            self.ids.add(data["id"])
        if tag == "a" and "href" in data:
            self.links.append((data["href"], data.get("class", "")))


def fail(message: str) -> None:
    print(f"FAIL: {message}", file=sys.stderr)
    raise SystemExit(1)


def target_file(source: Path, href: str) -> Path | None:
    parsed = urlparse(href)
    if parsed.scheme or parsed.netloc or href.startswith("mailto:"):
        return None
    path = parsed.path
    if not path:
        return source
    candidate = (source.parent / path).resolve()
    if path.endswith("/"):
        candidate = candidate / "index.html"
    elif candidate.is_dir():
        candidate = candidate / "index.html"
    return candidate


for html_file in HTML_FILES:
    if not html_file.exists():
        fail(f"required page missing: {html_file.relative_to(ROOT)}")

    parser = LinkParser()
    parser.feed(html_file.read_text(encoding="utf-8"))

    if not parser.links:
        fail(f"no CTAs/links found: {html_file.relative_to(ROOT)}")

    for href, _ in parser.links:
        normalized = href.strip().lower()
        if normalized in {"", "#"}:
            fail(f"empty/dead href in {html_file.relative_to(ROOT)}")
        if normalized.startswith("javascript:"):
            fail(f"javascript href in {html_file.relative_to(ROOT)}: {href}")
        if any(token in normalized for token in ("example.com", "localhost", "127.0.0.1", "todo")):
            fail(f"placeholder URL in {html_file.relative_to(ROOT)}: {href}")

        parsed = urlparse(href)
        if parsed.scheme in {"http", "https"} and parsed.netloc == "fastpath-v0.vercel.app":
            fail("stale FastPath short alias must not be used for sponsor review")

        local_target = target_file(html_file, href)
        if local_target is not None and not local_target.exists():
            fail(
                f"broken local target in {html_file.relative_to(ROOT)}: "
                f"{href} -> {local_target.relative_to(ROOT) if ROOT in local_target.parents else local_target}"
            )

        if parsed.fragment and not parsed.path:
            if parsed.fragment not in parser.ids:
                fail(f"missing fragment target in {html_file.relative_to(ROOT)}: #{parsed.fragment}")

print("PASS: IZZYAKOS sponsor surface static gate")
print("pages=" + ",".join(str(p.relative_to(ROOT)) for p in HTML_FILES))
print("dead_href=0 placeholder_url=0 broken_local_target=0 stale_fastpath_alias=0")
