# PANTRYSTER

**Tech That Feeds, Helping Hands and Uplifting Lives.**

Pantryster is a Columbus-first community resource coordination platform for food, shelter, transportation, senior delivery, volunteers, donors and verified community partners.

## Status
Production baseline 0.1.

This baseline establishes:
- Next.js application shell
- responsive public product surface
- Supabase client boundary
- PostGIS-aware schema
- truth-first resource-status model
- RLS baseline
- 2-mile nearby-resource database function
- architecture and security documentation

## Run
1. Copy `.env.example` to `.env.local`.
2. Add Supabase project URL and anon key.
3. `npm install`
4. `npm run dev`

## Truth boundary
The repository intentionally does not seed unverified organization operating status as live data. Columbus production data should be loaded only with provenance and verification timestamps.
