import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/webhooks/langgraph
 * LangGraph agent service will POST completion events here
 * TODO: Implement in Phase 2 when multi-agent system is active
 *
 * Handles:
 *   - lead_router.completed: Lead has been classified and routed
 *   - event_discovery.completed: New events discovered
 *   - newsletter_generator.completed: Weekly newsletter generated
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentName, agentExecutionId, status, output } = body;

    // TODO: Validate webhook signature from agent service
    // TODO: Process completion event based on agentName
    // TODO: Update agent_executions table with results

    console.log(`Agent ${agentName} completed: ${status}`);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing LangGraph webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
