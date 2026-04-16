# HydePark Directory: Phase 1 Feature Priority Roadmap

**Objective**: Shift from "search engine" to "community platform" with minimal scope creep  
**Target Completion**: 4–5 weeks post-research  
**Success Metric**: 20%+ engagement (reviews/comments), 30% week-2 retention

---

## The Matrix: Effort vs. Impact

```
IMPACT (High to Low) ↑
                   |
      HIGH IMPACT   | [QUICK WINS]        [STRATEGIC BETS]
      5–6 stars     | • Discussions       • Community rituals
                   | • Reviews           • Story-first UX
                   | • Spotlights        • Private tiers
                   |
      MEDIUM IMPACT | [NICE-TO-HAVE]     [LONG-TERM]
      3–4 stars     | • Photos (UGC)      • Leaderboards
                   | • Profiles          • AMA scheduling
                   | • Badges            • Marketplace features
                   |
      LOW IMPACT    | [SKIP]              [FUTURE PHASES]
      1–2 stars     |                     • AR/mobile innovations
                   |                     • AI recommendations
                   |
                   └──────────────────────────────────→
                  EFFORT (Low to High: days to weeks)
```

---

## Quick Wins (Phase 1, Weeks 2–5)

### ✅ MUST HAVE: Threaded Discussions on Business Pages

**Impact**: 🟢 High (shifts from static listing to active discussion)  
**Effort**: 3–5 days  
**Description**:
- Simple comment section on each business detail page
- Comments sorted by newest/most helpful
- Business owner can "pin" replies
- Students see username + avatar + comment text + timestamp

**Why It Matters**:
- Creates repeat visits (users want to see replies to their comments)
- Humanizes businesses (owners can respond to feedback)
- Generates authentic content (SEO benefit + social proof)
- Precedent: Reddit, Product Hunt, Hacker News all thrive on comments

**Implementation**:
```typescript
// New table: discussions
id, business_id, user_id, comment_text, created_at, helpful_count, is_pinned

// New API: POST /api/businesses/[id]/comments
// New Component: <DiscussionThread />
```

**Success Target**: 50% of businesses have 3+ comments within first month

---

### ✅ MUST HAVE: 5-Star Review System

**Impact**: 🟢 High (critical trust signal; drives behavior)  
**Effort**: 2–3 days  
**Description**:
- 5-star rating dropdown + optional text review (max 300 chars)
- Reviews display on business card AND detail page
- Average rating shown prominently
- Top reviewers get badge on profile

**Why It Matters**:
- Trust mechanism (Airbnb playbook: reviews >> anything else)
- Engagement driver (students want to share opinions)
- Platform currency (encourages repeated participation)
- Business value (shows which places are actually good)

**Implementation**:
```typescript
// New table: reviews
id, business_id, user_id, rating, text, created_at, helpful_count

// New API: POST /api/businesses/[id]/reviews
// New Component: <ReviewCard />, <ReviewForm />
```

**Success Target**: 20% of visitors submit a review; avg rating 4.2+ stars

---

### ✅ MUST HAVE: Weekly Spotlight Carousel

**Impact**: 🟡 Medium-High (drives repeat visits; creates identity)  
**Effort**: 3–4 days  
**Description**:
- Homepage carousel: "Business of the Week" + "Student Spotlight"
- Admin selects featured business + writes 1-paragraph story + 1 hero photo
- Links to full business page + student review feature
- Rotates every Monday

**Why It Matters**:
- Creates predictable ritual (Discord pattern: Monday threads)
- Gives businesses incentive to maintain good standing
- Drives traffic to specific businesses (helps early adopters)
- Makes homepage feel "alive" (not static)

**Implementation**:
```typescript
// New table: spotlights
id, type (BUSINESS|STUDENT), title, story, image_url, start_date, end_date

// New Component: <SpotlightCarousel />
// New Admin Page: /admin/spotlights/create
```

**Success Target**: 10% CTR on spotlights; 3+ featured businesses per month

---

### ✅ NICE-TO-HAVE: Simple User Profiles

**Impact**: 🟡 Medium (enables reputation; supports community identity)  
**Effort**: 4–5 days  
**Description**:
- Student profile: Avatar + username + "Reviewed X businesses" + badges
- Business owner profile: Photo + short bio (required) + "Asked X questions"
- Show mutual connections (simple: "Also studied at UChicago")
- Link to all reviews/comments from user

