# FUNDMEISTER Project Bootstrap Contract

Every IZZYAKOS project creates a FUNDMEISTER workstream by default.

## Trigger

`project.created`

Required project payload:
- project_key
- canonical_name
- legal_owner
- product_or_program_type
- geography
- lifecycle_stage
- owner
- planned_launch_or_pilot_date
- expected revenue model
- expected capital need
- regulated/sensitive-data flags

## Automatic FUNDMEISTER actions

1. Create the project financial profile and default cost centers.
2. Create workstreams: Funding, Finance, Partnerships, Sponsorships, Budget, Evidence, Reporting.
3. Send a normalized opportunity profile to GranTIFY.
4. Create funding-readiness checklist and evidence gaps.
5. Build a use-of-funds template with **TBD amounts** until source evidence exists.
6. Create vendor/cost-assumption tasks for every material budget line.
7. Create capital pipeline stages: discovered, screened, eligible, pursuing, submitted, decision-pending, awarded/declined.
8. Create reporting calendar placeholders.
9. Register WECL project allocation key.
10. Register payroll allocation key, without creating payroll records.
11. Create reimbursement, mileage and founder-paid expense ledgers.
12. Create sources-and-uses, budget-v-actual and evidence-packet report definitions.
13. Apply default RBAC and separation-of-duties policy.
14. Write an immutable bootstrap audit event.

## GranTIFY request

```json
{
  "project_key": "boaman",
  "intent": ["grant", "accelerator", "sponsorship", "partnership", "equity", "loan"],
  "geography": ["Columbus", "Ohio", "United States"],
  "stage": "pre-seed/pilot",
  "industry": ["workforce technology", "enterprise software", "AI/data systems"],
  "capital_need": null,
  "deadline_horizon_days": 180,
  "evidence_required": true
}
```

No capital amount is inferred merely because an opportunity allows a certain maximum.

## Opportunity screening output

Each opportunity must carry:
- official source;
- source URL;
- last verified timestamp;
- program/capital type;
- deadline and timezone where applicable;
- min/max amount if officially stated;
- eligibility conditions;
- evidence needed to prove eligibility;
- match requirements;
- restrictions;
- application prerequisites;
- realistic schedule risk;
- status: eligible / conditional / not-eligible / unknown;
- human decision: pursue / hold / reject.

## Cost evidence rule

A budget line is not "funding ready" until its basis is identified:
- official/public price;
- vendor quote;
- signed proposal;
- payroll basis;
- WECL-supported labor estimate;
- historical company transaction;
- documented rate card;
- statutory/tax schedule;
- explicitly labelled planning assumption.

FUNDMEISTER may estimate a range, but must preserve the source and label the uncertainty.

## BOAMAN first tenant

BOAMAN's first bootstrap should create:
- BOAMAN operating/pilot project;
- GranTIFY funding scan;
- capital-readiness evidence board;
- source-backed 90-day use-of-funds model;
- founder-paid/reimbursement ledger;
- funding-source ledger;
- funder diligence packet;
- WECL/payroll allocation keys.

Bank data is out of scope until the financial-security gate is green.
