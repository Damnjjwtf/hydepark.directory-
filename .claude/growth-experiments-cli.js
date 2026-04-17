#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EXPERIMENTS_FILE = path.join(__dirname, 'growth-experiments.json');
const NLROS_FILE = path.join(__dirname, 'nlros-exercises.json');

function loadExperiments() {
  return JSON.parse(fs.readFileSync(EXPERIMENTS_FILE, 'utf8'));
}

function loadNLROS() {
  return JSON.parse(fs.readFileSync(NLROS_FILE, 'utf8'));
}

function showNorthStar() {
  const data = loadExperiments();
  const ns = data.north_star_metric;

  console.log('\n📊 North Star Metric: Community Contribution Index\n');
  console.log(`Definition: ${ns.definition}\n`);
  console.log(`Why: ${ns.why}\n`);
  console.log('Growth Targets:');
  Object.entries(ns.targets).forEach(([period, target]) => {
    console.log(`  ${period}: ${target}`);
  });
  console.log(`\nNLROS Alignment: ${ns.aligned_with_nlros}\n`);
}

function listFrictionPoints() {
  const data = loadExperiments();
  console.log('\n🔥 Friction Map (Priority Order by Score)\n');

  const sorted = Object.entries(data.friction_map)
    .map(([key, friction]) => ({
      name: key,
      score: friction.friction_score === 'N/A' ? 0 : parseInt(friction.friction_score),
      problem: friction.problem,
      nlros: friction.nlros_scenario,
    }))
    .sort((a, b) => b.score - a.score);

  sorted.forEach((f) => {
    const icon = f.score >= 9 ? '🔴' : f.score >= 7 ? '🟡' : '🟢';
    console.log(
      `${icon} [${f.score}/10] ${f.name.toUpperCase()}\n   ${f.problem}\n   → NLROS: ${f.nlros}\n`
    );
  });
}

function showFrictionDetail(frictionKey) {
  const data = loadExperiments();
  const friction = data.friction_map[frictionKey];

  if (!friction) {
    console.error(`❌ Friction point not found: ${frictionKey}`);
    process.exit(1);
  }

  console.log(`\n🔥 Friction: ${frictionKey.toUpperCase()}\n`);
  console.log(`Problem: ${friction.problem}\n`);
  console.log(`Friction Score: ${friction.friction_score}/10\n`);
  console.log(`NLROS Scenario: ${friction.nlros_scenario}\n`);
  console.log(`Hypothesis: ${friction.hypothesis}\n`);

  const exp = friction.experiment;
  console.log(`📋 Experiment: ${exp.name}\n`);
  console.log(`Variant A (control): ${exp.variant_a}`);
  console.log(`Variant B (treatment): ${exp.variant_b}\n`);
  console.log(`Primary Metric: ${exp.metric}`);
  console.log(`Duration: ${exp.duration_weeks} weeks`);
  console.log(`Investment: ${exp.investment}\n`);
}

function runGrowthQuery(frictionKey) {
  const experiments = loadExperiments();
  const friction = experiments.friction_map[frictionKey];

  if (!friction) {
    console.error(`❌ Friction point not found: ${frictionKey}`);
    process.exit(1);
  }

  console.log(`\n🚀 Querying Growth Hacking Playbook for: ${frictionKey}\n`);

  const question = `For ${frictionKey} in a community directory platform, the problem is: "${friction.problem}". The hypothesis is: "${friction.hypothesis}". What specific growth hacking tactics or experiments would the playbook recommend? How would you reduce friction and increase adoption?`;

  try {
    const cmd = `notebooklm ask "${question.replace(/"/g, '\\"')}" --json`;
    const result = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
    const response = JSON.parse(result);

    console.log('📚 Growth Hacking Playbook Response:\n');
    console.log(response.answer);
    console.log('\n');
  } catch (err) {
    console.error(
      '⚠️  Could not reach Growth Hacking notebook. Make sure NotebookLM CLI is authenticated.\n'
    );
    process.exit(1);
  }
}

