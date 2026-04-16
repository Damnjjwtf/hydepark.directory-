/**
 * NotebookLM Integration for hydepark.directory
 * Provides programmatic access to Claude's "Building Directories with Claude" notebook
 *
 * Usage:
 *   - getNotebookInsights(query) - Chat with the notebook about building directories
 *   - listNotebookSources() - List all sources in the notebook
 *   - queryNotebook(question, sources?) - Get specific answers from notebook
 */

import { execSync } from "child_process";

const NOTEBOOK_ID = "49fb0ec0-1556-47a9-bfb2-1c611d5d6db1";
const NOTEBOOK_TITLE = "Building Directories with Claude";

/**
 * Chat with the NotebookLM notebook to get insights about building directories
 */
export async function getNotebookInsights(query: string): Promise<string> {
  try {
    const result = execSync(
      `notebooklm ask "${query.replace(/"/g, '\\"')}" --json`,
      {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      }
    );

    const parsed = JSON.parse(result);
    return parsed.answer || "No answer found";
  } catch (error) {
    console.error("NotebookLM query failed:", error);
    throw new Error(`Failed to query NotebookLM: ${error}`);
  }
}

/**
 * List all sources available in the notebook
 */
export async function listNotebookSources(): Promise<
  Array<{ id: string; title: string; type: string; status: string }>
> {
  try {
    const result = execSync("notebooklm source list --json", {
      encoding: "utf-8",
    });

    const parsed = JSON.parse(result);
    return parsed.sources || [];
  } catch (error) {
    console.error("Failed to list sources:", error);
    return [];
  }
}

/**
 * Query the notebook with optional source filtering
 */
export async function queryNotebook(
  question: string,
  sourceIds?: string[]
): Promise<{ answer: string; references: any[] }> {
  try {
    let command = `notebooklm ask "${question.replace(/"/g, '\\"')}" --json`;

    if (sourceIds && sourceIds.length > 0) {
      sourceIds.forEach((id) => {
        command += ` -s ${id}`;
      });
    }

    const result = execSync(command, { encoding: "utf-8" });
    const parsed = JSON.parse(result);

    return {
      answer: parsed.answer || "",
      references: parsed.references || [],
    };
  } catch (error) {
    console.error("NotebookLM query failed:", error);
    throw new Error(`Failed to query NotebookLM notebook`);
  }
}

/**
 * Get directory building strategy from the notebook
 */
export async function getDirectoryStrategy(): Promise<string> {
  return getNotebookInsights(
    "What are the key strategies for building a profitable online directory? List the top 5 insights."
  );
}

/**
 * Get data collection and enrichment methods from the notebook
 */
export async function getDataEnrichmentMethods(): Promise<string> {
  return getNotebookInsights(
    "What are the best methods for scraping, cleaning, and enriching directory data? Include tools and workflows."
  );
}

/**
 * Get monetization strategies from the notebook
 */
export async function getMonetizationStrategies(): Promise<string> {
  return getNotebookInsights(
    "What are the different ways to monetize an online directory? Focus on featured listings and premium features."
  );
}

/**
 * Verify notebook is accessible
 */
export async function verifyNotebookAccess(): Promise<boolean> {
  try {
    const sources = await listNotebookSources();
    return sources.length > 0;
  } catch {
    return false;
  }
}
