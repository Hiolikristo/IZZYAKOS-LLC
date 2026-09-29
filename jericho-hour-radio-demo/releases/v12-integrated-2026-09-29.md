# Jericho Hour V12 integrated checkpoint — 2026-09-29

## Public deployment
Current member site: https://izzyakos.com/jericho-hour/
Latest GitHub Pages deployment checked for public main commit `a223422060584bb7e6bbdf5ddf91255e05034e79`: **success** (run 36564610438). The local execution environment cannot resolve the custom domain, so production reachability must still be checked from an external browser; user screenshots confirm the custom-domain site was reachable before these final patches.

## Member experience changes
- community/social feed added at `/jericho-hour/feed.html`, linked from home/community and dynamically surfaced in member navigation
- homepage community pulse moved near the top to make the experience more social
- ministry logo enlarged globally through the shared experience stylesheet
- three real full-page theme states: Cream, Reddish Brown/Burgundy, Black
- language preference includes English/French/Spanish/Portuguese/Arabic plus major West/East/Central/Southern African languages; several nav labels translate immediately, while full-page translation remains gated on a self-hosted translation service
- top radio dock appears on public and utility/staff pages using shared shell; safe member-page soft navigation preserves the demo audio context; hard-navigation state attempts resume and must expose tap/resume when browser autoplay policy blocks it
- official ministry YouTube sermon remains embedded; no sermon MP3 was ripped
- member booking-engine preview added; current official counseling page remains authority until ministry-approved slots are published
- public schedule + consultation-reported recurring prayer calendar, ICS export, staff local draft/open/block board, member phone/email/language/reminder preferences, and notification consent/STOP training controls remain
- restored missing `control-room.html` target so staff portal CTA no longer points at a nonexistent page

## Code-level link/CTA audit
GitHub source audit covered 22 HTML pages and 445 relative href/src references in three batches: **0 missing local targets** after restoring the control-room page.
Button-handler audit across public and staff/utility pages found **0 orphan button IDs** by the static handler/data-attribute check.
This is a code-level/static audit; it does not prove third-party endpoint uptime or production authentication.

## Resources
Public resources page now includes live official/referral links for OhioMeansJobs Columbus-Franklin County, Homeport, ECDI Columbus/Women's Business Center, Columbus Office of Diversity & Inclusion, Ohio Legal Help, Action for Children, CAP4Kids Columbus and City of Columbus business resources.

## Music rights
No third-party MP3 has been copied into the public site. Rights-gated candidates are listed in the staff music library, including Free Music Archive CC BY material and Worship Start/Pixabay source guidance. Raw audio should be imported only with exact license evidence; Worship Start terms contain language that should be reconciled per download/track.

## Standalone software
Owner package: `IZZYAKOS-BroadcastKit-v0.2.zip`
SHA256: `b14907b4b86036c4205e109a8915408bbb8c6d4a6d7ce9e06e85adabff141d46`
13/13 local Node tests passed.
Includes multistream orchestration, schedule/reminder logic, notification consent/STOP, social-feed normalization, external-feed connectors, translation adapter, media-quality readiness, player persistence contract, original low-data demo audio, studio preflight demo and deployment/rights documentation.

Accra migration prompt SHA256: `053b0c02e6fcfd79767120bb2170d40cd68f356a672ba217b6773b13bad8de38`.
Accra preview branch: `Hiolikristo/myaccraintmarket-demo: broadcastkit-radio-preview-2026-09-29`, commit `bc79472920843f2a20e8764703ca5c8764c358e3`. It adds a non-destructive radio preview and integration prompt; production Accra main was not overwritten.

## Production gates still required
Real AzuraCast/SRS/FFmpeg servers, social-provider credentials and platform eligibility, owner-approved sermon/audio masters, secure authentication/MFA/RBAC, ministry-owned member database, SMS provider/carrier registration and consent logs, production translation runtime, payment/bank integrations, privacy/safeguarding review and owner acceptance tests. Never represent those as live until independently verified.
