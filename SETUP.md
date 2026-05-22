# India Education Pathways — Setup Guide

## Prerequisites
- Node.js 18+ installed
- A [Supabase](https://supabase.com) account (free)
- A [Google reCAPTCHA v3](https://www.google.com/recaptcha/admin) site key

---

## 1. Clone & Install

```bash
cd ~/Downloads/india-edu-pathways
npm install
```

---

## 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New project
2. Note your **Project URL** and **anon/public key** from Settings → API
3. Also copy the **service_role key** (keep this secret!)
4. In Supabase Dashboard → **SQL Editor**, paste and run the contents of `schema.sql`

---

## 3. Get reCAPTCHA v3 Keys

1. Go to [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Create a new site → Choose **reCAPTCHA v3**
3. Add your domains: `localhost` and your production domain (e.g. `edstudy.org`)
4. Copy the **Site Key** and **Secret Key**

---

## 4. Set Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 6. Supabase Email Settings (for email confirmation)

1. Supabase Dashboard → Authentication → URL Configuration
2. Set **Site URL** to your production URL (e.g. `https://edstudy.org`)
3. Add `https://edstudy.org/**` to **Redirect URLs**
4. Also add `http://localhost:3000/**` for local dev

---

## 7. Deploy to Vercel

### Push to GitHub first:
```bash
git add .
git commit -m "Add auth, saved paths, guide, compare pages"
git push origin main
```

### Deploy to Vercel:
1. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
2. Framework: **Next.js** (auto-detected)
3. Add environment variables in Vercel → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://your-vercel-domain.vercel.app`
4. Click Deploy

---

## 8. Update locally after changes

```bash
cd ~/Downloads/india-edu-pathways

# Make your changes, then:
git add .
git commit -m "Your change description"
git push origin main

# Vercel auto-deploys on every push to main
```

---

## File Structure

```
app/
  page.js          — Home page
  guide/           — Confused student guide + quiz
  dual/            — Dual/integrated courses
  compare/         — Course comparison tables
  saved/           — Saved paths (login required)
  search/          — Search all courses
  streams/         — 11th/12th stream picker
  stream/[id]/     — Individual stream page
  auth/
    login/         — Login with reCAPTCHA
    register/      — Register with reCAPTCHA
    callback/      — Email verification callback
  api/
    captcha/       — Verify reCAPTCHA token server-side
    paths/         — Save / get / delete saved paths

components/
  Header.jsx       — Sticky header with auth indicator
  BottomNav.jsx    — 5-tab mobile navigation
  CourseList.jsx   — Expandable course cards with save button
  GuideClient.jsx  — Interactive guide + quiz
  SavedPathsClient.jsx — Saved paths list with delete/share

lib/
  supabase.js      — Browser Supabase client
  supabaseServer.js — Server Supabase client

schema.sql         — Supabase database schema (run once)
middleware.js      — Protect /saved route
```

---

## Security Notes

- reCAPTCHA v3 runs invisibly on login & register — scores below 0.5 are blocked
- All API routes verify the Supabase session before any database operation
- Row Level Security (RLS) is enabled — users can only see/edit their own data
- Service role key is server-only (never in NEXT_PUBLIC_*)
- Passwords are hashed by Supabase Auth (bcrypt)
- Email verification required before login
