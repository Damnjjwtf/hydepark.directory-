# Claude Code + NotebookLM Integration

This project has direct access to the **"Building Directories with Claude"** NotebookLM notebook for research, insights, and strategy.

## Quick Access

### From TypeScript/Node
```typescript
import { getNotebookInsights, queryNotebook, listNotebookSources } from '@/lib/notebooklm';

// Ask a question
const answer = await getNotebookInsights("How do I monetize a directory?");

// Get specific strategies
const strategy = await getDirectoryStrategy();
const dataMethods = await getDataEnrichmentMethods();
const monetization = await getMonetizationStrategies();
```

### From CLI
```bash
# Direct notebook queries
notebooklm ask "What's the best directory niche?"
notebooklm source list                           # See all sources

# Set context (if needed)
notebooklm use 49fb0ec0-1556-47a9-bfb2-1c611d5d6db1
```

## Notebook Details

- **ID:** `49fb0ec0-1556-47a9-bfb2-1c611d5d6db1`
- **Title:** Building Directories with Claude
- **Sources:**
  1. Claude Code built me a $273/Day online directory (YouTube)
  2. I built a Cash Flowing Online Directory in 54 minutes (YouTube)
  3. My Exact Workflow for Scraping, Cleaning & Enriching Directory Data (YouTube)
  4. Pasted research notes

## Use Cases

### When Building Features
- Need monetization strategy? → `getMonetizationStrategies()`
- Need data collection methods? → `getDataEnrichmentMethods()`
- Need overall strategy? → `getDirectoryStrategy()`

### When Stuck
```bash
# Query the notebook directly
! notebooklm ask "How do successful directories handle [specific problem]?"
```

### During Development
- Reference the notebook for best practices
- Extract data schemas from the sources
- Use insights for Phase 2 AI agent design

## Requirements

- `notebooklm` CLI installed (`npm list -g notebooklm`)
- Authentication: `notebooklm auth check` (should show ✓ pass)
- Notebook context set: `notebooklm use 49fb0ec0-1556-47a9-bfb2-1c611d5d6db1`

## Testing Access

```bash
# Verify notebook is accessible
npm run dev  # Start the project
# Then in another terminal:
notebooklm source list --json
```

## Error Handling

If you get auth errors:
```bash
notebooklm login
notebooklm use 49fb0ec0-1556-47a9-bfb2-1c611d5d6db1
```

---

**The notebook is your research partner for this project.** Use it to validate decisions, get strategies, and inform feature design.

---

# NLROS: Strategic Rollout Framework Integration

This project uses **Next Level Rollout Strategies (NLROS)** to stress-test the HydePark.directory rollout against 10 custom, high-impact failure scenarios.

## Quick Start

```bash
# See all stress-test scenarios
node .claude/nlros-cli.js list

# Run a stress-test (queries NLROS notebook + returns mitigations)
node .claude/nlros-cli.js stress-test gentrification-accelerant

# View scenario details
node .claude/nlros-cli.js show youth-exodus-spiral
```

## The 10 Critical Scenarios

Each scenario represents a failure mode that could destroy the platform. Running the stress-test queries the NLROS notebook for tactical advice.

| Scenario | Threat | Status |
|----------|--------|--------|
| **Gentrification Accelerant** | Speculators use resident data to target displacement | 🔴 Critical |
| **Youth Exodus Spiral** | Students comprise 40% of users; platform collapses as they graduate | 🔴 Critical |
| **Weaponized Directory** | Harassment, doxxing, coordinated targeting of vulnerable residents | 🔴 Critical |
| **Trust Breach at Scale** | Data leak exposes resident location/spending/networks | 🔴 Critical |
| **Cold Start Paradox** | Stuck at 20% adoption; can't reach 50% network effect threshold | 🔴 Critical |
| **Influencer Monopoly** | One charismatic leader dominates; other voices disappear | 🟡 High |
| **Regulatory Trap** | Chicago passes privacy laws or licensing requirements | 🟡 High |
| **Competitor Blitzkrieg** | Meta/Google launches "Hyde Park Connect" | 🟡 High |
| **Dark Mirror** | Anonymous features become harassment vectors | 🟡 High |
| **Surveillance Creep** | Police request resident data; platform becomes monitoring tool | 🟡 High |

## How It Works

1. **Design Phase**: When designing a feature, run the stress-test against relevant scenarios
   ```bash
   node .claude/nlros-cli.js stress-test weaponized-directory
   ```

2. **NLROS Consultation**: The notebook provides:
   - Deep analysis of the threat
   - Cross-disciplinary principles from the 13 NLROS frameworks
   - Tactical mitigations
   - Design changes needed

3. **Implementation**: Build mitigations into the feature before launch

4. **Testing**: Each major feature release should be stress-tested against all scenarios

## Examples

**Before building featured listings:**
```bash
node .claude/nlros-cli.js stress-test competitor-blitzkrieg
```
→ Get advice on monetization resilience against Big Tech competition

**Before launching community forum:**
```bash
node .claude/nlros-cli.js stress-test dark-mirror
```
→ Get safety-first design principles to prevent harassment

