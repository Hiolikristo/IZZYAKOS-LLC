# FUNDMEISTER Financial Security Gate

Status: **GREEN for non-sensitive control-plane metadata and read-only management views. AMBER/BLOCKING for real bank transactions, receipt storage, payroll records and provider write integrations.**

## What is live now

- [x] Dedicated `fundmeister` schema/data plane created in the active BOAMAN Supabase project.
- [x] No anonymous grants on FUNDMEISTER financial/control tables.
- [x] Organization membership and finance-specific RBAC implemented.
- [x] All FUNDMEISTER tables have RLS enabled.
- [x] Browser-facing company management surfaces use read-only, `security_invoker` views.
- [x] Authenticated browser writes to FUNDMEISTER tables are revoked.
- [x] Founder/admin positive isolation test passed.
- [x] Unrelated authenticated-user negative isolation test passed: zero IZZYAKOS projects visible.
- [x] Immutable audit-event table created; ordinary authenticated clients have no write/delete access.
- [x] Provider credentials/tokens are explicitly outside the financial tables.
- [x] BOAMAN budget skeleton uses TBD/source-required amounts rather than fabricated values.
- [x] Foreign-key indexes added after database-advisor review.

## Existing BOAMAN environment findings that remain outside the new FUNDMEISTER schema

The Supabase security advisor still reports existing public-schema `SECURITY DEFINER` RPCs callable by authenticated users and leaked-password protection is disabled. These pre-date the FUNDMEISTER control plane. They do not appear as new FUNDMEISTER findings, but they remain relevant before sensitive financial activation.

## Required GREEN conditions before sensitive financial activation

- [ ] Review every existing public-schema `SECURITY DEFINER` RPC reachable by authenticated users.
- [ ] Revoke `EXECUTE` where client access is not required.
- [ ] Prefer `SECURITY INVOKER` when elevated privilege is not required.
- [ ] For retained `SECURITY DEFINER` functions, verify explicit authorization, fixed `search_path`, narrow return shape and no user-controlled dynamic SQL.
- [ ] Enable leaked-password protection or document an approved alternative authentication posture.
- [ ] Define evidence-object storage policy, content-type validation and malware scanning.
- [ ] Define the provider secret/token boundary for bank and payroll integrations.
- [ ] Define data retention/deletion rules and execute a backup/restore test.
- [ ] Threat-model CSV imports, duplicate transactions, transfer double counting, evidence tampering, IDOR, privilege escalation and exported-report leakage.
- [ ] Add controlled server-side write APIs with separation-of-duties checks and audit events.
- [ ] Run positive/negative tests for finance, project-manager, bookkeeper, accountant, auditor and funder-readonly roles.
- [ ] Complete human security review before any live bank/payroll provider connection.

## Allowed pilot data

The IZZYAKOS/FUNDMEISTER control plane may persist company/project metadata, workstreams, planned corporate email identities, public-source funding opportunities, eligibility state, source-backed/TBD budget lines and audit metadata.

It must **not** represent bank connections, transactions, receipts, payroll, tax records, grant awards or funder compliance as active unless those records and required controls actually exist.
