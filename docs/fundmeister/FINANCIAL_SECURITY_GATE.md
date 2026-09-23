# FUNDMEISTER Financial Security Gate

Status: BLOCKING for real bank/receipt/payroll data.

## Existing BOAMAN environment findings

The BOAMAN Supabase project is healthy and already uses RLS, but its current security advisor reports existing SECURITY DEFINER RPC exposure for authenticated users and leaked-password protection is disabled. Several of those RPCs perform internal/staff/pilot functions and rely on in-function authorization checks.

That pattern may be acceptable only after explicit review for the existing workforce application. It is **not** sufficient evidence to introduce financial records.

## Required GREEN conditions before financial activation

- [ ] Review every SECURITY DEFINER RPC reachable by authenticated users.
- [ ] Revoke EXECUTE where client access is not required.
- [ ] Prefer SECURITY INVOKER when elevated privilege is not required.
- [ ] For retained SECURITY DEFINER functions, verify explicit role check, fixed search_path, narrow return shape, and no user-controlled dynamic SQL.
- [ ] Enable leaked-password protection or document an approved alternative auth posture.
- [ ] Create a dedicated financial schema/data plane with no anon grants.
- [ ] Implement organization/project memberships and finance-specific roles.
- [ ] RLS negative tests: unrelated user, ordinary candidate, employer, partner, revoked staff.
- [ ] RLS positive tests: founder/admin, finance, bookkeeper, accountant, scoped auditor.
- [ ] Add immutable audit events for financial changes.
- [ ] Define evidence-object storage policy and malware/content-type validation.
- [ ] Define secret/token boundary for bank/payroll providers.
- [ ] Define data-retention/deletion rules and backup/restore test.
- [ ] Threat-model CSV imports, duplicate transactions, transfer double counting, evidence tampering, IDOR, privilege escalation and exported-report leakage.
- [ ] Complete human security review before production migration.

## Pilot allowance

The current BOAMAN FUNDMEISTER pilot may display public-source opportunities, empty/TBD cost templates, readiness gaps and non-sensitive control-plane concepts. It must not store or expose real bank transactions, receipts, payroll, tax records or funding-source account details until this gate is GREEN.
