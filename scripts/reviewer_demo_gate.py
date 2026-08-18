from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
DEMO = ROOT / "fastpath" / "demo" / "index.html"


def fail(message: str) -> None:
    print(f"FAIL: {message}", file=sys.stderr)
    raise SystemExit(1)


class DemoParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids = set()
        self.tabs = []
        self.next_count = 0
        self.prev_count = 0
        self.choice_count = 0
        self.text = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if data.get("id"):
            self.ids.add(data["id"])
        if data.get("role") == "tab":
            self.tabs.append(data)
        if "data-next" in data:
            self.next_count += 1
        if "data-prev" in data:
            self.prev_count += 1
        if "data-action" in data:
            self.choice_count += 1

    def handle_data(self, data):
        if data.strip():
            self.text.append(data.strip())


if not DEMO.exists():
    fail("reviewer demo page missing")

parser = DemoParser()
source = DEMO.read_text(encoding="utf-8")
parser.feed(source)

required_panels = {"step-job", "step-evidence", "step-align", "step-action", "step-output"}
missing_panels = required_panels - parser.ids
if missing_panels:
    fail(f"missing reviewer panels: {sorted(missing_panels)}")

if len(parser.tabs) != 5:
    fail(f"expected 5 reviewer tabs, found {len(parser.tabs)}")

for tab in parser.tabs:
    controlled = tab.get("aria-controls")
    if controlled not in required_panels:
        fail(f"tab has invalid aria-controls: {controlled}")

if parser.next_count < 4:
    fail("reviewer demo must provide forward controls through the workflow")
if parser.prev_count < 4:
    fail("reviewer demo must provide back controls through the workflow")
if parser.choice_count != 3:
    fail(f"expected 3 gap-action choices, found {parser.choice_count}")

text = " ".join(parser.text).lower()
required_truth = [
    "fictional data",
    "not a hiring prediction",
    "supported",
    "partial",
    "unknown",
    "gap",
    "candidate-controlled",
    "not traction",
]
for phrase in required_truth:
    if phrase not in text:
        fail(f"missing truth-boundary phrase: {phrase}")

for forbidden in ["100% match", "guaranteed hire", "ats pass", "production candidate data"]:
    if forbidden in text:
        fail(f"forbidden reviewer claim present: {forbidden}")

print("PASS: FastPath reviewer demo acceptance gate")
print("steps=5 action_choices=3 truth_boundary=present")
