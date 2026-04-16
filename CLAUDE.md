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
