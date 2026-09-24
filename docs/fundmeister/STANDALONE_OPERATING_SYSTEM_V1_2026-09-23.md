# FUNDMEISTER Standalone Operating System V1
Date: 2026-09-23

## Product identity
FUNDMEISTER is a source-agnostic project, capital, stewardship and evidence operating system. GranTIFY may feed funding intelligence into it, but FUNDMEISTER does not require GranTIFY.

IZZYAKOS LLC is the first internal operating environment. BOAMAN is the first project tenant used to validate the model.

## Operating objective
Preserve enough structured context that a founder, operator, funder, sponsor, institution, accountant, auditor or reviewer can understand:
- what the project is;
- what happened during the journey;
- what was decided and why;
- who the project needs;
- what capital/equipment is needed and why;
- what evidence supports each material claim;
- what milestones and risks are open;
- how capital is planned, restricted, spent and reported;
- which professional judgments remain outside software authority.

## Engine map
1. Project Intake & Context
2. Journey/Event Ledger
3. CRM & Relationship
4. Funding & Capital Intake
5. Opportunity Matching
6. Eligibility & Due Diligence
7. Talent Needs
8. Equipment & Infrastructure Needs
9. Sources & Uses / Budget
10. Transaction & Reconciliation
11. Evidence / Provenance Vault
12. WECL / Payroll Allocation Bridge
13. Professional Review Queue
14. Pilot / Validation Evidence
15. Investor/Funder Reporting
16. FUNDMEISTER Academy

## RBAC
Authentication proves identity only. Authorization is controlled by membership role and project scope.

Organization-wide roles:
- founder_admin
- finance
- accountant
- auditor

Project-scoped roles:
- project_manager
- contributor
- bookkeeper
- funder_readonly

External viewers do not receive unrelated-company-project access merely because they can authenticate.

## Project-management layer
The company-control plane includes:
- Kanban stages: backlog, planned, in_progress, blocked, review, done;
- start/due dates and progress;
- milestones and success metrics;
- validation/test evidence;
- talent, capital and equipment needs;
- professional review queue.

## Oct. 5 validation target
BOAMAN target: at least five independent tester sessions recorded before the Rev1 readiness review. Each run should preserve scenario, device/context, result, issue count and persistence/stability observation.

## Academy
Core curriculum:
1. Business Model & Operating System
2. Founder Finance & Bookkeeping Fundamentals
3. Funding & Capital Instruments
4. Tax & CPA Readiness
5. Legal & Fundraising Boundaries
6. Customer Discovery & Pilot Design
7. Investor/Funder Reporting & Governance
8. Cybersecurity & Data Stewardship

Attendance control:
- first unexcused miss: warning/reschedule;
- second: remediation plus temporary restriction on new matching/submission actions;
- third: workflow paused pending human review;
- closure: never automatic; requires notice, human review and approved-exception/accommodation consideration.

## Product-truth boundary
Current control-plane metadata and project-management modules are active. Real bank feeds, receipt storage, payroll-provider feeds, tax filings, legal approvals and production capital-matching automation are not represented as active until their integrations, evidence and security gates exist.