**Why It Matters**:
- Humanizes the platform (Airbnb's required profile photos)
- Builds reputation system (encourages quality contributions)
- Mutual connections = trust signal (social proof)
- Creates sense of membership

**Implementation**:
```typescript
// Extend users table: avatar_url, bio, show_mutual_connections

// New page: /profile/[username]
// New Component: <UserBadges />, <MutualConnections />
```

**Success Target**: 60%+ of users fill out profile; 30% upload avatar

---

### ✅ NICE-TO-HAVE: Photo Upload for Businesses

**Impact**: 🟡 Medium (visual trust; engagement boost)  
**Effort**: 2–3 days  
**Description**:
- "Add a photo" button on business detail page
- Photo gallery below listing
- Photos from any student (not just owner)
- Upvoting system ("helpful photo")

**Why It Matters**:
- User-generated content (4.3x engagement multiplier per research)
- Visual proof (what the place actually looks like)
- Community contribution (makes students feel invested)
- SEO benefit (fresh, unique images)

**Implementation**:
```typescript
// New table: business_photos
id, business_id, user_id, image_url, caption, upvotes, created_at

// New API: POST /api/businesses/[id]/photos
// New Component: <PhotoGallery />, <PhotoUpload />
```

**Success Target**: 5+ photos per featured business; 80%+ businesses have >= 1 photo

---

## Strategic Bets (Phase 1 Extended, Weeks 5–7)

### 🎯 Community Rituals (Moderate Effort, High Long-Term Impact)

**Description**:
- Monday: "New this week" thread (auto-generated, lists new businesses)
- Wednesday: "Student tip" (spotlight a useful review or discussion)
- Friday: "Community wins" (highlight top reviewers, most helpful comments)

**Why**:
- Creates predictable reasons to return (Discord/Reddit pattern)
- Gamifies participation (top reviewers get featured)
- Reduces content burden (mostly automated/curated)

**Effort**: 5–7 days (mostly automation + email/notification setup)

---

### 🎯 Business Owner Stories ("Story-First" UX)

**Description**:
- Optional: Business owners write a short bio ("Why I opened here")
- Featured on listing (above "Hours & Contact")
- Builds emotional connection vs. pure transactional

**Why**:
- Humanization (Etsy/Indie Hackers pattern)
- Differentiation (Yelp doesn't do this at scale)
- Low barrier (one short paragraph)

**Effort**: 2–3 days

---

## Future Phases (Post-MVP)

### Phase 1+ Features (Weeks 8–12)

| Feature | Impact | Effort | Notes |
|---------|--------|--------|-------|
| **Leaderboards** | Gamification | 3–4 days | Top reviewers, most helpful |
| **Student badges** | Identity/status | 2–3 days | "Local Explorer," "Trusted Reviewer" |
| **AMA scheduling** | Business engagement | 5–7 days | Business owner can schedule Q&A slots |
| **Private Tier channels** | Tier 3 (PM) feature | 5–7 days | Discord-like channels for PMs |
| **Newsletter tie-in** | Beehiiv integration | 3–5 days | Weekly digest pulls from spotlights |
| **Notification system** | Stickiness | 4–5 days | Notify on new reviews, @mentions |

### Phase 2+ Features

| Feature | Impact | Effort | Notes |
|---------|--------|--------|-------|
| **Marketplace matching** | Network effect | 10–15 days | Students find internships/jobs at businesses |
| **Peer groups (PM tier)** | Tier 3 value | 8–10 days | PMs connect, share insights |
| **Mobile app** | Distribution | 20–30 days | Phase 2 stretch goal |
| **AI recommendations** | Discovery | 10–15 days | "People who reviewed X also like Y" |
| **AR features** | Novelty | 15–20 days | Locating businesses via camera |

---

## Implementation Priority Sequence

### Week 2–3: Foundation (Discussions + Reviews)
```
Day 1–3: Build discussion thread schema + API
Day 4–5: Build review system + schema
Day 6–7: Add UI components to business detail page
Day 8: Testing + edge cases
```

### Week 4: Spotlight + Profiles
```
Day 1–2: Build spotlight system + admin UI
Day 3–4: Build user profiles
Day 5: Add mutual connections logic
Day 6–7: Testing + mobile optimization
```

### Week 5: Polish + Launch
```
Day 1–2: Photo upload feature
Day 3: Community rituals automation (email/notifications)
Day 4–5: Performance optimization + SEO
Day 6–7: Beta testing with 10–20 users
```

---

## Effort Estimates & Dependencies

### Frontend
- **Discussions**: 4–5 days (UI + form handling)
- **Reviews**: 2–3 days (form + display)
- **Spotlights**: 3–4 days (carousel + admin interface)
- **Profiles**: 3–4 days (profile page + connections)
- **Photos**: 2–3 days (upload + gallery)
- **Total**: ~19–22 days

### Backend
- **Discussions API**: 2–3 days
- **Reviews API**: 1–2 days
- **Spotlights API**: 2–3 days
- **Profiles API**: 2–3 days
- **Photos API**: 1–2 days
- **Database migrations**: 2–3 days
- **Total**: ~12–17 days

### Combined (With Testing + Iteration)
- **Total**: 4–5 weeks (1 developer)

---

## Success Criteria (Phase 1 + Community)

### Engagement
- [ ] 20%+ of visitors leave a review in first 30 days
- [ ] 50%+ of businesses have 2+ discussion comments
- [ ] Comment-to-listing ratio >= 3:1

### Retention
- [ ] 30%+ of users return in week 2 (vs. typical directory <5%)
- [ ] 50% of engaged users return weekly
- [ ] 3+ "viral" moments (discussion/review goes viral)

### Network Effects
- [ ] 5+ businesses request AMA/office hours
- [ ] Student testimonial requests from 3+ businesses
- [ ] Word-of-mouth signups 30%+ of new users

### Business Value
- [ ] $200+/month MRR from featured listings (unchanged)
- [ ] 2+ new PR/outreach opportunities from platform attention
- [ ] 4.0+ average business rating (vs. Yelp 3.8)

---

## Go/No-Go Checkpoint (Week 4)

**Before proceeding to Phase 2**, assess:

- [ ] Engagement metrics hit 15%+ (toward 20% target)
- [ ] No major bugs in production
- [ ] 5+ positive qualitative reviews ("This feels different")
- [ ] Business owners actively using discussion/review features
- [ ] Marketing ROI positive (growth from word-of-mouth)

**If YES**: Accelerate to Phase 2 (community rituals, PM tier)  
**If NO**: Iterate on messaging/features before expanding

---

## One-Pager: Minimum Viable Community (MVP + Community)

| Feature | Dev Time | Impact | Phase |
|---------|----------|--------|-------|
| Discussions | 3–5d | HIGH | 1 |
| Reviews | 2–3d | HIGH | 1 |
| Spotlights | 3–4d | MEDIUM | 1 |
| Profiles | 3–4d | MEDIUM | 1 |
| Photos | 2–3d | MEDIUM | 1 |
| **Subtotal** | **~19–22d** | **HIGH** | **1** |
| Community rituals | 5–7d | MEDIUM | 1+ |
| Business stories | 2–3d | LOW | 1+ |
| **Total** | **~26–32d** | **HIGH** | **1–1+** |

**Critical Path**: Discussions → Reviews → Spotlights (2 weeks)  
**Nice-to-Have**: Profiles → Photos → Rituals (1–2 weeks)

---

## Build vs. Buy Consideration

**Build** (Recommended):
- Full control over community experience
- Tight integration with our directory
- Lean cost ($0 for Phase 1)
- Fast iteration

**Buy/White-Label**:
- Mighty Networks/Disco: $100–500/mo
- Pre-built community + directory
- Slower customization
- Less brand control

**Recommendation**: BUILD Phase 1 + Community. Revisit white-label if scope exceeds capacity (unlikely).

---

## Final Checklist

- [ ] All 5 quick wins planned & scoped
- [ ] Designs approved (Figma mockups)
- [ ] API contracts defined (OpenAPI spec)
- [ ] Database schema updated
- [ ] Testing strategy in place
- [ ] Performance benchmarks set
- [ ] Stakeholder alignment (business + engineering)
- [ ] Launch date committed

**Ready to build?** 🚀
