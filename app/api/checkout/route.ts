import { NextRequest, NextResponse } from 'next/server';
import { withRole } from '@/lib/auth';
import { createFeaturedListingCheckout } from '@/lib/stripe';

/**
 * POST /api/checkout - Create Stripe checkout session for featured listing
 * Only business owners can access
 *
 * Body:
 *   - businessId: UUID of business
 *   - tier: 'PREMIUM' | 'ELITE'
 */
export const POST = withRole(
  async (request: Request, session: any) => {
    try {
      const body = await request.json();
      const { businessId, tier } = body;

      if (!businessId || !tier) {
        return NextResponse.json(
          { error: 'Missing businessId or tier' },
          { status: 400 }
        );
      }

      if (!['PREMIUM', 'ELITE'].includes(tier)) {
        return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
      }

      // Create checkout session
      const session_obj = await createFeaturedListingCheckout(
        businessId,
        tier,
        session.user.email
      );

      return NextResponse.json({
        url: session_obj.url,
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }
  },
  ['BUSINESS_OWNER', 'ADMIN']
);
