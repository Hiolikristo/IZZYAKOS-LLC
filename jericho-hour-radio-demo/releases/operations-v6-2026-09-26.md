# Jericho Hour Operations V6 — build and publication checkpoint
Date: 2026-09-26. Owner-review prototype, no ministry production systems connected.

## New public interactive preview
Self-contained browser showcase was committed to the public corporate `main` branch at commit `35dcf08294586037340a34476b4f296a0ff3e500`: `/jericho-hour-radio-demo/showcase.html`. Both the sponsor/static gate and GitHub Pages build-and-deployment workflows **completed successfully** for that exact commit. Custom CNAME recorded in main: `izzyakos.com`. Expected published path: `https://izzyakos.com/jericho-hour-radio-demo/showcase.html`. Independent HTTP fetch from this execution environment was unavailable; verify from another device before promising custom-domain reachability. Third-party fallback renderer: `https://htmlpreview.github.io/?https://github.com/Hiolikristo/IZZYAKOS-LLC/blob/main/jericho-hour-radio-demo/showcase.html`. Never enter actual personal data into a public browser preview.

## 19-page extended local release
New pages: `expenses.html`, `tax-center.html`, `texting.html`; linked CTAs also on homepage, radio, admin, giving, orphanage and finance pages. No production bank/card, phone provider, charity payment, tax filing, livestream, login or real RBAC. Test data is synthetic. Radio player supports the owner-approved original audio sample; real low-data/live endpoint unconfigured.

- `Jericho-Hour-v6-SHOWCASE-Netlify-Upload.zip`: 46 static files, 212694 bytes, SHA256 `84ab320322f2c0a8c0a7e95ce25ac82efeb539429ecd6b3cc4d078a3e68e3a58`, root `index.html`, ZIP CRC pass. This file is in the user conversation, **not committed** as individual source files to GitHub.
- `Jericho-Hour-v6-Complete-Source.zip`: 83 source/test/docs files, 394918 bytes, SHA256 `b476fb2f2bc47528449d8448b24c911deda29faa65d15d88c1ffdaf2b53a9c6c`. Distributed to owner from ChatGPT. Do not commit internal consultation/recording materials publicly.

## Test evidence
19 HTML files; no unresolved local links or JS syntax errors. Six key pages (home, radio, finance, expenses, tax and texting) tested at mobile 390, tablet 768 and desktop 1440 px (18 browser cases): no horizontal overflow or JavaScript exceptions after fixing storage-denied fallback. Interaction QA: requester cannot approve own reimbursement, different-role example approval, sample card matching, hypothetical tax reserve, explicitly invalid donor receipt sample, SMS consent/no-send. Output screenshots in deliverable folder.

## Regulatory boundaries and next gates
Qualified church status needs verification; annual Form 990 exception does not automatically waive payroll, state taxes or unrelated-business income responsibilities. Tax page does not claim a precise tax balance from incomplete records and does not use a flat percentage as tax law. See IRS https://www.irs.gov/publications/p463 and https://www.irs.gov/charities-non-profits/unrelated-business-income-tax and https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-written-acknowledgments .
Implement actual receipt storage, bank reconciliation, segregation of duties and opt-in messaging behind approved server authorization; never collect confidential finance records on the public demo.

## Other hosting
Existing Netlify project `4591ae61-5079-4eca-b6d3-403f260516e2` remains without independently verified published source; user can manually upload the 46-file ZIP via the project's Deploys drop zone. Railway deployment was attempted but account returned free-plan provision limit, so no Railway service was created. Do not conflate GitHub Pages owner-preview success with the ministry's own 24/7 radio being active.
