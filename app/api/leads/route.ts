import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { LeadSubmitSchema } from '@/lib/validators';
import { withRole } from '@/lib/auth';

/**
 * POST /api/leads - Submit a lead (public, no auth required)
 * Used when students submit contact forms on business pages
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = LeadSubmitSchema.parse(body);

    await db
      .insert(leads)
      .values({
        email: validated.email,
        name: validated.name,
        message: validated.message,
        source: 'FORM',
        leadType: 'GENERAL',
        status: 'NEW',
      })
      .returning();

    // TODO: In Phase 2, trigger lead_router agent here
    // For now, leads are stored and admin manually routes them

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received. We will route it to the business soon.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 400 });
  }
}

/**
 * GET /api/leads - Fetch leads (admin/business owner only)
 * Business owners see only their own leads
 * Admins see all leads
 */
export async function GET(request: NextRequest) {
  return withRole(
    async (_req: Request, session: any) => {
      try {
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10);
        const limit = 20;
        const offset = (page - 1) * limit;

        // Get leads based on role
        let results;
        if (session.user.role === 'ADMIN') {
          results = await db.select().from(leads).limit(limit).offset(offset);
        } else {
          // Business owner - only see leads routed to them
          results = await db
            .select()
            .from(leads)
            .where(eq(leads.routedTo, session.user.id))
            .limit(limit)
            .offset(offset);
        }

        return NextResponse.json({
          data: results,
          pagination: { page, limit },
        });
      } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
      }
    },
    ['BUSINESS_OWNER', 'ADMIN']
  )(request);
}
