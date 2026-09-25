# Jericho Hour Radio — Open-source operator architecture / first-air blueprint
Version 0.2 • September 25, 2026 • IZZYAKOS LLC design concept, ministry approval pending.

## One architecture; two separate deployment surfaces

```
Approved tracks & ministry master recordings → Media library/rights register → AzuraCast AutoDJ (Liquidsoap)
                                                                     ↑  live DJ account using BUTT/Mixxx
                                                                     ↓
                                                         Icecast HTTPS audio distribution
                                                                     ↓
    Listener PWA/site ← public JSON now-playing API + stream URL ← Radio public player
                                 ↓
                       approved broadcast recorder → protected archive → producer review → podcast replay
                                                                                ↓
                                                           approved, subtitled clips → YouTube / socials
```

- **Listener layer:** this static PWA (compatible with Netlify or Vercel). Embedded official sermon YouTube player works without an unauthorized scrape. `station-config.js` holds a public AzuraCast base URL and station shortcode only; never passwords or admin keys. `radio.js` polls station public `/api/nowplaying/<shortcode>` (30 s) and moves the player from prototype audio to real Icecast stream only when the server reports online.
- **Broadcast layer:** self-hosted [AzuraCast](https://www.azuracast.com/docs/) via its maintained official Docker installation method on ministry-controlled Linux VPS. It includes Liquidsoap AutoDJ, Icecast, web DJ, playlists, schedule, HTTPS proxy, station statistics and optional automatic live broadcast recording. Choose a current stable release and follow the official install instructions rather than copying an unmaintained compose file.
- **Live audio inputs:** [BUTT](https://danielnoethen.de/butt/) (Broadcast Using This Tool) for simple desktop live microphone input, or [Mixxx](https://mixxx.org/) when DJ mixing is desired; both are available for multiple desktop OSs and connect to AzuraCast as a unique staff streamer user. [Audacity](https://www.audacityteam.org/) for offline voice production; FFmpeg for mastering and format conversion.
- **Video:** OBS Studio for voluntary camera/service production → approved YouTube Live destination initially. Do **not** force browser users to load simultaneous video+radio by default. For a future self-hosted video channel, evaluate Owncast separately; video infrastructure and rights differ from audio radio.
- **Metadata and automation:** AzuraCast public REST API for now-playing, schedule and listener numbers, authenticated server-side API for playlist mutations. A producer approves schedule events in a ministry CMS; a controlled worker syncs them to AzuraCast DJ slots and playlists. The PWA never receives API admin tokens.

## Proposed radio clock — discuss, never present as ministry's confirmed hours

| Day | Concept slot | Program | Scheduled time |
|---|---|---|---|
| Mon | Talk | Her Home, Her Voice: women, families, parenting and budgets | Owner TBD |
| Tue | Supervised youth | NextGen Broadcast Lab: youth production and media literacy | Owner TBD |
| Wed | Workforce | Opportunity Hour: local jobs, homeownership and workforce webinars | Owner TBD |
| Thu | Community interviews | Local business spotlight and approved market stall features | Owner TBD |
| Fri | Ministry service | Prayer, worship, testimony / live special service | Owner TBD |
| Sat | Culture | Ghanaian highlife heritage & properly licensed gospel showcase | Owner TBD |
| Sun | Worship | Live official service when scheduled, else owner-approved archived sermons | Owner TBD |

Between live slots: short station ident, rights-cleared songs, approved prayer promos, a community notice, then AutoDJ resumes. The real schedule must be approved by the ministry in America/New_York timezone; Ghana time can be shown separately as Africa/Accra (not DST-adjusted).

## Practical launch checklist

1. Obtain a ministry-owned domain/subdomain (`radio.`) and a Linux VPS with 2–4 vCPU, 4–8 GB RAM, SSD and a documented monthly transfer allowance; confirm with AzuraCast current requirements. Use fixed backups and alerts, HTTPS/TLS for public streams. **Never host continuous audio using an ordinary static Vercel or Netlify function.**
2. Install and update AzuraCast following its current Docker instructions. Set owner admin MFA (where supported upstream or at identity/proxy layer), individual streamer users, least-privilege media editor roles, secure passwords, recovery credentials and IP/rate controls; avoid sharing one DJ account.
3. Initialize station, public proxy, one low-bandwidth 64 kbps AAC or MP3 mount (compatibility test), optionally a higher 128 kbps mount if server bandwidth allows. Validate browser/mobile playback over HTTPS. Disable blank/unlicensed default playlists. Upload approved files with metadata and rights register IDs.
4. Set fallback playlist, short station ident and live-stream priority, then test stream disconnect/reconnect and Internet outage with the DJ. Record a 30-minute internal mock show, inspect archive file, backups and rights metadata.
5. Integrate `station-config.js` public URL + shortcode into PWA, enable push opt-in only after service worker VAPID sender, subscriber database, consent records and unsubscribe endpoint exist. Staff editorial approval for WhatsApp/TikTok/Instagram/Shorts clips before publishing.
6. Establish named program director, content moderator, safeguarding lead for youth, booking agent, radio engineer and weekly backup/restore operator. Keep counseling submissions outside the broadcast/admin content system. Obtain written media releases before streaming minors or private counseling.
7. Prepare U.S. music public-performance and recording licenses or direct written music releases as needed. SoundExchange's noninteractive webcasting coverage differs from musical composition public performance and on-demand podcast or recorded clip clearance. Check licensed musical content before any full 24/7 public launch.

## Operational cost drivers and telemetry

At 64 kbps, **100 listeners concurrent for 24 hours every day** consume around **2.1 TB/month** of outbound audio before protocol overhead; plan transfer limits, CDN/relay and listener concurrency before pricing production hosting. Track stream health and listener sessions without intrusive user profiling. Recording 128 kbps audio 24/7 is ~1.4 GB/day before extra masters, images or replicas. Choose object-storage retention and backup to match approved archival policy. A static PWA can be inexpensive; the 24/7 server, media transfer, backups, email and licenses are recurring.

## Do not mistake the demo for production

`studio.html` contains proposal-only programming and exportable JSON but is **not secured production admin**. It must not collect passwords, private listener identities, counseling notes or genuine bookings. Owner approves service times, official logo/social profiles and every live-show host before public launch. All cross-company connectors (BOAMAN, ShopExpress, Pantryster) must be tenant-isolated and optional.