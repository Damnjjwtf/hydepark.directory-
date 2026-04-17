#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EXERCISES_FILE = path.join(__dirname, 'nlros-exercises.json');

function loadExercises() {
  return JSON.parse(fs.readFileSync(EXERCISES_FILE, 'utf8'));
}

function listScenarios() {
  const data = loadExercises();
  console.log('\n📋 HydePark Stress-Test Scenarios\n');
  data.scenarios.forEach((s) => {
    const icon = s.threat_level === 'critical' ? '🔴' : '🟡';
    console.log(`${icon} ${s.id}`);
    console.log(`   ${s.name}`);
    console.log(`   ${s.description}\n`);
  });
}

function runStressTest(scenarioId) {
  const data = loadExercises();
  const scenario = data.scenarios.find((s) => s.id === scenarioId);

  if (!scenario) {
    console.error(`❌ Scenario not found: ${scenarioId}`);
    process.exit(1);
  }

  console.log(`\n🔍 Running Stress-Test: ${scenario.name}\n`);
  console.log(`Threat Level: ${scenario.threat_level.toUpperCase()}\n`);
  console.log(`Description:\n${scenario.description}\n`);

  // Query the NLROS notebook
  console.log('Querying NLROS notebook...\n');
  try {
    const notebookQuestion = scenario.stress_test_prompt;
    const cmd = `notebooklm ask "${notebookQuestion.replace(/"/g, '\\"')}" --json`;
    const result = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
    const response = JSON.parse(result);

    console.log('📚 NLROS Response:\n');
    console.log(response.answer);
    console.log('\n');
  } catch (err) {
    console.error('⚠️  Could not reach NLROS notebook. Make sure NotebookLM CLI is installed and authenticated.');
    console.error(`Command failed: notebooklm auth check\n`);
    process.exit(1);
  }

  // Show mitigations
  console.log(`\n🛡️  Immediate Mitigations for ${scenario.name}:\n`);
  scenario.immediate_mitigations.forEach((m, i) => {
    console.log(`${i + 1}. ${m}`);
  });

  console.log(`\n🏗️  Design Changes Needed:\n`);
  scenario.design_changes.forEach((d, i) => {
    console.log(`${i + 1}. ${d}`);
  });

  console.log(`\n⚠️  Affected Features:\n`);
  scenario.affected_features.forEach((f) => {
    console.log(`- ${f}`);
  });

  console.log('\n');
}

function getScenario(scenarioId) {
  const data = loadExercises();
  const scenario = data.scenarios.find((s) => s.id === scenarioId);

  if (!scenario) {
    console.error(`❌ Scenario not found: ${scenarioId}`);
    process.exit(1);
  }

  console.log(JSON.stringify(scenario, null, 2));
}

const command = process.argv[2];

if (!command || command === 'help' || command === '--help') {
  console.log(`
🚀 NLROS Exercise Runner for HydePark.directory

Usage:
  nlros list                          # Show all stress-test scenarios
  nlros stress-test <scenario-id>     # Run a specific stress-test
  nlros show <scenario-id>            # Show scenario details as JSON
  nlros help                          # Show this help message

Example Scenarios:
  nlros stress-test gentrification-accelerant
  nlros stress-test youth-exodus-spiral
  nlros stress-test cold-start-paradox
  nlros list                          # See all scenarios

Requirements:
  - NotebookLM CLI installed (\`npm install -g notebooklm\`)
  - Authenticated with Google (\`notebooklm login\`)
  - NLROS notebook context set (\`notebooklm use 1535e67a-33cd-4cef-8600-08a7572edae1\`)
  `);
  process.exit(0);
}

if (command === 'list') {
  listScenarios();
} else if (command === 'stress-test' && process.argv[3]) {
  runStressTest(process.argv[3]);
} else if (command === 'show' && process.argv[3]) {
  getScenario(process.argv[3]);
} else {
  console.error(`❌ Unknown command: ${command}`);
  console.error(`Run 'nlros help' for usage\n`);
  process.exit(1);
}
