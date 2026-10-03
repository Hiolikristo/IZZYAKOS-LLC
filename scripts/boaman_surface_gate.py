from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
BOAMAN = ROOT / "boaman" / "index.html"
DEMO = ROOT / "boaman" / "demo" / "index.html"
FUNDMEISTER = ROOT / "boaman" / "fundmeister" / "index.html"
HOME = ROOT / "index.html"
FUNDERS = ROOT / "funders" / "index.html"
LEGACY = ROOT / "fastpath" / "index.html"
MISSPELLED = ROOT / "baoman" / "index.html"
MISSPELLED_DEMO = ROOT / "baoman" / "demo" / "index.html"

def fail(msg):
    print(f"FAIL: {msg}", file=sys.stderr)
    raise SystemExit(1)

for path in [BOAMAN, DEMO, FUNDMEISTER, HOME, FUNDERS, LEGACY, MISSPELLED, MISSPELLED_DEMO]:
    if not path.exists():
        fail(f"missing required surface: {path.relative_to(ROOT)}")

bo = BOAMAN.read_text(encoding="utf-8")
demo = DEMO.read_text(encoding="utf-8")
fm = FUNDMEISTER.read_text(encoding="utf-8")
home = HOME.read_text(encoding="utf-8")
funders = FUNDERS.read_text(encoding="utf-8")
legacy = LEGACY.read_text(encoding="utf-8")
misspelled = MISSPELLED.read_text(encoding="utf-8")
misspelled_demo = MISSPELLED_DEMO.read_text(encoding="utf-8")

# Canonical contract: BOAMAN lives only at the IZZYAKOS path below.
CANONICAL = "https://izzyakos.com/boaman/"
for label, source in [("BOAMAN",bo),("home",home),("funders",funders),("legacy",legacy)]:
    if "boaman.izzyakos.com" in source or "fastpath-v0.vercel.app" in source:
        fail(f"{label} references a deprecated BOAMAN host")
    if "izzyakos.com/baoman/" in source:
        fail(f"{label} references misspelled /baoman route")

for required in [
    "Make capability visible.",
    "Make opportunity reachable.",
    "BOAMAN · IZZYAKOS LLC · PRE-PILOT",
    'href="./demo/"',
    'href="./fundmeister/"',
    "Capital discipline · FUNDMEISTER",
]:
    if required not in bo:
        fail(f"canonical BOAMAN surface missing: {required}")

if 'href="https://izzyakos.com/boaman/"' not in home:
    fail("company homepage does not launch canonical BOAMAN")
if 'href="./boaman/"' not in home:
    fail("company homepage missing canonical BOAMAN brief")
if "../boaman/" not in legacy:
    fail("legacy FastPath route does not redirect to canonical BOAMAN")
if "../boaman/" not in misspelled:
    fail("misspelled /baoman route does not redirect to canonical /boaman")
if "../../boaman/demo/" not in misspelled_demo:
    fail("misspelled demo route does not redirect to canonical demo")

for required in ["BOAMAN Reviewer Demo","Walk the BOAMAN mechanism.","fictional data","not a hiring prediction"]:
    if required.lower() not in demo.lower():
        fail(f"canonical reviewer demo missing: {required}")

# FUNDMEISTER click-loop contract.
for required in [
    "BOAMAN · FUNDMEISTER",
    "BOAMAN capital workspace · powered by FUNDMEISTER",
    'const requestedProjectKey="boaman";',
    '"/boaman/fundmeister/"',
    "Cap table",
    "SAFEs / Notes",
    "Use of funds",
    "Accounts / Expenses",
    "Immutable ledger",
    "Reports",
]:
    if required not in fm:
        fail(f"BOAMAN FUNDMEISTER workspace missing: {required}")

for required in [
    'event.origin!=="https://boaman.izzyakos.com"',
    'type!=="fundmeister-auth-session"',
    "skipBrowserRedirect:true",
    'window.open("about:blank","fundmeister-auth"',
]:
    if required not in fm:
        fail(f"FUNDMEISTER auth bridge missing: {required}")

for forbidden in [
    "#/jobs",
    "#/register",
    "Candidate Account",
    "location.replace(",
    'href="https://boaman.izzyakos.com',
    "/baoman/",
]:
    if forbidden in fm:
        fail(f"FUNDMEISTER workspace contains candidate/deprecated redirect token: {forbidden}")

print("PASS: BOAMAN canonical path + FUNDMEISTER click-loop gate")
print("canonical=https://izzyakos.com/boaman/ fundmeister=/boaman/fundmeister/ candidate_bounce=0 deprecated_host=0")
