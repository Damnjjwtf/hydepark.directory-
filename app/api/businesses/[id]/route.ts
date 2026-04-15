import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { businesses } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { withRole } from '@/lib/auth';
import { BusinessUpdateSchema } from '@/lib/validators';

/**
 * GET /api/businesses/:id - Get single business
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const business = await db.query.businesses.findFirst({
      where: eq(businesses.id, params.id),
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // Increment view count
    await db.update(businesses).set({ viewCount: (business.viewCount || 0) + 1 }).where(eq(businesses.id, params.id));

    return NextResponse.json(business);
  } catch (error) {
    console.error('Error fetching business:', error);
    return NextResponse.json({ error: 'Failed to fetch business' }, { status: 500 });
  }
}

/**
 * PATCH /api/businesses/:id - Update business (owner or admin only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withRole(
    async (req: Request, session: any) => {
      try {
        const body = await req.json();
        const validated = BusinessUpdateSchema.parse(body);

        // Check ownership
        const business = await db.query.businesses.findFirst({
          where: eq(businesses.id, params.id),
        });

        if (!business) {
          return NextResponse.json({ error: 'Business not found' }, { status: 404 });
        }

        if (business.ownerId !== session.user.id && session.user.role !== 'ADMIN') {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const updated = await db
          .update(businesses)
          .set({
            ...validated,
            updatedAt: new Date(),
          })
          .where(eq(businesses.id, params.id))
          .returning();

        return NextResponse.json(updated[0]);
      } catch (error) {
        console.error('Error updating business:', error);
        return NextResponse.json({ error: 'Failed to update business' }, { status: 400 });
      }
    },
    ['BUSINESS_OWNER', 'ADMIN']
  )(request);
}

/**
 * DELETE /api/businesses/:id - Delete business (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withRole(
    async (_req: Request, session: any) => {
      try {
        const business = await db.query.businesses.findFirst({
          where: eq(businesses.id, params.id),
        });

        if (!business) {
          return NextResponse.json({ error: 'Business not found' }, { status: 404 });
        }

        // Only admin can delete
        if (session.user.role !== 'ADMIN') {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await db.delete(businesses).where(eq(businesses.id, params.id));

        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('Error deleting business:', error);
        return NextResponse.json({ error: 'Failed to delete business' }, { status: 500 });
      }
    },
    ['ADMIN']
  )(request);
}
