import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  uuid,
  serial,
  integer,
  json,
  vector,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums as string constants for validation
export const USER_ROLES = {
  STUDENT: 'STUDENT',
  BUSINESS_OWNER: 'BUSINESS_OWNER',
  PROPERTY_MANAGER: 'PROPERTY_MANAGER',
  ADMIN: 'ADMIN',
} as const;

export const FEATURE_TIERS = {
  BASIC: 'BASIC',
  PREMIUM: 'PREMIUM',
  ELITE: 'ELITE',
} as const;

export const LEAD_SOURCES = {
  FORM: 'FORM',
  AGENT: 'AGENT',
  DISCORD: 'DISCORD',
} as const;

export const LEAD_TYPES = {
  GENERAL: 'GENERAL',
  STUDENT_INTEREST: 'STUDENT_INTEREST',
  PARTNERSHIP: 'PARTNERSHIP',
} as const;

export const LEAD_STATUSES = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  CONVERTED: 'CONVERTED',
  CLOSED: 'CLOSED',
} as const;

export const AGENT_NAMES = {
  SOURCING: 'SOURCING',
  EVENTS: 'EVENTS',
  NEWSLETTER_GENERATOR: 'NEWSLETTER_GENERATOR',
  OUTREACH: 'OUTREACH',
  LEAD_ROUTER: 'LEAD_ROUTER',
} as const;

export const AGENT_STATUSES = {
  QUEUED: 'QUEUED',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export const NEWSLETTER_SEGMENTS = {
  STUDENTS: 'STUDENTS',
  BUSINESSES: 'BUSINESSES',
  PMS: 'PMS',
  GENERAL: 'GENERAL',
} as const;

// ============= TABLES =============

/**
 * Users table - All three roles (student, business owner, property manager, admin)
 */
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  role: text('role')
    .notNull()
    .$type<(typeof USER_ROLES)[keyof typeof USER_ROLES]>(),
  passwordHash: varchar('password_hash', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  verifiedAt: timestamp('verified_at'),
  metadata: json('metadata').$type<Record<string, any>>().default({}),
});

/**
 * Businesses - Core directory
 */
export const businesses = pgTable('businesses', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: uuid('owner_id').references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }),
  address: varchar('address', { length: 500 }),
  lat: text('lat'),
  lng: text('lng'),
  phone: varchar('phone', { length: 20 }),
  website: text('website'),
  email: varchar('email', { length: 255 }),
  instagramHandle: varchar('instagram_handle', { length: 255 }),
  isFeatured: boolean('is_featured').default(false),
  featuredUntil: timestamp('featured_until'),
  featureTier: text('feature_tier')
    .$type<(typeof FEATURE_TIERS)[keyof typeof FEATURE_TIERS]>(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  logoUrl: text('logo_url'),
  images: json('images').$type<string[]>().default([]),
  viewCount: integer('view_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  embedding: vector('embedding', { dimensions: 1536 }),
});

/**
 * Leads from students/customers
 */
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  message: text('message'),
  source: text('source')
    .$type<(typeof LEAD_SOURCES)[keyof typeof LEAD_SOURCES]>()
    .default('FORM'),
  leadType: text('lead_type')
    .$type<(typeof LEAD_TYPES)[keyof typeof LEAD_TYPES]>()
    .default('GENERAL'),
  routedTo: uuid('routed_to').references(() => users.id),
  status: text('status')
    .$type<(typeof LEAD_STATUSES)[keyof typeof LEAD_STATUSES]>()
    .default('NEW'),
  agentNotes: json('agent_notes').$type<Record<string, any>>().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Property manager memberships
 */
export const pmMemberships = pgTable('pm_memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  pmId: uuid('pm_id').references(() => users.id),
  propertyAddress: varchar('property_address', { length: 500 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  tier: text('tier')
    .$type<(typeof FEATURE_TIERS)[keyof typeof FEATURE_TIERS]>(),
  gatedContentAccess: boolean('gated_content_access').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Newsletter subscriptions
 */
export const newsletterSubscriptions = pgTable('newsletter_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  userId: uuid('user_id').references(() => users.id),
  beehiivSubscriberId: varchar('beehiiv_subscriber_id', { length: 255 }),
  segment: text('segment')
    .$type<(typeof NEWSLETTER_SEGMENTS)[keyof typeof NEWSLETTER_SEGMENTS]>()
    .default('GENERAL'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Agent execution logs
 */
export const agentExecutions = pgTable('agent_executions', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentName: text('agent_name')
    .$type<(typeof AGENT_NAMES)[keyof typeof AGENT_NAMES]>()
    .notNull(),
  status: text('status')
    .$type<(typeof AGENT_STATUSES)[keyof typeof AGENT_STATUSES]>()
    .notNull(),
  inputData: json('input_data').$type<Record<string, any>>(),
  outputData: json('output_data').$type<Record<string, any>>(),
  errorMessage: text('error_message'),
  tokensUsed: integer('tokens_used'),
  costCents: integer('cost_cents'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

/**
 * Admin audit log
 */
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  adminId: uuid('admin_id').references(() => users.id),
  action: varchar('action', { length: 100 }),
  entityType: varchar('entity_type', { length: 50 }),
  entityId: uuid('entity_id'),
  changes: json('changes').$type<Record<string, any>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============= RELATIONS =============

export const usersRelations = relations(users, ({ many }) => ({
  businesses: many(businesses),
  leads: many(leads),
  pmMemberships: many(pmMemberships),
}));

export const businessesRelations = relations(businesses, ({ one }) => ({
  owner: one(users, {
    fields: [businesses.ownerId],
    references: [users.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  routedTo: one(users, {
    fields: [leads.routedTo],
    references: [users.id],
  }),
}));

export const pmMembershipsRelations = relations(pmMemberships, ({ one }) => ({
  pm: one(users, {
    fields: [pmMemberships.pmId],
    references: [users.id],
  }),
}));
