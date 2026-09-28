# Jericho Hour V10 / BroadcastKit Studio v0.2 — integrated checkpoint
Date: 2026-09-28

## Public member demo
GitHub Pages member site: https://izzyakos.com/jericho-hour/?v=10
Latest verified Pages deployment in this execution: main commit `085aaea33c00130832b3370e956dc0b0673269d8`, pages workflow run 36442279970 = **success**; sponsor surface gate 36442280470 = **success**.
Updated public routes include:
- `/jericho-hour/` enlarged ministry branding, cream/brown theme control, language-preference shell, consultation prayer-clock summary.
- `/jericho-hour/schedule.html` consultation-reported recurring schedule plus interactive calendar; unresolved time-zone/Sunday in-person/revival-night details remain explicitly flagged.
- `/jericho-hour/member.html` first/last/email/phone/language/interests/reminder-preview fields; public demo submits or stores nothing.
- `/jericho-hour/staff.html` redirects to V10 staff training hub; not authentication.
- `schedule-admin.html`, `notifications.html`, `music-library.html` are training/preference/rights pages.
- `radio.html` uses ministry-published YouTube sermon embedding and links to reminders/rights; no YouTube MP3 is redistributed.
- `broadcasting.html` documents Zoom/phone ingest and measured quality requirements from supplied sample.

## Consultation schedule currently encoded
Mon–Fri 04:30–06:00, 13:00–13:30, 17:00–18:30.
Sunday 21:00–22:00.
First and last Friday monthly 22:00–23:30.
Last-week revival 23:00–00:00; handwritten notes conflict between four nights and Monday–Friday, so exact nights require owner confirmation.
A separate 18:00–19:00 in-person prayer note likely refers to Sunday but remains unconfirmed.
Time zone still requires ministry sign-off before reminders or external calendar publication.

## V10 packages (owner delivery, not all individual source files mirrored into GitHub)
- `Jericho-Hour-v10-PUBLIC-SITE.zip` SHA256 `59212f728bdbb746fb609a5795f93c3c6edfd03823f1a4d1c5138021f126a0ec`.
- `Jericho-Hour-v10-FULL-SOURCE.zip` SHA256 `0a6523fe117d0140c9998bb89225ab951b842efa0f1e9f281fd5e533882663d0`.
Both ZIP CRC tests passed. Local source audit: 28 HTML pages, zero unresolved local href/src references, all local JS passed Node syntax checks. Do not represent this as a full external-browser acceptance test; local browser navigation was constrained.

## IZZYAKOS BroadcastKit Studio v0.2
Owner package: `IZZYAKOS-BroadcastKit-Studio-v0.2.zip`, SHA256 `0b0f2cc4ade1aa50398681d9dd932484bef3c374804a3e333efb89a1f031b768`.
Node tests: 10/10 passing.
Implemented prototype capabilities: camera/mic capture, average-brightness assistance, contrast/saturation controls, controlled soft green-screen fallback, 80 Hz high-pass, compressor/makeup gain, RMS meter, local processed WebM sample, dry-run multistream preflight/host allowlist, reminder queue/quiet hours, SMS-consent gate, media-rights gate, SRS + optional LibreTranslate Docker Compose starter.
Production gates not falsely claimed: AI portrait/hair-edge temporal segmentation, real RTMPS/SRT workers/failover, social OAuth credentials, SMS/email/push providers, member/staff auth/MFA/RLS, approved sermon audio masters, track clearance.
Supplied 16.43 sec 1080p sample measured approx -28.52 LUFS integrated, -9.53 dBTP true peak, LRA 2.80; visual review drove background-edge/light-match requirements.

## Accra migration
Accra repo audited: `Hiolikristo/myaccraintmarket-demo`.
Existing reusable foundation includes `radio.html`, `radio-player.html`, `live.html`, `admin/radio.html`, radio/community-live JS/CSS, PlatformEngine tenant behavior, Light/Dark/Earth themes, Supabase radio/community-live migrations and RLS/security work. Do not rebuild it or cross-share Jericho member data.
Owner migration prompt: `Accra-BroadcastKit-Migration-Prompt.md`, SHA256 `e4dd8ff9704de67e7787d8e46d1f2bea41435e3357e71f1cd37ed5aaf4a7e1ca`.
Accra code has intentionally not been changed from this room; execute the prompt in the Accra build room against current main and preserve catalog/cart/checkout and existing RLS.

## Truth / rights boundary
No third-party commercial music or ripped sermon MP3 is bundled. A track enters radio only after exact license/channel rights and attribution are recorded. Mixkit should not be assumed valid for radio broadcasting. Member phone/email, social keys and ministry finance records must never be entered into public demos.