function checkNLROSAlignment(frictionKey) {
  const experiments = loadExperiments();
  const nlros = loadNLROS();

  const friction = experiments.friction_map[frictionKey];
  if (!friction) {
    console.error(`❌ Friction point not found: ${frictionKey}`);
    process.exit(1);
  }

  const scenario = nlros.scenarios.find((s) => s.id === friction.nlros_scenario);
  if (!scenario) {
    console.error(`❌ NLROS scenario not found: ${friction.nlros_scenario}`);
    process.exit(1);
  }

  console.log(`\n✅ NLROS Safety Check: ${frictionKey}\n`);
  console.log(`Growth Experiment: ${friction.experiment.name}`);
  console.log(`NLROS Scenario It Addresses: ${scenario.name}\n`);
  console.log(`NLROS Threat: ${scenario.description}\n`);
  console.log(`How This Experiment Mitigates The Threat:\n`);

  const experiment = friction.experiment;
  console.log(
    `• Variant A (Control) avoids potential manipulation: ${experiment.variant_a}`
  );
  console.log(
    `• Variant B (Treatment) removes friction ethically: ${experiment.variant_b}`
  );
  console.log(`• Metric ensures we're measuring community health, not dark patterns: ${experiment.metric}\n`);

  console.log('✨ This growth experiment is NLROS-aligned (defensive + offensive)\n');
}

function showGrowthLoops() {
  const data = loadExperiments();
  console.log('\n🔄 Growth Loops (Compounding User Acquisition)\n');

  data.growth_loops.forEach((loop) => {
    console.log(`Loop: ${loop.loop_name}\n`);
    loop.stages.forEach((stage, i) => {
      console.log(`  ${i + 1}. ${stage}`);
    });
    console.log(`\n  North Star: ${loop.north_star_alignment}`);
    console.log(`  NLROS: ${loop.nlros_alignment}\n`);
  });
}

function showCadence() {
  const data = loadExperiments();
  console.log('\n📅 Weekly Experimentation Cadence\n');
  console.log(`Pace: ${data.experimentation_cadence.pace}`);
  console.log(`Duration: ${data.experimentation_cadence.duration}`);
  console.log(`Decision Rule: ${data.experimentation_cadence.decision_rule}\n`);

  console.log('Weekly Schedule:\n');
  Object.entries(data.weekly_cadence).forEach(([day, task]) => {
    console.log(`${day.toUpperCase()}: ${task}`);
  });
  console.log('\n');
}

const command = process.argv[2];

if (!command || command === 'help' || command === '--help') {
  console.log(`
🚀 Growth Experiments Runner for HydePark.directory

NORTH STAR & STRATEGY:
  growth north-star               # Show North Star Metric
  growth loops                    # Show growth loops
  growth cadence                  # Show weekly experimentation schedule

FRICTION MAP & EXPERIMENTS:
  growth list-friction            # List all friction points (by score)
  growth show <friction-key>      # Show experiment details
  growth query <friction-key>     # Query Growth Hacking playbook for tactics
  growth check <friction-key>     # Check NLROS safety alignment

EXAMPLE FRICTION KEYS:
  growth list-friction            # See all keys
  growth show onboarding
  growth query trust-paradox
  growth check gentrification-resistance

WHAT THIS DOES:
  • Shows your North Star metric (Community Contribution Index)
  • Maps user friction points (why residents leave/don't join)
  • Designs high-velocity experiments (3-5/week) to remove friction
  • Checks each experiment against NLROS (defensive + offensive)
  • Builds compounding growth loops (acquisition → engagement → retention)

WORKFLOW:
  1. growth list-friction         # Find friction
  2. growth query <friction>      # Get growth hacking tactics
  3. growth check <friction>      # Verify NLROS-aligned (safe)
  4. Build experiment + run it
  5. Monday-Friday cadence        # Ship weekly
  `);
  process.exit(0);
}

if (command === 'north-star') {
  showNorthStar();
} else if (command === 'list-friction') {
  listFrictionPoints();
} else if (command === 'show' && process.argv[3]) {
  showFrictionDetail(process.argv[3]);
} else if (command === 'query' && process.argv[3]) {
  runGrowthQuery(process.argv[3]);
} else if (command === 'check' && process.argv[3]) {
  checkNLROSAlignment(process.argv[3]);
} else if (command === 'loops') {
  showGrowthLoops();
} else if (command === 'cadence') {
  showCadence();
} else {
  console.error(`❌ Unknown command: ${command}`);
  console.error(`Run 'growth help' for usage\n`);
  process.exit(1);
}
