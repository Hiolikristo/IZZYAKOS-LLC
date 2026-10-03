# FUNDMEISTER Governed Capital Ledger v1 — 2026-10-03

## Canonical product placement

FUNDMEISTER is the IZZYAKOS founder-to-exit capital and stewardship layer. BOAMAN's public company-hosted route is `https://izzyakos.com/boaman/`; the authorized BOAMAN capital workspace is `/fundmeister/workspace/?project=boaman`.

## Live Supabase migrations

Applied to Supabase project `poqwirjoalxzrvdxzoip`:

- `fundmeister_cap_table_spend_ledger_v1`
- `fundmeister_workspace_ops_views_v1`
- `fundmeister_companywide_ledger_reports_v1`

These extend the existing FUNDMEISTER company-control schema; they do not create a separate product database.

## Capital structure

Live tables:

- `fundmeister.cap_table_holders`
- `fundmeister.security_issuances`
- `fundmeister.convertible_instruments`
- `fundmeister.option_pools`

Supported instrument/register concepts include common, preferred, restricted stock, options, warrants, units, SAFE, convertible note, KISS debt and KISS equity. Actual ownership is never seeded or inferred without company records.

## Use of funds and transaction control

Live tables:

- `fundmeister.use_of_funds_items`
- `fundmeister.financial_accounts` (extended)
- `fundmeister.bank_connections`
- `fundmeister.transactions` (extended)
- `fundmeister.expense_reviews`

A use-of-funds line can retain quantity, unit cost, approved and committed amounts, vendor/source URL, quote/SKU, market-proof state, milestone, priority, evidence and lifecycle state.

Transaction review currently flags:

- `UNMAPPED_USE_OF_FUNDS`
- `UOF_NOT_APPROVED`
- `OVER_APPROVED_AMOUNT`
- `MISSING_OR_UNVERIFIED_EVIDENCE`

Raw bank/card provider OAuth is not implemented in the browser. Provider secrets must stay server-side in an approved connector/Edge Function. Until a provider is configured, the workspace supports manual/import reconciliation and clearly labels the provider as unconfigured.

## Tamper-evident company ledger

`fundmeister.ledger_events` is append-only. Update/delete is blocked by database trigger. Every event records:

- organization/project
- actor where available
- event type
- entity type/id
- payload
- previous event hash
- current SHA-256 event hash
- timestamp

Change-capture triggers cover capital, use-of-funds, bank/account, transaction, expense-review and report records, plus the pre-existing FUNDMEISTER funding, budget, cost-assumption, evidence, reimbursement, payroll, WECL allocation, reporting-obligation, capital-needs, equipment-needs and talent-needs tables.

This is a tamper-evident application ledger, not a public blockchain.

## Scheduled statement of expenditure

Live tables:

- `fundmeister.report_subscriptions`
- `fundmeister.report_snapshots`

`pg_cron` checks hourly for due daily/weekly/monthly schedules. Generated snapshot payloads contain:

- period spend total
- transaction count
- open exception/review count
- transaction detail with evidence/review state
- use-of-funds lines and actual spend
- budget lines
- funding sources/restrictions
- current ledger tip hash

Workspace reports can be downloaded as JSON evidence packets. Workspace delivery is active. Outbound email remains `provider_pending` until an approved email provider is configured; the product must not claim an email was sent when it was not.

## Access model

RLS remains authoritative. Roles include founder/admin, finance, project manager, contributor, bookkeeper, accountant, auditor and scoped funder read-only access. Read-only funder access can be project scoped. Financial write access remains restricted.

## Verification performed

A rolled-back BOAMAN transaction test inserted a synthetic $125 expense against a synthetic $100 approved use-of-funds line with missing evidence. The automatic review produced:

- result: `fail`
- `OVER_APPROVED_AMOUNT`
- `MISSING_OR_UNVERIFIED_EVIDENCE`
- 3 related ledger events

The transaction was rolled back and a follow-up query confirmed zero synthetic use-of-funds, transaction, review or ledger rows remained.

A second rolled-back test created a weekly BOAMAN report schedule and ran the report generator. A statement snapshot was produced with the expected period, spend, transaction count and open-review count, then rolled back. A follow-up query confirmed zero synthetic report rows remained.

## Next provider gates

1. Choose and authorize a bank/card aggregation provider.
2. Store provider credentials only in server-side secrets.
3. Implement account-link handshake and webhook/sync adapter into `bank_connections`, `financial_accounts` and `transactions`.
4. Add an email-delivery provider for scheduled external statements.
5. If funder pre-spend authority is contractually required, add an explicit approval-policy/request workflow; do not infer that authority from read-only access.
