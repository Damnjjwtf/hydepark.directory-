import { z } from 'zod';
import { USER_ROLES, FEATURE_TIERS, LEAD_TYPES } from './schema';

// Auth schemas
export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum([
    USER_ROLES.STUDENT,
    USER_ROLES.BUSINESS_OWNER,
    USER_ROLES.PROPERTY_MANAGER,
  ]),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Business schemas
export const BusinessCreateSchema = z.object({
  name: z.string().min(1, 'Business name is required').max(255),
  description: z.string().max(2000).optional(),
  category: z.string().max(100).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(20).optional(),
  website: z.string().url().optional().or(z.literal('')),
  email: z.string().email().optional(),
  instagramHandle: z.string().max(255).optional(),
});

export const BusinessUpdateSchema = BusinessCreateSchema.partial();

// Lead schemas
export const LeadSubmitSchema = z.object({
  email: z.string().email('Valid email required'),
  name: z.string().min(1, 'Name required').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

// Newsletter schemas
export const NewsletterSubscribeSchema = z.object({
  email: z.string().email('Valid email required'),
});

// Export types for use in components/API routes
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type BusinessCreateInput = z.infer<typeof BusinessCreateSchema>;
export type BusinessUpdateInput = z.infer<typeof BusinessUpdateSchema>;
export type LeadSubmitInput = z.infer<typeof LeadSubmitSchema>;
export type NewsletterSubscribeInput = z.infer<typeof NewsletterSubscribeSchema>;
