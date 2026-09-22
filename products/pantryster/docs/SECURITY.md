# Security baseline

- Supabase RLS is mandatory on every user or partner data table.
- Public users may read only verified public resources.
- Assistance requests are not public map objects.
- Exact home locations and sensitive request details must not be exposed to volunteers before assignment.
- Partner claims require verification before status-update authority.
- Admin actions require authenticated role checks and audit records.
- Operational updates must retain source, timestamp and actor.
- No service-role key may be exposed in browser code.
- Production must use HTTPS, CSP/security headers and rate limits on write endpoints.
