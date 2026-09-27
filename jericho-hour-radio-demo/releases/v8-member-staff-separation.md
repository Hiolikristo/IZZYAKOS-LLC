# Jericho Hour V8 — member experience and staff split
Date: 2026-09-27.
**Member-facing GitHub Pages site committed on corporate main:** `6b60d8ffa29f411bf83518fefcfcc646bec48d07`.
The GitHub Pages build and sponsor surface gate both returned success for this exact main commit (workflow runs 36293461111 and 36293461670). Independent HTTP fetch of custom domain is unavailable from the current runtime. Browser preview path: `https://izzyakos.com/jericho-hour/`.
**Staff demo:** `https://izzyakos.com/jericho-hour/staff.html` leads to synthetic operating board `staff-demo.html`. Previous direct admin showcase `/jericho-hour-radio-demo/showcase.html` redirects to the staff gateway. This is training navigation, **not authenticated security**.

## Locally tested 24-page full V8 website
Visual redesign restores the original cream/wine/gold "Where prayer meets purpose" mockup and authentic owner-supplied ministry logo, with a cropped seal in member navigation. Official published 2024 Jericho Hour sermon embedded via YouTube-nocookie (`bGlp1kYrk68`) on the public home and radio page. The existing synthesized audio sample remains optional. **No copyrighted MP3 ripped from YouTube; owner-approved master is required for background listening and permitted downloads**.
- Public member flows: home, published sermons, radio preview, programs, schedule awaiting ministry-confirmed handwritten timetable, official prayer-booking links, community, resources, giving and prospective Ghana care project.
- Staff training routes: separate staff gateway, content editor, broadcasting studio and multistream/Zoom/phone routing guide, synthetic finance/expenses/tax readiness/SMS and unified control room.
- Member auth wiring: safe preview by default; optional Supabase auth UI and restrictive schema draft `migrations/0002-members-and-programs.sql` to activate ONLY in a newly approved ministry-owned Supabase project after security/privacy review. Do not reuse IZZYAKOS workforce/customer databases or deploy an admin user interface without server-enforced MFA/RBAC and tenant checks.
- Schedule remains unconfirmed. Do not invent official services or imply bookings were accepted.
- Zoom path: licensed Zoom meeting with custom livestreaming enabled sends one RTMP(S) output to ministry-controlled BroadcastKit ingest. Phone path: approved RTMPS/SRT mobile encoder or OBS captures phone feed. Per-destination verified keys and health status; Instagram/TikTok account eligibility/manual requirements remain.
- Legacy site version 7 public nav included staff/finance and risked missing CSS when a single HTML file was deployed without styles/assets. V8 uses fully inline critical CSS on main GitHub Pages member site. The complete full-source/Netlify ZIP contains all static assets.

## V8 ZIP deliverables (local, distributed to owner; NOT uploaded into repository binary tree)
- `Jericho-Hour-v8-MEMBER-SITE-PUBLIC.zip`: 60 files; 259329 bytes; SHA256 `87bbc739b267c9679164f792bdb6bae93d5d71738006399b77857d39a35bc930`; root `index.html`.
- `Jericho-Hour-v8-COMPLETE-SOURCE.zip`: 107 files; 459671 bytes; SHA256 `7a99ab2aac9e8722e75c9c9eeb1f2a314c96f8e80ccf494e5dda1f68cfbc30ac`.
- Static audit: 24 HTML pages, zero broken local href/src paths, no Node JS syntax errors.
- Local Chromium (injected same HTML+CSS+JS because local network navigation blocked): member UI at 390/768/1440 had no horizontal overflow or JS errors, mobile navigation opens, sermon button mounts official embed; member preview and four critical supporting pages passed.
- Existing BroadcastKit/finance back-end Node test suite: **29 passing**. These are local QA proofs, not live production tests.

## Required next data from owners
The handwritten ministry service timetable (days, hours, time zone, hosts, booking capacity), ministry-approved sermon MP3 master and redistribution/download rights, official Zoom plan/owner, official social platform accounts, and ministry-owned independent authentication and stream infrastructure. Do not process real donations, real member data, real SMS or 24/7 radio until approvals and integrations pass live tests.
