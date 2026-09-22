# Pantryster architecture — production baseline 0.1

## Stack
- Next.js: public site, PWA shell, partner/admin UX and server routes.
- Supabase: PostgreSQL, Auth, Realtime, Storage and row-level security.
- PostGIS: distance/radius queries for local resource discovery.
- Vercel: intended web deployment target.
- pantryster.org: intended canonical public domain.

## Core rule
Pantryster does not present a pantry or shelter status as live unless the status has a source, timestamp and verification state.

## Core domains
1. Resources
2. Organizations
3. Assistance requests
4. Volunteers
5. Donors
6. Partner status updates
7. Transportation and delivery access

## Columbus pilot
The first deployment is intentionally local. Geographic expansion follows validated partner operations, not raw directory scale.