**Before onboarding property managers:**
```bash
node .claude/nlros-cli.js stress-test youth-exodus-spiral
```
→ Design for long-term resident retention

## NLROS Notebook

- **ID**: `1535e67a-33cd-4cef-8600-08a7572edae1`
- **URL**: https://notebooklm.google.com/notebook/1535e67a-33cd-4cef-8600-08a7572edae1
- **26 sources**: Strategic frameworks, scenario blueprints, tools for stress-testing

## Requirements

- `notebooklm` CLI installed: `npm install -g notebooklm`
- Authenticated: `notebooklm login`
- Notebook 1 context set: `notebooklm use 1535e67a-33cd-4cef-8600-08a7572edae1` (NLROS)
- Notebook 2 context set: `notebooklm use fac118e1-f45d-4cf0-ac8f-0f9a66238c38` (Growth Hacking)

Verify setup:
```bash
notebooklm auth check
notebooklm use 1535e67a-33cd-4cef-8600-08a7572edae1  # NLROS
notebooklm source list  # Should show 26 sources
notebooklm use fac118e1-f45d-4cf0-ac8f-0f9a66238c38  # Growth Hacking
notebooklm source list  # Should show 28 sources
```

## Architecture (Phase 1 → 3)

- **Phase 1** (now): CLI tools + exercise templates + documented scenarios
- **Phase 2** (planned): TypeScript library for programmatic access
- **Phase 3** (planned): Web dashboard showing stress-test results + recommendations

---

# Growth Hacking: High-Velocity Experimentation

This project integrates **two complementary notebooks** for resilient growth:

1. **NLROS** (defensive) = What could kill the platform? Stress-test against 10 failure scenarios
2. **Growth Hacking** (offensive) = How do we scale sustainably? High-velocity experiments to reduce friction

## Quick Start

```bash
# Show your North Star metric
node .claude/growth-experiments-cli.js north-star

# List all user friction points
node .claude/growth-experiments-cli.js list-friction

# Get growth tactics for a friction point
node .claude/growth-experiments-cli.js query onboarding

# Check if an experiment is NLROS-aligned (safe)
node .claude/growth-experiments-cli.js check trust-paradox

# Show growth loops
node .claude/growth-experiments-cli.js loops
```

## North Star Metric

**Community Contribution Index**: % of residents who take at least one community action per month.

**Targets**: 5% (M1) → 20% (M3) → 35% (M6) → 50% (M12)

**Why this?** Measures platform health (residents helping residents), not vanity metrics.

## 10 Friction Points (Growth Experiments)

Each friction point = blocker preventing growth. Each experiment removes that blocker.

| Priority | Friction | Experiment | NLROS Link |
|----------|----------|------------|-----------|
| 🔴 CRITICAL | Gentrification Resistance | Community First Tier (20% discount + revenue share) | gentrification-accelerant |
| 🔴 CRITICAL | Onboarding | Founder Pod Cohorts (assigned groups, weekly challenges) | cold-start-paradox |
| 🔴 CRITICAL | Trust Paradox | Radical Transparency Dashboard (public data audit) | trust-breach-at-scale |
| 🟡 HIGH | Business Adoption | Community Vouching Protocol (5 residents vouch for platform) | trust-breach-at-scale |
| 🟡 HIGH | Referral Activation | Founder Badge Loop (invite 3+ friends → lifetime premium) | cold-start-paradox |
| 🟡 HIGH | Resident Engagement | Weekly Block Digest (Thursday 6pm ritual) | youth-exodus-spiral |
| 🟡 HIGH | Feature Virality | Viral Block Alerts (emergency info, lost pets, events) | cold-start-paradox |
| 🟢 STRATEGIC | Property Manager Retention | PM Dashboard (tenant requests, maintenance) | youth-exodus-spiral |
| 🟢 STRATEGIC | Dark Pattern Avoidance | Ethical Growth Audit (monthly review) | weaponized-directory |
| 🟢 STRATEGIC | Competitor Resilience | Community Ownership Positioning ("built by residents") | competitor-blitzkrieg |

## Weekly Cadence

| Day | Task |
|-----|------|
| **Monday** | Design 3 new experiments |
| **Tue-Wed** | Launch A/B tests |
| **Thursday** | Interim check |
| **Friday** | Growth meeting (ship/kill/iterate) |
| **Sunday** | Review CCI + health |

## Growth Loops (Compounding)

1. **Contribution Spiral**: New resident → Pod → challenges → visible contributions → invites → new residents
2. **Trust Loop**: Worry → audit dashboard → transparency → invite friend → faster onboarding
3. **Business Loop**: Owner hesitation → testimonials → first event → success → more posts
4. **Affordability Loop**: Gentrification fear → Community First tier → trust → contribution → resilience

## Documentation

- **GROWTH_HACKING_GUIDE.md** — Full workflow, decision tree, examples
- **NLROS_INTEGRATION_GUIDE.md** — Stress-testing guide
- `.claude/growth-experiments.json` — 10 experiments (editable)
- `.claude/nlros-exercises.json` — 10 stress tests (editable)
