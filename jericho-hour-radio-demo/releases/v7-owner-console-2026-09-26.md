# V7 owner-review operating console — 2026-09-26

## Verified local build
Twenty linked static HTML pages (previous 19 + new unified `control-room.html`), with ministry-supplied logo, original sample MP3, installable PWA and offline shell. The new console has working owner-review local interactions for radio audio playback, one-to-many video preflight, multi-fund sample giving cart, local receipt fingerprint and separate treasurer approval, company-card reimbursement prevention, synthetic restricted-fund ledger, year-end accountant export, and topic-specific text opt-in / global STOP simulation.

**The entire V7 static release is NOT deployed to the public ministry site.** This release manifest does not synchronize all source code; the exact V7 packages are delivered privately via the same conversation:
- `Jericho-Hour-v7-PUBLIC-DEPLOY.zip`: 49 files, 227,991 bytes, SHA256 `51a603db71345be99eaf8405cb047a9398ce9c19f80d7aa4f35be86dcc98216d`. Safe static owner-review files only; all 20 pages live locally; root `index.html`. No real personal audio, financial data or provider credentials.
- `Jericho-Hour-v7-COMPLETE-SOURCE.zip`: 95 files, 425,199 bytes, SHA256 `3e3cb7a7429091d03ab71924f999cde268bca0cb0891c960fb383572329b5608`. Includes Node modules for double-entry gifts, receipts, bank matching, segregated expense review, SMS consent+STOP, multistream preflight, draft deny-by-default PostgreSQL schema, local tests and owner go-live documentation.
Both ZIPs passed CRC tests. Local Node tests passed 29/29 after fixing two test-fixture id lengths and a sample reimbursement flag; isolated Chromium QA verified the console at 390, 768 and 1440 px with no JavaScript exceptions or measured horizontal overflow. Static audit: 20 pages, zero missing local href/src targets and no syntax errors in local JS.

## Live public link — separate, earlier self-contained demo
To share with the ministry before their preferred hosting is ready, a copy of the previously tested self-contained public showcase was separately committed to company `main` at `/jericho-hour/index.html`; expected Pages URL `https://izzyakos.com/jericho-hour/`. **This public showcase is the earlier 8-module browser preview**, NOT the newly enhanced 20-page V7. The existing main `/jericho-hour-radio-demo/showcase.html` remains a fallback. Inspect GitHub Pages run for the new main commit before promising deployment, and test the custom-domain URL from a real user device.

## Dedicated client demo hosting
Netlify site id `4591ae61-5079-4eca-b6d3-403f260516e2` was previously created. Upload the 49-file V7 public ZIP into that existing site's Deploys drop zone. Full V7 preview address after successful deploy: `https://jericho-hour-radio-demo-bg90.netlify.app/control-room.html`. Do not assert that this address is live until independently verified. Railway free plan rejected additional service provisioning. Vercel connected deploy action has been unavailable.

## Production gates
Independent ministry approval, private ministry credentials, 24/7 AzuraCast setup, real RTMP account access, authorized recordings/music rights, payment gateway, bank feed, private file storage, genuine authenticated RLS/RBAC, CPA/accountant tax review, registered SMS sender and consent evidence are required before live operations.
