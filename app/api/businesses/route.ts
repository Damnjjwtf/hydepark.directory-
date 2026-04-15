import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { businesses } from '@/lib/schema';
import { eq, like, and, desc } from 'drizzle-orm';
import { withRole } from '@/lib/auth';
import { BusinessCreateSchema } from '@/lib/validators';

/**
 * GET /api/businesses - Search and filter businesses
 * Query params:
 *   - q: search query (searches name + description)
 *   - category: filter by category
 *   - featured: true/false to show only featured
 *   - page: pagination (default 1)
 *   - limit: results per page (default 12)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '12', 10), 100);

    // Build query conditions
    const conditions: any[] = [];

    if (q) {
      conditions.push(
        // @ts-ignore - Drizzle doesn't have great support for OR yet
        // This will be fixed in query building
        like(businesses.name, `%${q}%`)
      );
    }

    if (category) {
      conditions.push(eq(businesses.category, category));
    }

    if (featured) {
      conditions.push(eq(businesses.isFeatured, true));
    }

    // Execute query
    const offset = (page - 1) * limit;
    const query = conditions.length > 0 ? db.select().from(businesses).where(and(...conditions)) : db.select().from(businesses);

    const results = await query
      .orderBy(desc(businesses.isFeatured), desc(businesses.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count (simplified for MVP)
    const allResults = await (conditions.length > 0
      ? db.select().from(businesses).where(and(...conditions))
      : db.select().from(businesses)
    );
    const total = allResults.length;

    return NextResponse.json({
      data: results,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return NextResponse.json({ error: 'Failed to fetch businesses' }, { status: 500 });
  }
}

/**
 * POST /api/businesses - Create or claim a business
 * Only authenticated BUSINESS_OWNER or ADMIN can post
 */
export async function POST(request: NextRequest) {
  return withRole(
    async (req: Request, session: any) => {
      try {
        const body = await req.json();
        const validated = BusinessCreateSchema.parse(body);

        const business = await db
          .insert(businesses)
          .values({
            ownerId: session.user.id,
            name: validated.name,
            description: validated.description,
            category: validated.category,
            address: validated.address,
            phone: validated.phone,
            website: validated.website || undefined,
            email: validated.email,
            instagramHandle: validated.instagramHandle,
          })
          .returning();

        return NextResponse.json(business[0], { status: 201 });
      } catch (error) {
        console.error('Error creating business:', error);
        return NextResponse.json({ error: 'Failed to create business' }, { status: 400 });
      }
    },
    ['BUSINESS_OWNER', 'ADMIN']
  )(request);
}
