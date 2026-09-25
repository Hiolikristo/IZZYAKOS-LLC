# Jericho Hour Prayer Ministry — PWA Concept Starter

**Prepared 25 September 2026 | Prototype, not deployed or owned by the ministry.**

## What this package does

A responsive, installable, offline-shell PWA **design preview**. It has working anchor navigation, a mobile menu, social-category filters, install prompt handling (once hosted on HTTPS), the ministry's verified YouTube channel and an archived video embed, outbound links to the ministry's currently published booking page, and sourced links to Columbus resource providers. Programs and marketplace are expressly **proposals**, not verified live events or approved partnerships.

The visual uses provisional gold/burgundy styling inspired by public ministry imagery. The package's temporary app icon **is not the official ministry logo**. See `assets/official-logo-source.txt` for the found original image URL. Request the owner's source-quality export before deployment.

## Run locally

```bash
cd jericho-hour-pwa
python -m http.server 8080
```

Visit `http://localhost:8080`. On localhost, browser service workers can run; on a public deployment they require HTTPS. Other than the YouTube embed, there are no third-party runtime dependencies or build steps.

## Deployment and migration

1. Ask the owner to approve the design, official brand asset and program categories. Do not override the existing ministry site.
2. Confirm whether the existing site is controlled in Squarespace, and ask the owner to add an appropriate contributor. Do not request passwords in chat.
3. Deploy a demo preview to an isolated preview host; test mobile, accessibility, keyboard and actual booking flow before production DNS changes.
4. Determine whether to keep Squarespace as an editorial/booking system and deploy this PWA on a subdomain, or migrate content with redirects. Preserve the original domain and SEO.
5. Configure verified social accounts, API/OAuth permissions and publishing consent; add event CMS and appointment integration, then build actual web push subscriptions.

## Pages and proposed backend

- Home / Watch / Programs / Booking / Market / Resources / Social / About.
- Recommended private service architecture: TypeScript/Next.js frontend, Supabase/Postgres tenant-scoped RBAC for approved ministry staff, program/event/merchant/moderation records, booking provider or Squarespace Scheduling integration, Stripe or the owner's approved giving mechanism if approved, YouTube API + individual platform-approved embeds, Web Push/VAPID with explicit opt-in and revocation.
- Authentication and review roles: owner, ministry administrator, booking coordinator, editor, youth-program moderator, verified vendor, member. No one can read private counseling information merely because they can administer events or social posts.
- Do not implement teen direct messages or upload content without guardian release, appropriate safeguarding review and active moderation. Treat counseling and prayer-request data as confidential; minimize collection and retention; avoid public testimonials without specific consent.
- Obtain music performance/recording/synchronization permissions before rebroadcasting or archiving worship recordings. Do not scrape/republish Instagram, TikTok or WhatsApp feeds contrary to platform terms.
- Treat BOAMAN, ShopExpress and Pantryster as **future opt-in external connectors**, never auto-share member or sensitive ministry data.

## Social account verification

| Platform | Status |
|---|---|
| YouTube | Public channel: https://www.youtube.com/channel/UCvO4tGCumtEeWitjAxN_mew |
| YouTube archive video | https://www.youtube.com/watch?v=bGlp1kYrk68 (23 July 2024) |
| TikTok | Appears on the current website; exact owner-confirmed URL needed |
| Facebook | Appears on current website; exact owner-confirmed URL needed |
| Instagram | Mentioned in project scope; exact owner-confirmed URL needed |
| WhatsApp | Mentioned in project scope; owner-created invite or channel URL needed |
| YouTube Shorts | Accessible through verified YouTube channel after owner verifies the preferred Shorts feed |

## Current site and resource sources

- https://www.jerichohourprayerministry.com/
- https://www.jerichohourprayerministry.com/counseling-deliverance
- https://www.jerichohourprayerministry.com/meet-our-leaders
- https://www.youtube.com/channel/UCvO4tGCumtEeWitjAxN_mew
- https://www.homeportlearning.org/
- https://www.omjcfc.org/
- https://www.ecdi.org/wbc
- https://www.columbus.gov/Government/Departments/Development/Human-Services-Resources

## Release gates

**V0 demo:** approved design, correct logo, verified handles, owner sign-off, accessibility and mobile QA, working existing-session redirects.
**V1 production:** verified CMS schedule; booking availability + confirmations + consent; opt-in push; privacy notice; moderated business submissions; social feeds only through permitted integration; backups; admin audit logs.
**V1.5:** adult training partners and webinar scheduling; moderated teen radio/video pilot with safeguards; tenant-isolated integrations into other products by user consent.

## Radio & community network v0.2 addendum (September 25, 2026)

The proof-of-concept now includes `#radio` on the listener page, an offline-capable 37.96-second original synthetic highlife-inspired MP3, a sample seven-day show lineup (`radio/programming.json`) with all times **TBD**, and `studio.html` (visual operations preview and downloadable programming draft). **The radio station is not on air**, studio does not authenticate and live recording, bookings, actual social feeds and web push require an approved backend. Production architecture and equipment are in `RADIO-RUNBOOK.md`, music-license and source evidence in `MEDIA-SOURCES.md`, the rate and cash assumptions in `BUDGET.md`, and owner meeting prompts in `MEETING-AGENDA.md`.

To show locally: `python3 -m http.server 8080` from the folder, then visit `http://localhost:8080/` and `/studio.html`. Test a deployed demo over HTTPS for PWA installation. To connect an approved AzuraCast station, set `azuraCastBaseUrl` and `stationShortcode` in `station-config.js`, enable the station's public HTTPS API and CORS where appropriate, and confirm `radio.js` live state without placing credentials in client code.