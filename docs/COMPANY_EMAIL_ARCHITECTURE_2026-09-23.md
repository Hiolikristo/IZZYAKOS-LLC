# IZZYAKOS Corporate Email Architecture — 2026-09-23

## Canonical rule

All company and project communication should resolve under the **@izzyakos.com** identity layer. Product domains may continue to exist for websites and application URLs, but project mail should not fragment into unrelated email domains unless a legal, regulatory or technical requirement later justifies it.

## Provisioning model

Use the fewest paid human mailboxes that match actual people, then use aliases and Google Groups / Collaborative Inboxes for functions and projects.

### Human mailbox
- founder@izzyakos.com — founder/executive mailbox.

Future named staff should receive person-specific licensed accounts only when they actually join.

### Company functions
- hello@izzyakos.com — general inquiries.
- support@izzyakos.com — shared support / collaborative inbox.
- finance@izzyakos.com — finance and FUNDMEISTER.
- funding@izzyakos.com — GranTIFY, grants, accelerators and capital pipeline.
- partnerships@izzyakos.com — partnerships and sponsorships.
- payroll@izzyakos.com — payroll administration.
- legal@izzyakos.com — legal/contract intake.
- privacy@izzyakos.com — privacy requests.
- security@izzyakos.com — security reports.

### Project identities
- boaman@izzyakos.com
- tracebridge@izzyakos.com
- chopx@izzyakos.com
- myaccra@izzyakos.com
- pantryster@izzyakos.com
- fundmeister@izzyakos.com
- grantify@izzyakos.com
- sereniti@izzyakos.com
- wecl@izzyakos.com
- kavantq@izzyakos.com
- billarize@izzyakos.com
- heliostack@izzyakos.com
- aasea@izzyakos.com
- humanrecord@izzyakos.com

## Current truth state

The connected ChatGPT Gmail identity is not a Google Workspace administrator for @izzyakos.com. These addresses are therefore **planned**, not represented as live. The public websites should continue using a verified working contact until MX/provider provisioning, aliases/groups and send-as behavior are tested.

## Activation checklist

1. Choose/activate the business mail provider for izzyakos.com.
2. Verify domain ownership.
3. Configure MX.
4. Configure SPF.
5. Configure DKIM.
6. Configure DMARC, initially with monitoring/reporting appropriate to the provider.
7. Create founder mailbox.
8. Create company Groups / Collaborative Inboxes.
9. Create project aliases.
10. Test inbound and outbound mail for every public address.
11. Change website contact links only after tests pass.
12. Record each active address in FUNDMEISTER email_registry as active.

## Routing principle

Project addresses route into the company communication layer, while FUNDMEISTER records the ownership, purpose and provisioning state. A project can have its own website without becoming a separate communications island.
