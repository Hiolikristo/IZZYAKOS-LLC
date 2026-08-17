# IZZYAKOS LLC — venture front door

Static, dependency-free company and venture-review site prepared for the August 2026 FastPath Rev1 closeout.

## Routes

- `/` — IZZYAKOS LLC venture-studio landing page
- `/fastpath/` — FastPath sponsor / partner reviewer landing page

The FastPath page intentionally links onward to the current FastPath Vercel production alias:

`https://fastpath-v0-pantrysterllcs-projects-b7b5c455.vercel.app/#/home`

That FastPath deployment must be public to anonymous external reviewers before the final Rev1 link is submitted. Do not replace it with the stale `fastpath-v0.vercel.app` alias unless that alias is explicitly rebound to the frozen release candidate and revalidated.

## Domain plan

Preferred topology once the company-domain spelling is confirmed and DNS is available:

- company root → IZZYAKOS LLC landing page
- `company-domain/fastpath/` → FastPath reviewer brief
- optional `fastpath.company-domain` → redirect to `/fastpath/`
- FastPath reviewer brief → audited FastPath MVP

Do not configure a `CNAME` file until the exact owned company domain is confirmed. `FastPad.com` is not part of this release plan.

## Release discipline

1. Keep the corporate landing independent of the FastPath application release branch.
2. Keep public claims at MVP / pre-pilot level unless documented partner or pilot evidence exists.
3. Confirm every external CTA from a logged-out browser before sponsor submission.
4. Freeze the public URL, FastPath commit SHA and explainer video together for the final packet.
