# Jericho Hour — consultation-driven site revision gate
Status: design/workflow scaffold only; actual September 26, 2026 recording has **not** been transcribed or interpreted. No ministry-specific requirements are asserted from that recording.

## Process
1. Preserve original audio outside public repository. Hash and record media duration; collect transcription only with appropriate participant consent.
2. Review English/Ghanaian Pidgin carefully, mark inaudible or ambiguous passages, do not invent wording.
3. Classify each time-coded ministry-business claim as stated request, architect proposal, approval, disagreement, or follow-up. Exclude unrelated personal/spiritual discussion from business record.
4. Map reviewed requests to existing 12-page V3 preview (home, radio, programs, program detail, sermons/media, community, resources, booking, giving, social, owner admin, studio). Every change needs timestamp evidence and an authorized reviewer.
5. Update only approved content in source, rerun static link/JS checks and mobile browser QA, then publish **preview** from complete V3 source (not outdated V2 microsite).
6. Commission production broadcast, private administration, donations or collection of member details only after ministry approves operations, roles, privacy, rights and service schedule.
7. Log actual verified human consultation/engineering time, **not** entire audio elapsed time as billable work.

## Release scope
No price or IZZYAKOS project promotion should appear in the public ministry demo before the owners define objectives and approve these topics. BOAMAN, CHOPX and Pantryster remain optional private owner-review integrations.

## Current deployment limitation
GitHub contains earlier microsite and BroadcastKit adapter plus release metadata. Full V3 static files are distributed separately in owner-review ZIP. Netlify project has existed but its updated production publication has not been independently verified; do not represent the live stream, real donation processing or authenticated admin as operational.

## Internal tooling
A separate non-public consultation workbench, site source ZIP, audio provenance note and safe dry-run program approval importer are distributed privately in the development package. Never commit raw recording, transcript, names, personal discussion or owner-only consultation draft to this public repository.