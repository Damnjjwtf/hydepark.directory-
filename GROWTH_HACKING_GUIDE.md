# Growth Hacking + NLROS Integration Guide

**The philosophy:** Defensive + Offensive growth.

- **NLROS** (offensive) = How do we scale sustainably without destroying the platform?
- **Growth Hacking** (defensive) = What risks could kill us, and how do we design against them?

Together = High-velocity experimentation that's also resilient to 10 critical failure scenarios.

---

## Quick Start

```bash
# Show your North Star metric (what we're optimizing for)
node .claude/growth-experiments-cli.js north-star

# Show all friction points (where users get stuck)
node .claude/growth-experiments-cli.js list-friction

# Get growth hacking tactics for a specific friction point
node .claude/growth-experiments-cli.js query onboarding

# Check if an experiment is NLROS-aligned (safe from risks)
node .claude/growth-experiments-cli.js check trust-paradox

# Show growth loops (how each user brings the next)
node .claude/growth-experiments-cli.js loops

# Show weekly cadence (how to run 3-5 tests/week)
node .claude/growth-experiments-cli.js cadence
```

---

## The North Star Metric

### Community Contribution Index (CCI)

**Definition:** % of residents who have taken at least one community action per month (posted event, answered question, endorsed business, shared resource)

**Targets:**
- Month 1: 5%
- Month 3: 20%
- Month 6: 35%
- Month 12: 50%

**Why this metric?**
- Measures platform health, not vanity metrics (downloads, DAU)
- Aligns with NLROS: solves Cold Start Paradox (need proof of value) + Influencer Monopoly (diverse contributors, not concentrating on top posters)
- Growth hacking lever: every experiment focuses on increasing CCI

**What counts as "community action"?**
- Posted an event
- Answered a question
- Endorsed/vouched for a business
- Shared a resource
- Participated in block challenge
- Posted a local alert

---

## Friction Map (10 Growth Experiments)

Each friction point is a blocker preventing growth. The friction map shows the experiment to test.

### 🔴 CRITICAL (Friction Score 9-10)

#### 1. Gentrification Resistance [10/10]
**Problem:** Platform could become tool for speculators. "This will price out low-income residents."

**Hypothesis:** If we offer "Community First" pricing tier + pledge revenue to neighborhood fund, skepticism drops.

**Experiment:** Community First Tier
- Variant A: Standard featured listings ($50/mo)
- Variant B: Tier 1: Community-owned businesses (20% off) + revenue shared with neighborhood fund
- Metric: Adoption by local nonprofits + affordability perception survey
- Duration: 8 weeks

**Growth Hacking Query:**
```bash
node .claude/growth-experiments-cli.js query gentrification-resistance
```

**NLROS Alignment Check:**
```bash
node .claude/growth-experiments-cli.js check gentrification-resistance
```

---

#### 2. Onboarding [9/10]
**Problem:** New user sees empty directory. No reason to invite friends. (Cold start)

**Hypothesis:** If we pre-populate with curated businesses + seed with block clubs, new users see a "living" directory.

**Experiment:** Founder Pod Onboarding
- Variant A: Standard sign-up → empty feed
- Variant B: Sign-up → assigned to "Pod" (cohort) with other new residents → shared weekly challenges
- Metric: % who complete profile + invite 3+ friends within 7 days
- Duration: 4 weeks

---

#### 3. Trust Paradox [9/10]
**Problem:** Residents fear data harvesting. "What data does this app collect?"

**Hypothesis:** If we publish exact data policy + monthly transparency report, concerns drop 60%.

**Experiment:** Radical Transparency Dashboard
- Variant A: Standard privacy page
- Variant B: Public data audit dashboard: "Here's everything we collect & why" + zero dark patterns badge
- Metric: Account creation rate + trust survey (NPS-style)
- Duration: 4 weeks

---

### 🟡 HIGH (Friction Score 6-8)

#### 4. Business Adoption [8/10]
Query: `node .claude/growth-experiments-cli.js query business-adoption`

