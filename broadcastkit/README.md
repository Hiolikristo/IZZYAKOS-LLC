# IZZYAKOS BroadcastKit v1

Reusable community broadcasting engine for Jericho Hour, Accra International Market and future tenants.

Core modules: persistent radio, AutoDJ/live handoff, schedule/reminders, multistream preflight, studio quality checks, rights ledger, guest/source integration, theme/language preferences and client adapters.

Production reference architecture:
OBS/browser guest room -> SRS or MediaMTX ingest -> FFmpeg/Liquidsoap processing -> AzuraCast/Icecast radio + RTMP(S) social relays -> archive/object storage -> authenticated tenant admin.

This branch contains preview/reference source only. No live credentials, bank data, SMS provider keys or client-private information.
