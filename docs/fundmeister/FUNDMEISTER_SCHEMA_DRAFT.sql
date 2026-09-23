-- FUNDMEISTER canonical schema draft
-- DESIGN ARTIFACT ONLY. DO NOT APPLY TO BOAMAN PRODUCTION UNTIL FINANCIAL SECURITY GATE IS GREEN.
-- Target: dedicated FUNDMEISTER data plane or equivalently isolated financial schema.

create schema if not exists fundmeister;

create type fundmeister.opportunity_stage as enum (
  'discovered','screened','needs_evidence','eligible','pursuing','submitted',
  'decision_pending','awarded','declined','withdrawn','expired'
);
create type fundmeister.funding_state as enum (
  'planned','approved','received','active','restricted_hold','exhausted','reporting','closed'
);
create type fundmeister.transaction_state as enum (
  'ingested','unmatched','proposed_allocation','evidence_missing','review_required','reconciled','locked','reversed'
);

create table fundmeister.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table fundmeister.memberships (
  organization_id uuid not null references fundmeister.organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('founder_admin','finance','project_manager','contributor','bookkeeper','accountant','auditor','funder_readonly')),
  status text not null default 'active' check (status in ('pending','active','disabled')),
  created_at timestamptz not null default now(),
  primary key (organization_id,user_id)
);

create table fundmeister.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references fundmeister.organizations(id) on delete cascade,
  project_key text not null,
  name text not null,
  lifecycle_stage text,
  owner_user_id uuid,
  geography jsonb not null default '[]'::jsonb,
  profile jsonb not null default '{}'::jsonb,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (organization_id,project_key)
);

create table fundmeister.funding_opportunities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references fundmeister.organizations(id) on delete cascade,
  project_id uuid references fundmeister.projects(id) on delete cascade,
  external_key text,
  source_name text not null,
  source_url text not null,
  capital_type text not null,
  title text not null,
  amount_min numeric,
  amount_max numeric,
  deadline timestamptz,
  stage fundmeister.opportunity_stage not null default 'discovered',
  eligibility_state text not null default 'unknown',
  eligibility_evidence jsonb not null default '[]'::jsonb,
  restrictions jsonb not null default '{}'::jsonb,
  prerequisites jsonb not null default '[]'::jsonb,
  schedule_risk text,
  verified_at timestamptz,
  source_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table fundmeister.funding_applications (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references fundmeister.funding_opportunities(id) on delete cascade,
  project_id uuid not null references fundmeister.projects(id) on delete cascade,
  status text not null default 'draft',
  owner_user_id uuid,
  requested_amount numeric,
  submitted_at timestamptz,
  decision_at timestamptz,
  decision text,
  checklist jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table fundmeister.funding_sources (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references fundmeister.organizations(id) on delete cascade,
  project_id uuid references fundmeister.projects(id) on delete restrict,
  application_id uuid references fundmeister.funding_applications(id) on delete set null,
  source_organization text not null,
  capital_type text not null,
  state fundmeister.funding_state not null default 'planned',
  amount numeric not null check (amount >= 0),
  currency text not null default 'USD',
  received_date date,
  restricted boolean not null default false,
  allowable_uses jsonb not null default '[]'::jsonb,
  prohibited_uses jsonb not null default '[]'::jsonb,
  funding_period daterange,
  reporting_requirements jsonb not null default '[]'::jsonb,
  match_requirements jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table fundmeister.budget_versions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references fundmeister.organizations(id) on delete cascade,
  project_id uuid references fundmeister.projects(id) on delete cascade,
  funding_source_id uuid references fundmeister.funding_sources(id) on delete set null,
  version_no integer not null,
  status text not null default 'draft' check (status in ('draft','submitted','approved','superseded','closed')),
  approved_by uuid,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table fundmeister.budget_lines (
  id uuid primary key default gen_random_uuid(),
  budget_version_id uuid not null references fundmeister.budget_versions(id) on delete cascade,
  category text not null,
  cost_center text,
  approved_amount numeric,
  committed_amount numeric not null default 0,
  actual_amount numeric not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table fundmeister.cost_assumptions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references fundmeister.projects(id) on delete cascade,
  budget_line_id uuid references fundmeister.budget_lines(id) on delete cascade,
  description text not null,
  amount_low numeric,
  amount_high numeric,
  currency text not null default 'USD',
  basis_type text not null,
  source_url text,
  vendor_name text,
  evidence_id uuid,
  confidence text not null default 'unverified',
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table fundmeister.financial_accounts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references fundmeister.organizations(id) on delete cascade,
  provider text not null,
  provider_account_ref text not null,
  account_label text,
  account_type text,
  currency text not null default 'USD',
  sync_status text not null default 'not_connected',
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  unique (organization_id,provider,provider_account_ref)
);

create table fundmeister.transactions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references fundmeister.organizations(id) on delete cascade,
  account_id uuid references fundmeister.financial_accounts(id) on delete restrict,
  provider_transaction_ref text,
  posted_at timestamptz,
  amount numeric not null,
  currency text not null default 'USD',
  transaction_type text not null,
  merchant_or_counterparty text,
  description text,
  state fundmeister.transaction_state not null default 'ingested',
  transfer_group_key text,
  source_method text not null check (source_method in ('provider','manual','import')),
  imported_by uuid,
  created_at timestamptz not null default now()
);

create unique index on fundmeister.transactions(account_id,provider_transaction_ref)
where provider_transaction_ref is not null;

create table fundmeister.transaction_allocations (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references fundmeister.transactions(id) on delete restrict,
  project_id uuid references fundmeister.projects(id) on delete restrict,
  funding_source_id uuid references fundmeister.funding_sources(id) on delete restrict,
  budget_line_id uuid references fundmeister.budget_lines(id) on delete restrict,
  allocated_amount numeric not null,
  business_purpose text,
  review_status text not null default 'proposed',
  created_at timestamptz not null default now()
);

create table fundmeister.evidence_objects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references fundmeister.organizations(id) on delete cascade,
  project_id uuid references fundmeister.projects(id) on delete restrict,
  evidence_type text not null,
  storage_ref text not null,
  sha256 text,
  original_filename text,
  captured_at timestamptz not null default now(),
  captured_by uuid,
  metadata jsonb not null default '{}'::jsonb,
  supersedes_id uuid references fundmeister.evidence_objects(id) on delete restrict
);

