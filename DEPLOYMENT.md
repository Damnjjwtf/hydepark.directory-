# Deployment Guide: HydePark.directory to Vercel

This guide walks you through deploying Phase 1 MVP to production.

## Prerequisites

- GitHub account with the code pushed
- Vercel account (free tier is fine for MVP)
- PostgreSQL database (we recommend Neon for serverless)
- Stripe account (test mode for development, live mode for production)
- Google OAuth credentials (optional but recommended for user signup)

## Step 1: Set Up Database (Neon PostgreSQL)

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project and database
3. Copy the connection string: `postgresql://user:password@...`
4. Save this for later (Step 3)

## Step 2: Set Up Stripe

### Create Featured Listing Products in Stripe Dashboard

1. Log in to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Go to **Products** → **Create**
3. Create two products:

   **Product 1: Featured Listing - Premium**
   - Name: "Featured Listing - Premium"
   - Description: "30 days featured on HydePark.directory"
   - Pricing: $75/month (recurring)
   - Get the **Price ID** (starts with `price_...`)

   **Product 2: Featured Listing - Elite**
   - Name: "Featured Listing - Elite"
   - Description: "30 days featured + lead routing + analytics"
   - Pricing: $150/month (recurring)
   - Get the **Price ID**

4. Copy both Price IDs for Step 3

### Get Stripe Keys

1. Go to **Developers** → **API keys**
2. Copy:
   - **Secret key** (starts with `sk_live_...` in production)
   - **Publishable key** (starts with `pk_live_...`)

### Set Up Webhook

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (starts with `whsec_...`)

## Step 3: Deploy to Vercel

### Option A: Using Vercel Web Dashboard (Recommended for MVP)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import your GitHub repository
4. Click **Configure Project**
5. Set **Framework Preset** to `Next.js`
6. In **Environment Variables**, add:

```
DATABASE_URL=postgresql://user:password@...    [from Neon]
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>
STRIPE_SECRET_KEY=sk_live_...                  [from Stripe]
STRIPE_PUBLISHABLE_KEY=pk_live_...            [from Stripe]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...[from Stripe]
STRIPE_FEATURED_PREMIUM_PRICE_ID=price_...    [from Stripe Products]
STRIPE_FEATURED_ELITE_PRICE_ID=price_...      [from Stripe Products]
STRIPE_WEBHOOK_SECRET=whsec_...               [from Stripe Webhooks]
GOOGLE_CLIENT_ID=<if using Google OAuth>
GOOGLE_CLIENT_SECRET=<if using Google OAuth>
```

7. Click **Deploy**
8. Wait for deployment to complete (2-3 minutes)

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and enter environment variables when asked.

## Step 4: Run Database Migrations

After deployment, you need to create tables in your production database:

### Via Vercel Dashboard

1. Go to your project in Vercel
2. Click **Functions** tab
3. Create a one-time function to run migrations:

```bash
DATABASE_URL=<your-neon-url> npm run db:push
```

### Via Command Line (Recommended)

```bash
# Set production database URL temporarily
export DATABASE_URL="postgresql://user:password@...from-neon"

# Run migrations
npm run db:push

# Verify tables created
npm run db:studio  # Opens visual database editor
```

## Step 5: Test the Live Site

1. Go to your deployed Vercel URL
2. Test the flow:
   - [ ] Homepage loads
   - [ ] Search page works
   - [ ] Sign up via Google OAuth
   - [ ] Create a test business
   - [ ] Visit business detail page
   - [ ] Submit contact form
   - [ ] Check Vercel logs for errors

### Debug Logs

View logs in Vercel dashboard:
1. Click **Deployments** → latest
2. Click **Logs**
3. Look for errors in **Runtime Logs**

## Step 6: Configure DNS (Optional but Recommended)

To use a custom domain like `hydepark.directory`:

1. In Vercel project settings, click **Domains**
2. Add your domain
3. Update your domain registrar's DNS settings to point to Vercel
4. Vercel will provide exact DNS records to add
5. Wait 24-48 hours for DNS to propagate

## Step 7: Set Up Monitoring

### Sentry (Error Tracking)

1. Create account at [sentry.io](https://sentry.io)
2. Create a Next.js project
3. Get DSN key
4. Add to `.env.production`:
   ```
   NEXT_PUBLIC_SENTRY_DSN=...
   ```
5. Deploy again

### Vercel Analytics

1. In Vercel project settings, click **Analytics**
2. Enable Web Analytics (shows page performance)

## Troubleshooting

### "DATABASE_URL is not set" error

- Verify DATABASE_URL is in Vercel Environment Variables
- Redeploy after adding it
- Check that PostgreSQL connection string is correct

### Stripe webhook failures

- Go to Stripe Dashboard → Webhooks
- Check **Endpoint Status** (should be green/100% success)
- If failing, check webhook signing secret matches in `.env`
- View webhook logs in Stripe dashboard

### NextAuth signin not working

- Verify NEXTAUTH_URL matches your deployed domain
- Regenerate NEXTAUTH_SECRET: `openssl rand -base64 32`
- Check Google OAuth credentials match deployment URL

### "Build failed" error

- Check Vercel build logs
- Common causes:
  - TypeScript errors (run `npm run build` locally first)
  - Missing environment variables
  - Database connection timeout during build

## Monitoring Costs

Phase 1 MVP running costs:

| Service | Cost | Notes |
|---------|------|-------|
| Vercel | $0–20/mo | Free tier + overage |
| Neon (PostgreSQL) | $15–30/mo | Free tier with limits |
| Stripe | 2.9% + $0.30 | Per transaction only |
| Claude API | ~$50/mo | If agents enabled (Phase 2) |
| **Total** | **$65–100/mo** | Stays well under $400/mo budget |

Set up cost alerts in Vercel dashboard if you exceed $50/month.

## Production Checklist Before Launch

- [ ] Database migrations run successfully
- [ ] All environment variables set
- [ ] Stripe webhook endpoint returning 200 OK
- [ ] Homepage + search page loads in <2s
- [ ] Google OAuth signup works
- [ ] Can submit contact forms
- [ ] Can purchase featured listing via Stripe
- [ ] Webhook updates business featured status
- [ ] No errors in Vercel function logs
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled for monitoring

## Rollback Plan

If something breaks in production:

1. View previous successful deployment in Vercel
2. Click **...** → **Promote to Production**
3. Revert immediately (takes <1 minute)
4. Fix issue locally, commit, and redeploy

## Next Steps (Phase 2)

Once Phase 1 is stable:

1. Set up Railway for LangGraph agents
2. Implement multi-agent system (lead routing, event discovery)
3. Add newsletter automation
4. Launch property manager tier
5. Expand to more neighborhoods

See `AGENTS_SETUP.md` for Phase 2 deployment instructions.
