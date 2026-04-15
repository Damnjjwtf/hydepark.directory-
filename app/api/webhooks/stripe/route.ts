import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { businesses } from '@/lib/schema';
import { eq } from 'drizzle-orm';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

/**
 * POST /api/webhooks/stripe
 * Stripe will POST webhook events here
 * Handles:
 *   - checkout.session.completed: User completed featured listing purchase
 *   - customer.subscription.updated: Subscription status changed
 *   - customer.subscription.deleted: Subscription cancelled
 */
export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature') || '';
  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { businessId, tier } = session.metadata || {};

        if (businessId && tier) {
          // Calculate featured_until date (30 days from now for monthly subscription)
          const featuredUntil = new Date();
          featuredUntil.setDate(featuredUntil.getDate() + 30);

          // Update business to featured status
          await db
            .update(businesses)
            .set({
              isFeatured: true,
              featureTier: tier as any,
              stripeSubscriptionId: session.subscription as string,
              featuredUntil,
              updatedAt: new Date(),
            })
            .where(eq(businesses.id, businessId));

          console.log(`Business ${businessId} upgraded to ${tier} featured listing`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const { businessId } = subscription.metadata || {};

        if (businessId) {
          const isActive = subscription.status === 'active';

          if (!isActive) {
            // Subscription ended or payment failed
            await db
              .update(businesses)
              .set({
                isFeatured: false,
                featuredUntil: null,
                updatedAt: new Date(),
              })
              .where(eq(businesses.id, businessId));

            console.log(`Business ${businessId} featured status expired`);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const { businessId } = subscription.metadata || {};

        if (businessId) {
          // Remove featured status
          await db
            .update(businesses)
            .set({
              isFeatured: false,
              featuredUntil: null,
              updatedAt: new Date(),
            })
            .where(eq(businesses.id, businessId));

          console.log(`Business ${businessId} subscription cancelled`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
