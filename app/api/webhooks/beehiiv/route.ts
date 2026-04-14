import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/webhooks/beehiiv
 * Beehiiv will POST webhook events here
 * TODO: Implement in Phase 2 when newsletter automation is active
 *
 * Handles:
 *   - subscriber.subscribed: New newsletter subscriber
 *   - subscriber.unsubscribed: Subscriber left list
 *   - email.opened: Track engagement
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Validate webhook signature from Beehiiv
    // TODO: Process event based on type

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing Beehiiv webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
