# Prompt for Accra International Market

Integrate the reusable IZZYAKOS BroadcastKit capabilities into the existing `Hiolikristo/myaccraintmarket-demo` radio stack without replacing its current product/e-commerce architecture.

Preserve the existing files and Supabase migrations (`radio.html`, `radio-player.html`, `live.html`, `admin/radio.html`, `assets/js/radio.js`, `assets/js/admin-radio.js`, `assets/js/community-live.js`, radio/community-live migrations). Work on a feature branch first.

Add/align these capabilities:
- persistent player across product/category/community navigation; playback state survives in-app navigation;
- Light/Earth/Dark themes mapped to BroadcastKit theme tokens without changing Accra brand assets;
- radio program schedule, AutoDJ queue, live handoff and rights ledger;
- one approved ingest -> YouTube/Facebook/owned site plus eligible Instagram/TikTok destinations using server-side credentials;
- Zoom/custom RTMP and phone/SRT/RTMPS ingest instructions;
- studio preflight: exposure, framing, matting/background quality, mic level and connection readiness;
- member/customer opt-in reminders with consent, STOP/suppression, quiet hours, 1-day / 3-hour / 30-minute / live timing;
- community feed cards for live radio, store events, recipes, product drops and local Ghanaian business/culture posts;
- never expose stream keys, Supabase service keys, bank data or PII in browser source;
- keep product purchasing separate from radio playback so the player never blocks checkout;
- add tests for broken links, player continuity, theme switching, mobile overflow, role checks and empty-state behavior.

Use Accra's existing admin RBAC and Supabase tables where compatible; add migrations only when necessary. Do not copy Jericho ministry content or branding. The shared layer is technology and interaction patterns, not client data.