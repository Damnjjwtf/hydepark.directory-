# Quick Start Guide

Get the project running locally in 5 minutes.

## Prerequisites

- Node.js 20+ installed ([nodejs.org](https://nodejs.org))
- PostgreSQL running locally OR Neon account (free tier)
- Git

## 1. Install Dependencies

```bash
npm install
```

This installs all required packages from `package.json`.

## 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in values:

```env
# Required for local development

DATABASE_URL=postgresql://user:password@localhost:5432/hydepark
# OR use Neon: postgresql://user:password@region.neon.tech/hydepark

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-me-with-openssl-rand-base64-32

# Optional (leave empty for now, needed for featured listings)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
# Copy output and paste into .env.local as NEXTAUTH_SECRET=<output>
```

### Set Up Local PostgreSQL (Option 1)

If you have PostgreSQL installed locally:

```bash
# Create database
createdb hydepark

# Update DATABASE_URL in .env.local:
DATABASE_URL=postgresql://localhost/hydepark
```

### Set Up Neon Database (Option 2 - Recommended)

1. Go to [neon.tech](https://neon.tech)
2. Create free account and project
3. Copy connection string
4. Paste into `.env.local` as DATABASE_URL

## 3. Run Database Migrations

Create all tables:

```bash
npm run db:push
```

Verify tables were created:

```bash
npm run db:studio
# Opens Drizzle Studio - visual database editor at localhost:5555
```

## 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the homepage.

## 5. Test the Application

### Test Directory Search

1. Click "Browse Directory" on homepage
2. You should see a search page (no businesses yet, that's normal)

### Test API Directly (curl/Postman)

Get all businesses:
```bash
curl http://localhost:3000/api/businesses
```

Create a test business (requires auth, will fail - expected):
```bash
curl -X POST http://localhost:3000/api/businesses \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Café", "category": "cafe"}'
```

## Common Issues & Fixes

### "Cannot find module 'pg'" error

```bash
npm install pg
```

### "DATABASE_URL is not set" error

- Check `.env.local` file exists
- Check DATABASE_URL line is not commented out
- Restart dev server after changing `.env.local`

### Port 3000 already in use

Use a different port:
```bash
PORT=3001 npm run dev
```

### PostgreSQL connection refused

- Check PostgreSQL is running:
  ```bash
  # macOS/Linux
  brew services list
  
  # Windows
  # Check Services app for PostgreSQL
  ```
- Try connecting directly:
  ```bash
  psql -U postgres
  ```

### "No tables found" after running migrations

Try again:
```bash
npm run db:generate
npm run db:push
```

## Development Workflow

### Make Changes

Edit files in `/app`, `/lib`, or `/components`.

Next.js automatically reloads changes (hot reload).

### Run Linting

```bash
npm run lint
```

Fix issues:
```bash
npm run lint --fix
```

### Type Check

```bash
npm run build
```

This catches TypeScript errors before deployment.

### Commit Changes

```bash
git add .
git commit -m "Feature: add search filtering"
git push origin claude/hydepark-directory-agents-6ha8T
```

## File Structure Reference

```
app/
├── page.tsx              # Homepage
├── layout.tsx            # Root layout
├── search/page.tsx       # Search/directory
├── business/[id]/        # Business detail
├── admin/                # Admin dashboard
└── api/                  # API routes
    ├── businesses/       # Business CRUD
    ├── leads/            # Lead submission
    ├── checkout/         # Stripe checkout
    └── webhooks/         # Webhook handlers

lib/
├── db.ts                 # Database client
├── schema.ts             # Database schema
├── auth.ts               # NextAuth config
├── stripe.ts             # Stripe helpers
├── validators.ts         # Input validation
└── constants.ts          # App config

components/              # Reusable React components (add as needed)
```

## What Works Now (Phase 1 MVP)

✅ Homepage  
✅ Business search/filter  
✅ Business detail pages  
✅ Database (schema ready, no seed data)  
✅ API routes (GET /businesses, etc.)  
✅ Authentication setup (NextAuth.js ready)  
✅ Stripe integration (configured, not yet tested)  
✅ Webhooks (configured, not yet tested)  

## What's Missing (Phase 2+)

❌ Admin authentication (login system not yet integrated)  
❌ Business owner signup/dashboard  
❌ Payment processing (Stripe keys needed)  
❌ Lead routing agents  
❌ Newsletter automation  
❌ Discord integration  

## Next Steps

1. **Add test data** (see `SEED_DATA.md`)
2. **Integrate Google OAuth** (see `AUTH_SETUP.md`)
3. **Test Stripe** (see `DEPLOYMENT.md`)
4. **Deploy to Vercel** (see `DEPLOYMENT.md`)

## Getting Help

- Check existing code for patterns
- Read comments in `/lib` files
- Review Next.js docs: https://nextjs.org/docs
- Check NextAuth.js docs: https://next-auth.js.org

## Stop Development Server

Press `Ctrl+C` in terminal running `npm run dev`.

---

**Happy coding!** 🚀
