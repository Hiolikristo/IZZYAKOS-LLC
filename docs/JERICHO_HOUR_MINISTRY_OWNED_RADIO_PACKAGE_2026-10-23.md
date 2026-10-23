# Jericho Hour — Ministry-Owned Radio & Connected Demo Proposal
**Prepared:** 2026-10-23 · **Status:** proposed; no hosting, domain, streaming or payment accounts purchased.

## Decision
Select **AzuraCast**, open-source self-hosted audio automation, on a ministry-owned virtual server and ministry-owned domain/subdomain. This creates control over station data, playlists, server configuration and operator access, not a lifetime-free hosting entitlement. The owner pays for future server/domain renewals. The ministry owns all accounts, domains, media rights and exported backups; IZZYAKOS receives revocable delegated operator access.

**Scope:** 24/7 streaming audio and AutoDJ, plus approved ministry live sermon audio. It is **not** a replacement for Restream's multi-destination live video to YouTube/Facebook/TikTok. Those require separate approved connectors, encoders, streaming rights and API credentials. Do not cancel a current production service until a tested cutover is approved.

## Hosting options and public pricing snapshot
| Option | Public price, 2026 | Three years, service fee only | Five years, service fee only | Ownership | Limit |
|---|---:|---:|---:|---|---|
| AzuraCast + DigitalOcean 4 GB / 2-vCPU Basic VPS | Software free, server **$24/month** | **$864** | **$1,440** | Full control of account/server/software; recurring cloud rental | 4 GB meets memory recommendation but 2 vCPU is below AzuraCast's 4-core recommended profile. Load-test one station. |
| RadioKing Start | **$340/year** | **$1,020** | **$1,700** | Station account/content, not software/hosting stack | Monthly audience/usage plan; no music licenses included. |
| Zeno.FM Starter | **$35/month** (current official help article; correct earlier $28 estimate) | **$1,260** | **$2,100** | Account/content, not software/hosting stack | Provider and ad/commercial terms must be checked. |
| Live365 Broadcast 1, with ads | **$650/year** | **$1,950** | **$3,250** | Hosted station account, not platform | Its music license coverage is **US, Canada, Mexico**, not blanket coverage of Ghana. |
These figures assume unchanged published rates, uninterrupted subscriptions, no usage overages, no tax, no domain, backup, maintenance, rights or streaming music fees. Compare written vendor quotes before contracting.

Sources:
- https://azuracast.com/docs/getting-started/installation/
- https://azuracast.com/docs/getting-started/requirements/
- https://www.digitalocean.com/pricing/droplets
- https://www.radioking.com/pricing-radio
- https://help.zeno.fm/en/article/plans-and-pricing-6f0z0h/
- https://help.live365.com/en/support/solutions/articles/43000790743-live365-2026-pricing-feature-update
- https://help.live365.com/en/support/solutions/articles/43000573915-what-licensing-coverage-does-live365-provide-
- https://pricing.registrar.cloudflare.com/

## Fixed-package planning allocation (USD, not a vendor quote)
### Limited-scope 3-year MVP: $3,500 total
- Installation/site/radio integration and handover: **$1,350**.
- VPS reserve, 36 × $24: **$864**.
- Backup/monitoring allocation, 36 × $7: **$252**.
- New .com domain registration and planned renewals: **$34**.
- Limited quarterly maintenance allocation: **$600**.
- Price/spike/contingency reserve: **$400**.
- **Total: $3,500.**

### 5-year expanded package: $7,500 total
- Production integration, QA, support documentation and handover: **$2,250**.
- VPS reserve, 60 × $24: **$1,440**.
- Backup/monitoring allocation, 60 × $7: **$420**.
- .com domain: **$55**.
- Limited planned maintenance allocation: **$2,400**.
- Price/traffic contingency reserve: **$935**.
- **Total: $7,500.**

Notes: Reservations are **budget allocations**, not prepaid cloud contracts. No promise of unlimited listeners, outages-free 24/7 operation, unlimited technical support, fixed supplier prices, full-site development, copyright clearances, multi-platform video streaming, payment gateway fees or international licensing. State allowable listening audience, bandwidth, retention, support response hours, change orders, rate-change rules and overage approvals in the signed agreement. The ministry should approve expenditure, own payer credentials and receive a transparent reserve/expense ledger.

## Architecture
```
Approved live microphone / OBS audio -> authenticated Icecast input
Approved royalty-free or licensed audio -> AzuraCast AutoDJ
AzuraCast stream on ministry VPS -> HTTPS radio.<ministry-domain>
Ministry website player -> HTTPS audio stream endpoint
Public website (read-only) -> stream health / current show metadata
Authenticated station staff -> AzuraCast back office
IZZYAKOS -> delegated integration and maintenance access only
```

Ministry chooses and purchases the domain under its own account. Configure DNS, TLS, backups, log retention and recovery separately. Never put station secret keys in public frontend JavaScript. Provide low-data audio encoding, listener analytics and media rights register before production cutover.

## Current functional demonstration
Branch `jericho-connected-owner-demo-20261023` provides **browser-local** interactive synthetic requests for booking, membership interest, giving simulation, notification preferences and a staff review queue. These examples can visibly carry data between pages in a single browser, but they **do not synchronize between different devices** and create no real reservations, accounts, donations, messages, or stream. They intentionally collect/store no names, phones, emails or payment identifiers.

**Next secured production increment:** authenticated ministry staff accounts, protected database with row-level policies, durable bookings and confirmations, server-side validation, privacy notice, and restricted access/audit logging. Only then expose forms to real people. Before broadcasting music, verify geographic performance and recording rights, licensing, and ministry approval.

## Phone demo acceptance
1. Open member website on Android and press Radio play on the sample audio (label as sample).
2. Visit Booking, select a fictional session/date/time and save demo request.
3. Open Staff Board on the **same phone/browser** and confirm that request is listed as pending demo.
4. Add fictional member interest and giving amount; verify counts; no personal contact data or charge.
5. Switch pages; verify player, navigation and simulated workflow persist.
6. Clear demo events at the end; record acceptance results.

**Client payment gate:** Show functional prototype and transparent limitations; send a scope and acceptance criteria; obtain a signed proposal, deposit and authorized ministry-owned service accounts before purchasing or onboarding actual data.
