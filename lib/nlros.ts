/**
 * NLROS Integration Library (Phase 2)
 *
 * Provides programmatic access to stress-testing framework
 *
 * Usage:
 *   import { stressTest, getScenario, listScenarios } from '@/lib/nlros'
 *
 *   const result = await stressTest('gentrification-accelerant')
 *   result.answer  // → NLROS notebook response
 *   result.mitigations  // → immediate_mitigations array
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface StressTestScenario {
  id: string;
  name: string;
  description: string;
  threat_level: 'critical' | 'high';
  affected_features: string[];
  stress_test_prompt: string;
  immediate_mitigations: string[];
  design_changes: string[];
}

interface StressTestResult {
  scenario: StressTestScenario;
  answer: string;
  mitigations: string[];
  designChanges: string[];
  affectedFeatures: string[];
  threatLevel: string;
}

interface ExercisesData {
  notebook_id: string;
  scenarios: StressTestScenario[];
  meta: {
    created_date: string;
    version: string;
    how_to_use: string;
  };
}

let cachedExercises: ExercisesData | null = null;

/**
 * Load stress-test scenarios from .claude/nlros-exercises.json
 */
function loadExercises(): ExercisesData {
  if (cachedExercises) return cachedExercises;

  const exercisesPath = path.join(
    process.cwd(),
    '.claude',
    'nlros-exercises.json'
  );

  const data = fs.readFileSync(exercisesPath, 'utf8');
  cachedExercises = JSON.parse(data);
  return cachedExercises;
}

/**
 * Get a specific scenario by ID
 */
export function getScenario(scenarioId: string): StressTestScenario | null {
  const exercises = loadExercises();
  return exercises.scenarios.find((s) => s.id === scenarioId) || null;
}

/**
 * List all stress-test scenarios
 */
export function listScenarios(): StressTestScenario[] {
  return loadExercises().scenarios;
}

/**
 * Run a stress-test against a scenario
 * Queries NLROS notebook and returns comprehensive results
 */
export async function stressTest(
  scenarioId: string
): Promise<StressTestResult> {
  const exercises = loadExercises();
  const scenario = exercises.scenarios.find((s) => s.id === scenarioId);

  if (!scenario) {
    throw new Error(`Scenario not found: ${scenarioId}`);
  }

  // Check if notebooklm CLI is available
  try {
    execSync('notebooklm auth check', { stdio: 'pipe' });
  } catch {
    throw new Error(
      'NotebookLM CLI not available. Install with: npm install -g notebooklm'
    );
  }

  // Query NLROS notebook
  const cmd = `notebooklm ask "${scenario.stress_test_prompt.replace(/"/g, '\\"')}" --json`;
  let answer = '';

  try {
    const result = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
    const parsed = JSON.parse(result);
    answer = parsed.answer;
  } catch (err) {
    throw new Error(
      'Failed to query NLROS notebook. Ensure it is authenticated: notebooklm login'
    );
  }

  return {
    scenario,
    answer,
    mitigations: scenario.immediate_mitigations,
    designChanges: scenario.design_changes,
    affectedFeatures: scenario.affected_features,
    threatLevel: scenario.threat_level,
  };
}

/**
 * Batch stress-test multiple scenarios
 */
export async function stressTestBatch(
  scenarioIds: string[]
): Promise<StressTestResult[]> {
  return Promise.all(scenarioIds.map((id) => stressTest(id)));
}

/**
 * Filter scenarios by threat level
 */
export function filterByThreatLevel(level: 'critical' | 'high'): StressTestScenario[] {
  return loadExercises().scenarios.filter((s) => s.threat_level === level);
}

/**
 * Get scenarios affecting a specific feature
 */
export function getScenariosAffectingFeature(featureName: string): StressTestScenario[] {
  return loadExercises().scenarios.filter((s) =>
    s.affected_features.includes(featureName)
  );
}

/**
 * Get mitigations for a scenario
 */
export function getMitigations(scenarioId: string): string[] | null {
  const scenario = getScenario(scenarioId);
  return scenario ? scenario.immediate_mitigations : null;
}

/**
 * Get design changes needed for a scenario
 */
export function getDesignChanges(scenarioId: string): string[] | null {
  const scenario = getScenario(scenarioId);
  return scenario ? scenario.design_changes : null;
}

/**
 * Generate a stress-test report for all critical scenarios
 */
export async function generateCriticalReport(): Promise<StressTestResult[]> {
  const critical = filterByThreatLevel('critical');
  return stressTestBatch(critical.map((s) => s.id));
}

/**
 * Example: Use in a feature development workflow
 *
 * // When building featured listings:
 * const result = await stressTest('competitor-blitzkrieg')
 * console.log(result.answer)  // Get NLROS advice
 * console.log(result.mitigations)  // What to build
 *
 * // Before API design:
 * const scenarios = getScenariosAffectingFeature('user_profiles')
 * // stress-test all scenarios that affect user_profiles
 */

export default {
  stressTest,
  stressTestBatch,
  getScenario,
  listScenarios,
  filterByThreatLevel,
  getScenariosAffectingFeature,
  getMitigations,
  getDesignChanges,
  generateCriticalReport,
};
