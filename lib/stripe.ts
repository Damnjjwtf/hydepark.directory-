import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

/**
 * Featured listing price IDs (must match your Stripe product setup)
 * For MVP: create these products in Stripe dashboard
 * - Product: "Featured Listing - Premium" → Price ID: price_1...
 * - Product: "Featured Listing - Elite" → Price ID: price_1...
 */
export const FEATURED_LISTING_PRICES = {
  PREMIUM: process.env.STRIPE_FEATURED_PREMIUM_PRICE_ID || 'price_premium_placeholder',
  ELITE: process.env.STRIPE_FEATURED_ELITE_PRICE_ID || 'price_elite_placeholder',
};

/**
 * Create checkout session for featured listing upgrade
 */
export async function createFeaturedListingCheckout(
  businessId: string,
  tier: 'PREMIUM' | 'ELITE',
  email: string
) {
  const priceId = FEATURED_LISTING_PRICES[tier];

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXTAUTH_URL}/business/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/business/checkout?cancelled=true`,
    customer_email: email,
    metadata: {
      businessId,
      tier,
    },
  });

  return session;
}

/**
 * Handle subscription completion webhook
 * Called when Stripe checkout.session.completed webhook fires
 */
export async function handleSubscriptionComplete(session: Stripe.Checkout.Session) {
  const businessId = session.metadata?.businessId;
  const tier = session.metadata?.tier;
  const subscriptionId = session.subscription as string;

  if (!businessId || !tier) {
    throw new Error('Missing metadata in Stripe session');
  }

  return { businessId, tier, subscriptionId };
}

/**
 * Handle subscription update webhook
 * Called when customer.subscription.updated webhook fires
 */
export async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  // Determine if subscription is active
  const isActive = subscription.status === 'active';

  return { subscriptionId: subscription.id, isActive };
}

/**
 * Cancel subscription (for business owner cancellation)
 */
export async function cancelSubscription(subscriptionId: string) {
  await stripe.subscriptions.cancel(subscriptionId);
}
