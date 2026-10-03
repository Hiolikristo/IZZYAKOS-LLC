from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
BOAMAN = ROOT / "boaman" / "index.html"
HOME = ROOT / "index.html"
LEGACY = ROOT / "fastpath" / "index.html"
TYPO_ROUTE = ROOT / "baoman" / "index.html"
DEMO = ROOT / "boaman" / "demo" / "index.html"
TYPO_DEMO = ROOT / "baoman" / "demo" / "index.html"
FUNDMEISTER = ROOT / "boaman" / "fundmeister" / "index.html"

def fail(msg):
    print(f"FAIL: {msg}", file=sys.stderr)
    raise SystemExit(1)

for path in [BOAMAN, HOME, LEGACY, TYPO_ROUTE, DEMO, TYPO_DEMO, FUNDMEISTER]:
    if not path.exists():
        fail(f"missing required surface: {path.relative_to(ROOT)}")

bo = BOAMAN.read_text(encoding="utf-8")
home = HOME.read_text(encoding="utf-8")
legacy = LEGACY.read_text(encoding="utf-8")
typo_route = TYPO_ROUTE.read_text(encoding="utf-8")
demo = DEMO.read_text(encoding="utf-8")
typo_demo = TYPO_DEMO.read_text(encoding="utf-8")
fm = FUNDMEISTER.read_text(encoding="utf-8")

# Canonical public route is https://izzyakos.com/boaman/.
for label, source in [
    ("IZZYAKOS home", home),
    ("canonical BOAMAN", bo),
    ("legacy FastPath redirect", legacy),
    ("canonical reviewer demo", demo),
]:
    if "fastpath-v0.vercel.app" in source or "boaman.izzyakos.com" in source:
        fail(f"{label} still references a deprecated BOAMAN host")
    if "/baoman/" in source:
        fail(f"{label} still references the misspelled /baoman route")

required_boaman = [
    "Make capability visible.",
    "Make opportunity reachable.",
    "BOAMAN · IZZYAKOS LLC · PRE-PILOT",
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
    '?workspace=1#/home',
    '?workspace=1#/pilot',
    '?workspace=1#/fundmeister',
    'https://izzyakos.com/boaman/',
]
for token in required_boaman:
    if token not in bo:
        fail(f"BOAMAN stable surface missing contract token: {token}")

contrast_contracts = [
    ".cta.gold{background:var(--gold);color:var(--ink)}",
    ".cta.blue{background:var(--blue);color:#fff}",
    ".matrix{width:100%;border-collapse:collapse;background:#fff;color:#10233a",
    ".matrix th{background:#0b5fb7;color:#fff}",
]
for token in contrast_contracts:
    if token not in bo:
        fail(f"BOAMAN contrast contract missing: {token}")

for token in [
    'href="https://izzyakos.com/boaman/"',
    'href="./boaman/"',
    'href="https://izzyakos.com/boaman/#pilot"',
]:
    if token not in home:
        fail(f"IZZYAKOS homepage missing canonical BOAMAN CTA: {token}")

if "../boaman/" not in legacy:
    fail("legacy FastPath route does not redirect to /boaman/")
if "../boaman/" not in typo_route or "https://izzyakos.com/boaman/" not in typo_route:
    fail("misspelled /baoman route does not redirect/canonicalize to /boaman/")
if "../../boaman/demo/" not in typo_demo or "https://izzyakos.com/boaman/demo/" not in typo_demo:
    fail("misspelled reviewer route does not redirect/canonicalize to /boaman/demo/")

for token in [
    "fictional data",
    "not a hiring prediction",
    "candidate-controlled",
    "Supported",
    "Partial",
    "Unknown",
    "Gap",
]:
    if token.lower() not in demo.lower():
        fail(f"canonical BOAMAN reviewer demo missing contract token: {token}")

for token in [
    "BOAMAN · FUNDMEISTER",
    "BOAMAN capital workspace · powered by FUNDMEISTER",
    'const requestedProjectKey="boaman";',
    "Cap table",
    "SAFEs / Notes",
    "Use of funds",
    "Accounts / Expenses",
    "Immutable ledger",
    "Reports",
    'window.open("about:blank","fundmeister-auth"',
    'event.origin!=="https://izzyakos.com"',
    'type!=="fundmeister-auth-session"',
    "skipBrowserRedirect:true",
]:
    if token not in fm:
        fail(f"BOAMAN FUNDMEISTER workspace missing contract token: {token}")

for forbidden in [
    "#/jobs",
    "#/register",
    "Candidate Account",
    'href="https://boaman.izzyakos.com',
    "/baoman/",
]:
    if forbidden in fm:
        fail(f"BOAMAN FUNDMEISTER workspace contains deprecated/candidate route token: {forbidden}")

print("PASS: BOAMAN canonical public surface + reviewer demo + FUNDMEISTER click loop")
print("route=/boaman/ typo_redirect=/baoman/ demo=/boaman/demo/ fundmeister=/boaman/fundmeister/ canonical=https://izzyakos.com/boaman/ contrast=locked")
