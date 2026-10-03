from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
BOAMAN = ROOT / "baoman" / "index.html"
DEMO = ROOT / "baoman" / "demo" / "index.html"
HOME = ROOT / "index.html"
LEGACY = ROOT / "fastpath" / "index.html"
OLD_ROUTE = ROOT / "boaman" / "index.html"

def fail(msg):
    print(f"FAIL: {msg}", file=sys.stderr)
    raise SystemExit(1)

for path in [BOAMAN, DEMO, HOME, LEGACY, OLD_ROUTE]:
    if not path.exists():
        fail(f"missing required surface: {path.relative_to(ROOT)}")

bo = BOAMAN.read_text(encoding="utf-8")
demo = DEMO.read_text(encoding="utf-8")
home = HOME.read_text(encoding="utf-8")
legacy = LEGACY.read_text(encoding="utf-8")
old_route = OLD_ROUTE.read_text(encoding="utf-8")

# Canonical BOAMAN public route is https://izzyakos.com/baoman/.
# Deprecated BOAMAN hosts and stale short Vercel aliases must not return to sponsor-facing surfaces.
for label, source in [("BOAMAN page", bo), ("IZZYAKOS home", home), ("legacy FastPath redirect", legacy)]:
    if "fastpath-v0.vercel.app" in source or "boaman.izzyakos.com" in source:
        fail(f"{label} still references a deprecated BOAMAN host")

required_boaman = [
    "Make capability visible.",
    "Make opportunity reachable.",
    "BOAMAN · IZZYAKOS LLC · PRE-PILOT",
    'href="./demo/"',
    "Customer-discovery comparison",
    "LinkedIn",
    "Indeed",
    "ZipRecruiter / CareerBuilder",
    "working competitive hypothesis",
    "#031429",
    "#1677d2",
    "#ffc72c",
    "#071527",
    ".cta.gold",
    ".cta.blue",
    ".cta.outline",
]
for token in required_boaman:
    if token not in bo:
        fail(f"BOAMAN stable surface missing contract token: {token}")

# Explicit foreground/background pairs prevent the print/reviewer surface from regressing to white-on-white.
contrast_contracts = [
    ".cta.gold{background:var(--gold);color:var(--ink)}",
    ".cta.blue{background:var(--blue);color:#fff}",
    ".matrix{width:100%;border-collapse:collapse;background:#fff;color:#10233a",
    ".matrix th{background:#0b5fb7;color:#fff}",
]
for token in contrast_contracts:
    if token not in bo:
        fail(f"BOAMAN contrast contract missing: {token}")

if 'href="https://izzyakos.com/baoman/"' not in home:
    fail("IZZYAKOS homepage does not launch accepted BOAMAN route")
if 'href="./baoman/"' not in home:
    fail("IZZYAKOS homepage is missing the accepted BOAMAN system brief route")
if 'href="https://izzyakos.com/baoman/#pilot"' not in home:
    fail("IZZYAKOS homepage is missing the accepted BOAMAN pilot route")

if "../baoman/" not in legacy:
    fail("legacy FastPath route does not redirect to accepted BOAMAN path")
if "../baoman/" not in old_route:
    fail("misspelled /baoman route does not redirect to accepted /baoman path")

required_demo = [
    "BOAMAN Reviewer Demo",
    "Walk the BOAMAN mechanism.",
    "fictional data",
    "not a hiring prediction",
    "Supported",
    "Partial",
    "Unknown",
    "Gap",
]
for token in required_demo:
    if token.lower() not in demo.lower():
        fail(f"BOAMAN reviewer demo missing: {token}")

print("PASS: BOAMAN stable public surface")
print("route=/baoman/ demo=/baoman/demo/ canonical=https://izzyakos.com/baoman/ deprecated-hosts=0 contrast=locked")
