# 🎓 India Education Pathways

A mobile-first web app showing every education option available in India after Class 10 & 12 — built with Next.js 14, Tailwind CSS, and deployed on Vercel.

## Features
- All streams: Science, Commerce, Arts, ITI, Polytechnic, Defence
- 40+ undergraduate courses with specializations
- Entrance exams, top colleges, salary ranges, career roles
- Full-text search across all courses and careers
- Mobile-first responsive design

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
```

## Deploy to Vercel (via GitHub)

1. Push this folder to a new GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site is live in ~2 minutes!

## Project Structure

```
├── app/
│   ├── layout.js          # Root layout + metadata
│   ├── page.js            # Home page (after 10th / 12th sections)
│   ├── streams/page.js    # Stream chooser (Science/Commerce/Arts)
│   ├── stream/[id]/page.js # Individual stream course list
│   └── search/page.js     # Search page
├── components/
│   ├── Header.jsx         # Sticky header with back button + search icon
│   ├── BottomNav.jsx      # Bottom tab navigation
│   ├── CourseList.jsx     # Expandable course cards with spec accordions
│   └── SearchClient.jsx   # Client-side search with suggestions
└── data/
    └── pathways.js        # All education data (streams, courses, specs, careers)
```

## Adding / Editing Data

All course data lives in `data/pathways.js`. To add a new course, add an object to the relevant stream's `courses` array following this shape:

```js
{
  name: 'Course Name',
  icon: '🎓',
  dur: 'X years',
  exam: 'Entrance Exam Name',
  salary: '₹X – Y LPA',
  colleges: 'College 1 · College 2',
  desc: 'Short description of the course.',
  specs: [
    { n: 'Specialization Name', s: '₹X–Y LPA', careers: ['Career 1', 'Career 2'] },
  ],
  pg: ['PG Option 1', 'PG Option 2'],
}
```
