import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'Compare Courses — India Education Pathways',
  description: 'Side-by-side comparison of common course doubts: B.Tech vs BCA, BBA vs B.Com, MBBS vs Allied Health, and more.',
};

const COMPARISONS = [
  {
    title: 'B.Tech vs BCA / B.Sc CS',
    icon: '💻',
    rows: [
      ['Entry', 'JEE Main/Advanced required for top colleges', 'Merit / CUET / state entrance'],
      ['Duration', '4 years', '3 years (BCA/B.Sc)'],
      ['Depth', 'Full engineering + CS — stronger for core tech companies', 'CS/IT focused — good with skills + portfolio'],
      ['Cost', '₹4–15 LPA for private; IIT/NIT is heavily subsidized', 'Generally lower cost'],
      ['Top PG', 'M.Tech (GATE) → IIT; MBA → IIM; MS abroad', 'MCA (NIMCET); M.Sc CS; MBA Tech'],
      ['Best for', 'Students ready to work hard for JEE, want top tech placement', 'Students who like computers but want easier entry or shorter path'],
    ],
  },
  {
    title: 'B.Sc vs B.Tech',
    icon: '🔬',
    rows: [
      ['Focus', 'Pure science — research, theory, labs, analytics', 'Engineering — building, making, applying technology'],
      ['Entry', 'CUET / JAM / state merit — generally less competitive', 'JEE / state CETs — competitive'],
      ['Duration', '3 years (+ M.Sc 2 years)', '4 years'],
      ['Jobs', 'Research, data analytics, pharma, teaching, UPSC', 'Engineering, IT, product, manufacturing'],
      ['PG options', 'M.Sc → PhD; IIT JAM; GATE possible in some', 'M.Tech; MBA; MS abroad'],
      ['Best for', 'Students who love science itself — biology, physics, chemistry', 'Students who want to build, code or work in tech industry'],
    ],
  },
  {
    title: 'BBA vs B.Com',
    icon: '💰',
    rows: [
      ['Focus', 'Management, business strategy, marketing, HR, operations', 'Accounting, finance, tax, commerce and professional exams'],
      ['Entry', 'NPAT / SET / IPU CET / college entrance', 'CUET / university entrance / merit'],
      ['CA/CMA path', 'Possible but not the natural fit', 'Very natural combination — commerce depth matches well'],
      ['MBA path', 'Natural step — management to management PG', 'Possible — requires bridging for pure management'],
      ['Jobs', 'Business analyst, marketing associate, startup, sales', 'Accountant, tax consultant, bank officer, CA firm'],
      ['Best for', 'Students who want management, marketing, startups and leadership', 'Students who like numbers, accounts, tax, compliance and finance'],
    ],
  },
  {
    title: 'MBBS vs Allied Health',
    icon: '🏥',
    rows: [
      ['Entry', 'NEET-UG mandatory — very competitive (top 1–3% get good seats)', 'State allied health CET / NEET for some / university entrance'],
      ['Duration', '5.5 years + 1 yr internship', '2–4 years depending on course'],
      ['Scope', 'Doctor — diagnosis, treatment, prescriptions', 'Specific healthcare roles (physio, pharmacy, nursing, lab tech)'],
      ['Cost', 'Govt college very affordable; private ₹50L–1Cr+', 'Generally lower cost'],
      ['Salary', '₹10–80 LPA+ with specialization', '₹3–15 LPA India; ₹30–50+ LPA abroad (nursing, PT)'],
      ['Best for', 'Students who score high in NEET and genuinely want to be doctors', 'Students who want healthcare careers without the NEET pressure'],
    ],
  },
  {
    title: 'ITI vs Polytechnic',
    icon: '🔧',
    rows: [
      ['After', 'Class 10 — 1–2 year trade certificate', 'Class 10 — 3 year engineering diploma'],
      ['Depth', 'Specific trade skill (electrician, fitter, COPA, mechanic)', 'Broader engineering foundation — closer to B.Tech first 2 years'],
      ['Job speed', 'Very fast — ready in 1–2 years', 'Moderate — 3 years but stronger base'],
      ['Further study', 'Apprenticeship, NSDC certs, Polytechnic lateral entry possible', 'B.Tech Lateral Entry (2nd year) — saves 1 year of B.Tech'],
      ['Govt jobs', 'Trade-based Govt posts', 'SSC JE / RRB JE / AMIE route possible'],
      ['Best for', 'Students who want a specific trade skill and early employment', 'Students who want engineering foundation with option to do B.Tech later'],
    ],
  },
  {
    title: 'B.Ed vs Integrated B.Ed',
    icon: '🏫',
    rows: [
      ['When', 'After graduation (any degree) — 2 years', 'After Class 12 — 4 years (BA/B.Sc/B.Com B.Ed)'],
      ['Entry', 'State B.Ed CET / university entrance', 'NCET (National Common Entrance Test) / ITEP'],
      ['Time saving', 'No — you spend 3+2 = 5 years total', 'Yes — only 4 years total (saves 1 year)'],
      ['Flexibility', 'High — choose any subject degree first', 'Lower — committed to teaching from Class 12'],
      ['Both lead to', 'CTET / State TET eligibility, school teacher roles', 'CTET / State TET eligibility, school teacher roles'],
      ['Best for', 'Students unsure about teaching, want to explore first', 'Students who are sure they want to teach — saves time'],
    ],
  },
  {
    title: 'BA LLB vs LLB after Graduation',
    icon: '⚖️',
    rows: [
      ['Duration', '5 years integrated after Class 12', '3 years after any graduation — total ~6 years'],
      ['Entry', 'CLAT · AILET · LSAT India — competitive', 'State bar entrance — varies'],
      ['Specializations', 'Corporate, criminal, constitutional, IP, tax law', 'Same — same legal career options'],
      ['Time saving', 'Yes — 1 year shorter total path', 'Allows a different degree first (may be useful)'],
      ['Best for', 'Students sure about law right after 12th', 'Students who want to try another field first, or law as a second career'],
    ],
  },
];

export default function ComparePage() {
  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none">
      <Header backHref="/" title="⚖️ Compare Courses" subtitle="Clear answers to common doubts" />

      <main className="flex-1 px-4 pt-4 pb-28 lg:pb-10 space-y-4">
        <div className="bg-slate-800 text-white rounded-2xl p-4">
          <p className="font-black text-lg mb-1">Common Course Doubts</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            These comparisons explain differences clearly — but they do not decide for you. The right choice depends on interest, budget, exam readiness and long-term goals.
          </p>
        </div>

        {COMPARISONS.map((c) => (
          <div key={c.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
              <span className="text-xl">{c.icon}</span>
              <p className="font-black text-slate-800 text-sm">{c.title}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="text-left px-3 py-2 font-bold text-slate-500 w-1/4">What to check</th>
                    <th className="text-left px-3 py-2 font-bold text-indigo-700">
                      {c.title.split(' vs ')[0].trim()}
                    </th>
                    <th className="text-left px-3 py-2 font-bold text-slate-500">
                      {c.title.split(' vs ')[1]?.trim() || 'Alternative'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map(([label, a, b], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-3 py-2.5 font-bold text-slate-500 align-top border-b border-slate-100">{label}</td>
                      <td className="px-3 py-2.5 text-slate-700 leading-relaxed align-top border-b border-slate-100">{a}</td>
                      <td className="px-3 py-2.5 text-slate-700 leading-relaxed align-top border-b border-slate-100">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 leading-relaxed">
          <strong>Remember:</strong> These comparisons are general. Always check specific college placement records, costs and cut-offs before choosing.
        </div>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
