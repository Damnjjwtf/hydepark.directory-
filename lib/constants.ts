/**
 * App-wide constants and configuration
 */

export const BUSINESS_CATEGORIES = [
  { value: 'cafe', label: 'Café' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'bar', label: 'Bar / Pub' },
  { value: 'salon', label: 'Salon / Barbershop' },
  { value: 'boutique', label: 'Boutique / Retail' },
  { value: 'gym', label: 'Gym / Fitness' },
  { value: 'tutoring', label: 'Tutoring / Education' },
  { value: 'medical', label: 'Medical / Health' },
  { value: 'grocery', label: 'Grocery / Market' },
  { value: 'bookstore', label: 'Bookstore' },
  { value: 'gallery', label: 'Gallery / Art' },
  { value: 'nonprofit', label: 'Nonprofit / Community' },
  { value: 'other', label: 'Other' },
];

export const FEATURED_LISTING_TIERS = {
  BASIC: {
    name: 'Basic',
    price: 0,
    features: [
      'Business listing with contact info',
      'Business hours and website',
      'Up to 3 photos',
      'Customer contact form',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    price: 75,
    features: [
      'Everything in Basic',
      '"Featured" badge on directory',
      'Homepage carousel placement',
      'Email newsletter feature',
      'Up to 10 photos',
      'Instagram integration',
    ],
  },
  ELITE: {
    name: 'Elite',
    price: 150,
    features: [
      'Everything in Premium',
      'Priority homepage placement',
      'Student discount program',
      'Monthly analytics report',
      'Lead routing to your email',
      'Dedicated support',
    ],
  },
};

export const PM_PARTNERSHIP_TIERS = {
  BASIC: {
    name: 'Basic',
    price: 150,
    features: [
      'Property manager profile',
      'Partner badge on directory',
      'Basic tenant engagement tools',
      'Access to tenant feedback data',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 250,
    features: [
      'Everything in Basic',
      'White-labeled community guide for tenants',
      'Monthly market intelligence report',
      'Turnover analytics by building',
      'Priority support',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 500,
    features: [
      'Everything in Pro',
      'Custom neighborhood reports',
      'API access for tenant portals',
      'Quarterly strategy meetings',
      'Custom branding options',
    ],
  },
};

export const SITE_CONFIG = {
  name: 'HydePark.directory',
  description: 'Discover local businesses, connect with your community, find housing',
  domain: 'hydepark.directory',
  logo: '/images/logo.svg',
  ogImage: '/images/og-image.png',
};

export const PAGE_SIZES = {
  BUSINESSES_GRID: 12,
  LEADS_TABLE: 20,
  ADMIN_TABLE: 50,
};

// Feature flags (can be toggled without redeploying)
export const FEATURES = {
  SEMANTIC_SEARCH_ENABLED: false, // Enable when pgvector agent is ready
  DISCORD_EMBEDDING: false, // Enable in Phase 2
  PM_TIER_ENABLED: false, // Enable after Phase 2 validation
  LEAD_ROUTING_AGENT: false, // Enable in Phase 2
  NEWSLETTER_AUTOMATION: false, // Enable in Phase 2
};
