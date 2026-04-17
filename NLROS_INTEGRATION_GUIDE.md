# NLROS Integration Guide: Practical Workflows

This guide shows how to use NLROS at different stages of development.

## Setup (5 minutes)

```bash
# Install NotebookLM CLI
npm install -g notebooklm

# Authenticate
notebooklm login

# Set the notebook context
notebooklm use 1535e67a-33cd-4cef-8600-08a7572edae1

# Verify it works
notebooklm source list | grep -c "ready"  # Should show 26
```

---

## Workflow 1: Before Designing a Feature

**Scenario:** You're about to build the "Featured Listings" payment flow.

```bash
# 1. Identify relevant stress-tests
node .claude/nlros-cli.js list | grep -E "monetization|payment|competition"

# 2. Run the competitor blitzkrieg test
node .claude/nlros-cli.js stress-test competitor-blitzkrieg

# 3. Review the mitigations and design changes
# 4. Incorporate them BEFORE writing code
```

**Output you'll get:**
- How the NLROS frameworks would attack your monetization model
- Design changes that make you resilient to Big Tech competition
- Revenue model alternatives that don't depend on scale

**Action items:**
- [x] Add revenue-sharing with community (from mitigations)
- [x] Design endorsement system instead of pure ad placement
- [x] Build "locals-only" positioning

---

## Workflow 2: Before Building Auth/User Features

**Scenario:** Designing user registration, profile pages, and visibility settings.

```bash
# Check which scenarios affect user_data and privacy
node .claude/nlros-cli.js show trust-breach-at-scale
node .claude/nlros-cli.js show surveillance-creep
node .claude/nlros-cli.js show weaponized-directory

# Run the trust breach test to understand data minimization
node .claude/nlros-cli.js stress-test trust-breach-at-scale
```

**Output you'll get:**
- What data to NOT collect (reduces breach blast radius)
- How to design for GDPR-style deletion
- Privacy-first architecture patterns

**Action items:**
- [x] Never store exact coordinates (only zip/neighborhood)
- [x] Don't store behavioral data (which businesses residents visit)
- [x] Implement data export & delete in user settings

---

## Workflow 3: API Security Design

**Scenario:** You're designing the REST API for businesses and leads.

```bash
# Check all scenarios affecting API access
grep -r "api" .claude/nlros-exercises.json | jq

# Run gentrification test to understand data access control
node .claude/nlros-cli.js stress-test gentrification-accelerant
```

**Output you'll get:**
- Business owners should NOT see resident profiles
- Prevent bulk export of resident data
- Implement role-based API access (students, business owners, property managers)

**Action items:**
- [x] Business API: returns business data only, not resident data
- [x] Resident API: users can only see anonymized metrics
- [x] Admin API: audit logs for all data access

---

## Workflow 4: Onboarding & Growth Strategy

**Scenario:** You're planning the launch and initial user acquisition.

```bash
# Run the cold start paradox (biggest threat)
node .claude/nlros-cli.js stress-test cold-start-paradox

# Run the youth exodus test (retention risk)
node .claude/nlros-cli.js stress-test youth-exodus-spiral
```

**Output you'll get:**
- Don't rely on pure network effects (won't work)
- Pre-populate with curated businesses and events
- Seed with organized groups (block clubs, student orgs)
- Design for long-term resident personas, not just students

**Action items:**
- [x] Partner with 10-15 local businesses before launch
- [x] Create "property manager" tier (long-term engagement)
- [x] "Founder" badge system (early adopter loyalty)
- [x] Pod-based onboarding (cohorts, local groups)

---

## Workflow 5: Community & Moderation

**Scenario:** Designing comment systems, forums, community features.

```bash
# Run both dark mirror and weaponized directory
node .claude/nlros-cli.js stress-test dark-mirror
node .claude/nlros-cli.js stress-test weaponized-directory
```

**Output you'll get:**
- NO anonymous features at launch
- All posts require verified identity
- Moderation team needed BEFORE you have users (not after)
- Transparent moderation log

**Action items:**
- [x] All posts require real name (verified phone)
- [x] Hire 2-3 community moderators before launch
- [x] Public moderation decision log (appeals process)
- [x] Community council for disputed moderation

---

## Workflow 6: Full Critical Stress-Test (Pre-Launch)

**Scenario:** Two weeks before launch. You want to know if you've covered all critical failures.

```bash
# Run all critical-level scenarios
node .claude/nlros-cli.js list | grep "🔴"

# Or use the library (Phase 2):
# npx ts-node -e "import { generateCriticalReport } from '@/lib/nlros'; generateCriticalReport()"
```

**All 5 critical scenarios:**
1. Gentrification Accelerant
2. Youth Exodus Spiral
3. Weaponized Directory
4. Trust Breach at Scale
5. Cold Start Paradox

**Action:** For each, run the stress-test and verify mitigations are in code.

---

## Using the TypeScript Library (Phase 2)

Once imported, use in your codebase:

```typescript
import { stressTest, getScenariosAffectingFeature, getMitigations } from '@/lib/nlros'

// Before implementing a feature:
const userProfileScenarios = getScenariosAffectingFeature('user_profiles')
// → returns all scenarios that could attack this feature

// Get specific mitigations:
const trustMitigations = getMitigations('trust-breach-at-scale')
// → build these into the feature

// Full report before launch:
const results = await generateCriticalReport()
// → run all critical scenarios at once
```

---

## Dashboard Phase (Phase 3)

Future: Web interface showing:
- All stress-test results
- Features and which scenarios affect them
- Green/red indicators for covered mitigations
- Pre-mortem failure analysis

---

## Key Principle

**Test before you build.**

Before writing any significant feature:
1. Identify which stress-test scenarios affect it
2. Run those scenarios (get NLROS advice)
3. Incorporate mitigations into design
4. Build with confidence that you've thought through failure modes

The goal: **No surprises at launch. All major failure modes already designed against.**

---

## Commands Reference

```bash
# List all scenarios
node .claude/nlros-cli.js list

# Show scenario details (JSON)
node .claude/nlros-cli.js show <scenario-id>

# Query NLROS notebook for a scenario
node .claude/nlros-cli.js stress-test <scenario-id>

# E.g.:
node .claude/nlros-cli.js stress-test gentrification-accelerant
node .claude/nlros-cli.js stress-test youth-exodus-spiral
node .claude/nlros-cli.js stress-test weaponized-directory
```

---

## Troubleshooting

**"Command not found: notebooklm"**
```bash
npm install -g notebooklm
```

**"No result found for RPC ID" (when running stress-test)**
```bash
# NotebookLM auth expired
notebooklm login
notebooklm use 1535e67a-33cd-4cef-8600-08a7572edae1
```

**"Scenario not found"**
```bash
node .claude/nlros-cli.js list  # See valid scenario IDs
```
