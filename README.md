# HydePark.directory

A community directory platform connecting students, local businesses, and property managers in Hyde Park.

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL (for local development, we recommend Neon for cloud)
- Stripe account (for featured listing payments)

### Installation

1. **Clone and install dependencies**

```bash
npm install
```

2. **Set up environment variables**

```bash
cp .env.example .env.local
```

Fill in the required variables in `.env.local`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/hydepark
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

3. **Set up database**

```bash
npm run db:push
```

This creates all tables in your database.

4. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### File Structure

- `/app` — Next.js App Router pages and API routes
- `/lib` — Core utilities (database, auth, validators, Stripe)
- `/components` — Reusable React components
- `/types` — TypeScript type definitions
- `/public` — Static assets

### Database Commands

```bash
npm run db:push        # Apply migrations
npm run db:generate    # Generate migration files
npm run db:studio      # Open Drizzle Studio (visual database editor)
```

### API Endpoints

**Businesses**
- `GET /api/businesses` — Search and filter businesses
- `GET /api/businesses/:id` — Get single business
- `POST /api/businesses` — Create business (auth required)
- `PATCH /api/businesses/:id` — Update business (owner only)
- `DELETE /api/businesses/:id` — Delete business (admin only)

**Leads**
- `POST /api/leads` — Submit contact form
- `GET /api/leads` — View leads (business owner/admin only)

**Authentication**
- `POST /api/auth/[...nextauth]` — NextAuth.js routes

**Payments**
- `POST /api/checkout` — Create Stripe checkout session
- `POST /api/webhooks/stripe` — Stripe webhook handler

## Features

### Phase 1 (MVP)
- [ ] Business directory with search/filter
- [ ] Authentication (OAuth + email)
- [ ] Featured listing purchase via Stripe
- [ ] Admin dashboard
- [ ] Lead capture & routing (manual)

### Phase 2
- [ ] Multi-agent orchestration (LangGraph)
- [ ] Automated lead routing
- [ ] Event discovery agent
- [ ] Newsletter generator
- [ ] Property manager tier

### Phase 3+
- [ ] Advanced analytics
- [ ] Discord integration
- [ ] Multi-neighborhood support
- [ ] White-label expansion

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: NextAuth.js v5 with multi-role RBAC
- **Payments**: Stripe
- **Deployment**: Vercel
- **Agents** (Phase 2): LangGraph + Claude Sonnet

## Contributing

See CONTRIBUTING.md for development guidelines.

## License

MIT

## Contact

info@hydepark.directory