#### 5. Referral Activation [8/10]
Query: `node .claude/growth-experiments-cli.js query referral-activation`

#### 6. Resident Engagement [7/10]
Query: `node .claude/growth-experiments-cli.js query resident-engagement`

#### 7. Feature Virality [7/10]
Query: `node .claude/growth-experiments-cli.js query feature-virality`

#### 8. Property Manager Retention [6/10]
Query: `node .claude/growth-experiments-cli.js query property-manager-retention`

### 🟢 STRATEGIC (Ethical/Long-term)

#### 9. Dark Pattern Avoidance
**No friction score** — This is ethical, not user friction.

**Principle:** Growth without manipulation.

**Experiment:** Ethical Growth Audit
- Track all growth tactics used
- Monthly review: "Did we use any dark patterns?"
- Publish results publicly

**NLROS Alignment:** Directly addresses Weaponized Directory + Dark Mirror scenarios

#### 10. Competitor Resilience
**Principle:** What's our unfair advantage vs Meta/Google?

**Experiment:** Community Ownership Positioning
- Messaging: "Built by Hyde Park residents, for Hyde Park" + community board seat
- Metric: Brand perception vs competitors + long-term retention

---

## Growth Loops (Compounding Acquisition)

Each loop is self-reinforcing. More participation → more value → more invites → more participation.

### Loop 1: The Contribution Spiral
```
New resident → assigned to Pod → completes weekly challenge
→ contributions visible to block → triggers invites → pod grows
→ bigger challenges → more contributions → resident becomes elder
→ helps onboard next cohort (loop repeats)
```
**Aligns with:** Community Contribution Index + Cold Start Paradox

### Loop 2: The Trust Loop
```
Resident worries about data → sees public audit dashboard
→ reads transparent policy + monthly report
→ invites skeptical friend ("it's actually trustworthy")
→ new resident immediately sees trust indicators → onboards faster
```
**Aligns with:** Trust Breach + Surveillance Creep risks

### Loop 3: The Business Growth Loop
```
Business owner worries: "Will anyone use this?"
→ sees 5 resident testimonials + featured section
→ posts first event → gets 10 RSVPs
→ success → posts again → gets 20 RSVPs
→ encourages other businesses → platform becomes essential
```

### Loop 4: The Affordability Loop
```
Low-income residents worry: "This will gentrify my neighborhood"
→ see "Community First" tier (20% discount) + revenue share
→ build trust → contribute content → invite others
→ neighborhood becomes more tightly knit → resists gentrification pressure
```

**See all loops:**
```bash
node .claude/growth-experiments-cli.js loops
```

---

## Weekly Experimentation Cadence

### The Pace
- **3-5 experiments per week** (high velocity)
- **3-8 weeks per experiment** (long enough to get signal)
- **Decision rule:** If metric improves 20%+, ship it. If flat, iterate or kill.

### Weekly Schedule

| Day | Task |
|-----|------|
| **Monday** | Design 3 new experiments (query both notebooks) |
| **Tuesday-Wednesday** | Launch experiments (A/B tests active) |
| **Thursday** | Interim results check |
| **Friday** | Growth meeting: results + next week planning |
| **Sunday** | Review CCI + cohort health |

### Monday: Design New Experiments

```bash
# Identify friction
node .claude/growth-experiments-cli.js list-friction

# Get growth hacking tactics
node .claude/growth-experiments-cli.js query <friction-key>

# Ensure it's NLROS-safe
node .claude/growth-experiments-cli.js check <friction-key>

# Design A/B test based on recommendations
```

### Friday: Growth Meeting

**Questions to ask:**
1. Which experiments showed 20%+ improvement? (Ship them)
2. Which were flat? (Kill or iterate)
3. What did we learn about user friction?
4. What's next week's focus?

**Metrics to review:**
- Community Contribution Index (primary)
- Weekly active residents
- Account creation rate
- Business adoption rate
- Trust score (NPS-style)

---

## Using Both Notebooks

### When to Query NLROS
**Before launching any experiment, check if it could trigger a risk scenario.**

