# IZZYAKOS LLC — one system, four infrastructure layers

Static, dependency-free company and reviewer site for the August 2026 Rev1 closeout.

**Canonical Rev1 submission source:** `docs/REV1_CANONICAL_SUBMISSION_2026-08-18.md`

IZZYAKOS is presented as one infrastructure thesis expressed through four separate applications:

- **FastPath / People** — workforce evidence and opportunity readiness
- **TRACEBridge / Work** — operational integrity and traceability
- **CHOPX / Movement** — last-mile fairness, consent and evidence
- **My Accra International Market / Commerce** — merchant operations and field execution

FastPath is the single current Rev1 market-validation priority. The other layers demonstrate repeatable systems discipline; they are not four simultaneous fundraising asks.

## Public routes

- `/` — IZZYAKOS company thesis and four-layer system
- `/fastpath/` — FastPath Rev1 / partner brief
- `/fastpath/demo/` — account-free, fictional-data interactive reviewer demo
- `/tracebridge/` — TRACEBridge infrastructure brief
- `/chopx/` — CHOPX / ChopExpress infrastructure brief
- `/accra/` — My Accra merchant implementation brief

## FastPath review strategy

The public reviewer path no longer depends on Vercel Authentication.

`/fastpath/demo/` demonstrates the core mechanism with fictional data:

1. specific job target;
2. candidate-controlled evidence;
3. Supported / Partial / Unknown / Gap mapping;
4. gap-to-action routing;
5. candidate-controlled output.

The demo is deliberately labeled as mechanism proof, **not** customer traction, a hiring prediction, a live job posting or a production candidate record.

The deeper FastPath V0.6.1 application remains the authenticated release candidate until its production protection scope is intentionally changed and logged-out acceptance passes. Do not use the stale `fastpath-v0.vercel.app` alias as release evidence.

## Domain lock

Canonical company domain: **`izzyakos.com`**.

The repository contains `CNAME = izzyakos.com`. The domain is already registered. Publication still requires the hosting control plane to be enabled and the domain DNS to point at the selected host.

The speech-to-text variant `iziacos.com` is not the company brand and must not replace IZZYAKOS in release materials.

## Acceptance gates

`IZZYAKOS Sponsor Surface Gate` validates all six public HTML surfaces for:

- dead / empty links;
- broken local targets;
- missing fragments;
- placeholder URLs;
- stale FastPath alias usage.

A separate reviewer-demo gate validates the five-step demo control contract and required truth-boundary language.

## Release discipline

1. Keep FastPath as the one Rev1 market-validation ask.
2. Keep public claims at MVP / pre-pilot level unless documented human/customer evidence exists.
3. Do not expose confidential candidate information in the reviewer demo or video.
4. Publish `izzyakos.com`, then test the exact domain logged out on desktop and mobile.
5. Freeze the company URL, reviewer demo, full FastPath release SHA and final walkthrough together for the submission packet.

## Current internal evidence

- company/four-layer sponsor surface: source acceptance green;
- account-free FastPath reviewer demo: acceptance green;
- FastPath full build: deployment/build evidence green, production protection still intentional;
- FastPath backend: 24/24 public tables have RLS enabled; controlled non-staff isolation probe returned zero unrelated candidate rows;
- remaining release blocker: publish the company domain and complete live logged-out acceptance.