create table fundmeister.evidence_links (
  evidence_id uuid not null references fundmeister.evidence_objects(id) on delete restrict,
  entity_type text not null,
  entity_id uuid not null,
  relationship text not null default 'supports',
  created_at timestamptz not null default now(),
  primary key (evidence_id,entity_type,entity_id)
);

create table fundmeister.reimbursements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references fundmeister.organizations(id) on delete cascade,
  project_id uuid references fundmeister.projects(id) on delete restrict,
  claimant_user_id uuid not null,
  amount numeric not null check (amount >= 0),
  currency text not null default 'USD',
  business_purpose text not null,
  status text not null default 'submitted',
  paid_transaction_id uuid references fundmeister.transactions(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table fundmeister.wecl_allocations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references fundmeister.projects(id) on delete cascade,
  external_wecl_ref text not null unique,
  person_ref text not null,
  activity_class text not null,
  work_started_at timestamptz,
  work_ended_at timestamptz,
  human_minutes integer not null check (human_minutes >= 0),
  approval_state text not null,
  evidence_ref text,
  imported_at timestamptz not null default now()
);

create table fundmeister.payroll_allocations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references fundmeister.projects(id) on delete cascade,
  payroll_provider text not null,
  payroll_record_ref text not null,
  person_ref text not null,
  gross_pay numeric,
  employer_tax numeric,
  benefits numeric,
  allocated_amount numeric not null,
  pay_period daterange,
  imported_at timestamptz not null default now(),
  unique (payroll_provider,payroll_record_ref,project_id)
);

create table fundmeister.compliance_rules (
  id uuid primary key default gen_random_uuid(),
  funding_source_id uuid not null references fundmeister.funding_sources(id) on delete cascade,
  rule_type text not null,
  rule_definition jsonb not null,
  severity text not null default 'review',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table fundmeister.reporting_obligations (
  id uuid primary key default gen_random_uuid(),
  funding_source_id uuid not null references fundmeister.funding_sources(id) on delete cascade,
  title text not null,
  due_at timestamptz,
  requirement jsonb not null default '{}'::jsonb,
  status text not null default 'open',
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

create table fundmeister.audit_events (
  id bigint generated always as identity primary key,
  organization_id uuid not null,
  project_id uuid,
  actor_user_id uuid,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  before_state jsonb,
  after_state jsonb,
  source text not null,
  created_at timestamptz not null default now()
);

-- Security requirements before deployment:
-- 1. Enable RLS on every exposed table.
-- 2. Centralize tenant authorization in security-invoker helpers or carefully reviewed definer functions.
-- 3. Revoke anon access to all financial tables.
-- 4. Grant only named capabilities to authenticated users.
-- 5. Use membership + role + project scope in every policy.
-- 6. Prevent UPDATE/DELETE on audit_events for ordinary roles.
-- 7. Keep provider tokens/credentials outside these tables.
-- 8. Add retention, backup, encryption and incident-response controls before bank/evidence activation.