```bash
# You want to add a "like" system to increase engagement
# Query NLROS: Could this create Influencer Monopoly?

node .claude/nlros-cli.js stress-test influencer-monopoly
# → Get advice on how to diversify visibility instead of concentrating power
```

### When to Query Growth Hacking
**When you've identified friction, get tactics to remove it.**

```bash
# You see residents aren't sharing the app (low referrals)
# Query growth hacking: What tactics increase referrals?

node .claude/growth-experiments-cli.js query referral-activation
# → Get specific ideas from the playbook
```

### The Integration Check
```bash
# New experiment ready to launch?
# 1. Make sure it reduces friction (growth)
# 2. Make sure it doesn't trigger NLROS risks (defense)

node .claude/growth-experiments-cli.js check <friction-key>
# → Shows how this growth experiment is NLROS-aligned
```

---

## Example: Shipping a Feature

**Goal:** Increase referrals (currently 0)

### Monday: Design Phase

```bash
# 1. Identify friction
node .claude/growth-experiments-cli.js show referral-activation

# 2. Get growth hacking tactics
node .claude/growth-experiments-cli.js query referral-activation
# → Learns: "Founder badge" + "lifetime free premium" works

# 3. Check NLROS alignment
node .claude/growth-experiments-cli.js check referral-activation
# → Confirms: Avoids dark patterns, doesn't create monopoly
```

### Tuesday: Launch

A/B Test: "Founder Badge Referral Loop"
- **Variant A:** No referral incentive
- **Variant B:** Invite 3+ friends → "Founder" badge + 1 month free premium + featured on community board
- **Metric:** Invites per resident + referral conversion rate
- **Duration:** 6 weeks

### Friday: Results

- **Variant B showed 35% more invites** → Ship it
- **Founder badge became high-status symbol** → Increases CCI (community contribution)
- **No complaints about manipulation** → NLROS-aligned ✓

### Next Week

New friction to tackle: Why don't residents post content?

---

## File Structure

```
.claude/
  nlros-exercises.json              # 10 stress-test scenarios
  nlros-cli.js                      # NLROS CLI tool
  growth-experiments.json           # 10 growth experiments
  growth-experiments-cli.js         # Growth hacking CLI tool

lib/
  nlros.ts                          # TypeScript lib (both notebooks)

CLAUDE.md                           # Project docs
NLROS_INTEGRATION_GUIDE.md         # NLROS guide
GROWTH_HACKING_GUIDE.md            # This file
```

---

## Decision Tree: When to Use Each Tool

```
I want to grow the platform
│
├─ "What could kill us?" → Use NLROS
│  └─ node .claude/nlros-cli.js list
│  └─ node .claude/nlros-cli.js stress-test <scenario>
│
├─ "Where are users getting stuck?" → Use Growth Hacking
│  └─ node .claude/growth-experiments-cli.js list-friction
│  └─ node .claude/growth-experiments-cli.js query <friction>
│
└─ "Is this experiment safe?" → Check Both
   └─ node .claude/growth-experiments-cli.js check <friction>
   └─ Shows NLROS alignment + growth potential
```

---

## Success Metrics

**Month 1:**
- CCI: 5% (target: 5%) ✓
- Business adoption: 10-15 listings
- Trust score: 7/10 NPS

**Month 3:**
- CCI: 20% (target: 20%) ✓
- Referral loop active (3+ invites per early adopter)
- Zero harassment incidents (dark pattern avoidance working)

**Month 6:**
- CCI: 35% (target: 35%) ✓
- 100+ resident community actions per week
- Community First tier: 15-20% of featured businesses
- Growth loops self-sustaining

**Month 12:**
- CCI: 50% (target: 50%) ✓
- Platform essential for Hyde Park neighborhood
- 1000+ active residents + 50+ featured businesses
- Zero gentrification complaints (affordability working)
- Competitive moat: "most trusted neighborhood platform"

---

## Questions?

- **NLROS question?** `node .claude/nlros-cli.js help`
- **Growth question?** `node .claude/growth-experiments-cli.js help`
- **Both?** Read CLAUDE.md for integration strategy
