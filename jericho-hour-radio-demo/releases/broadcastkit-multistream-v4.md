# BroadcastKit multistream v4 — owner-review release manifest

Date: 2026-09-26 | Technical status: locally tested; **not deployed to the ministry's public website, no social streaming accounts connected**.

## Deliverable archives
- `Jericho-Hour-Multistream-Live-Demo-Upload.zip` — 36-file static Netlify upload, 183,541 bytes, SHA256 `399b761fe3d19d8f424bba2d230e5c9a860142b029e2e9a7895bbcee84f05c28`. Root `index.html` and new interactive `multistream.html`, `multistream.css`, `multistream.js`. Contains no private consultation notes or real stream credentials.
- `Jericho-Hour-BroadcastKit-v4-Full-Source.zip` — 64-file source package, 345,760 bytes, SHA256 `a0ca174a0ee427ff834c30c9117720f632ea6432ed1c5bb6537a4570d6f194cc`. Distributed privately to owner in the originating ChatGPT conversation; includes dry-run FFmpeg engine and local tests. These archives have **not** been synchronized as individual GitHub source files on this branch by this manifest commit.
- Two-sink offline proof: one synthetic H.264/AAC input was single-encoded via FFmpeg tee into two 2.023-second FLV outputs (~90,808 bytes each). **No actual external platform connection**.

## QA
Node.js adapter tests: 8/8 passed (including destination host/protocol allowlist, dry-run redaction and local two-output proof). UI interactive tests passed desktop 1440px and mobile 390px; no horizontal overflow or page JS errors in isolated local browser. Static audit: 13 HTML pages, 0 missing local asset references; link to simulcast demo placed on homepage, radio, studio, administration.

## Research summary
Restream official pricing as checked Sep 26: Free 2 concurrent channels with branding; Standard $19/month for 3; Professional $49/month for 5, monthly display. Facebook Pages and custom RTMP require paid Restream plans. References:
- https://restream.io/pricing
- https://support.restream.io/en/articles/9127747-can-i-use-restream-for-free-yes
- https://www.ffmpeg.org/ffmpeg-formats.html#tee-1
- https://developers.google.com/youtube/v3/live/docs
- https://support.restream.io/en/articles/6379108-stream-to-instagram
- https://support.restream.io/en/articles/6721574-stream-to-tiktok

## Product scope
Open-source OBS + SRS + FFmpeg tee + optional Owncast, with original secure BroadcastKit orchestration and per-tenant dashboards. Input from one approved studio feed, independently approved RTMP(S) destinations, separate optional vertical encodes, local recording and recovery. A single in-app control may start prepared destinations but cannot bypass TikTok eligibility, Instagram Live Producer's per-event key and manual Go Live step, platform policies, music rights, or outbound network fees. Reconcile consultation recording only after full transcript is available; the current transcription API exposed **only the first ~61 seconds of the 60:40 recording**, despite marking both jobs complete. Do not publish raw audio or personal pastoral discussion.

## Deployment
Existing Netlify site ID: `4591ae61-5079-4eca-b6d3-403f260516e2`; upload the static archive manually in Netlify's Deploys drop zone and verify the production site. Do not claim this release is live until published and independently tested. Keep the ministry's existing Squarespace site unchanged until owner approval.
