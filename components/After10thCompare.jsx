'use client';
import { useState } from 'react';

const COMPARISONS = [
  {
    id: 'inter-vs-poly',
    label: 'Intermediate vs Polytechnic',
    a: { name: 'Intermediate (Class 11–12)', icon: '🏫' },
    b: { name: 'Polytechnic Diploma', icon: '⚙️' },
    rows: [
      { label: 'Duration', a: '2 years', b: '3 years' },
      { label: 'Approx. Cost', a: '₹10,000–50,000/yr (govt)', b: '₹15,000–40,000/yr (govt)' },
      { label: 'Learning Style', a: 'Theory-heavy; exam pressure', b: 'Practical + theory; no JEE pressure' },
      { label: 'Further Study', a: 'All degrees open — B.Tech, MBBS, B.Com, BA', b: 'B.Tech Lateral Entry (skip to 2nd year)' },
      { label: 'Job Options', a: 'Mostly after graduation (3+ more years)', b: 'Junior Engineer / Technician after diploma' },
      { label: 'Govt Job Path', a: 'All govt exams after graduation', b: 'SSC JE, RRB JE, state JE posts' },
      { label: 'Best Suited For', a: 'Students wanting maximum degree options', b: 'Students who want engineering + early employment' },
      { label: 'Long-term Flexibility', a: 'Very high — all streams remain open', b: 'Good — B.Tech upgrade route available' },
    ],
  },
  {
    id: 'inter-vs-iti',
    label: 'Intermediate vs ITI',
    a: { name: 'Intermediate (Class 11–12)', icon: '🏫' },
    b: { name: 'ITI (Industrial Training)', icon: '🔧' },
    rows: [
      { label: 'Duration', a: '2 years', b: '1–2 years' },
      { label: 'Approx. Cost', a: '₹10,000–50,000/yr', b: '₹5,000–20,000/yr (govt ITI very affordable)' },
      { label: 'Learning Style', a: 'Theory-heavy, high exam pressure', b: 'Practical skills focus; moderate theory' },
      { label: 'Further Study', a: 'All degree options open', b: 'Polytechnic Diploma → B.Tech lateral entry' },
      { label: 'Job Options', a: 'Mostly after graduation (3–5 more years)', b: 'Trade jobs available immediately after ITI' },
      { label: 'Govt Job Path', a: 'All after graduation', b: 'Railways Group D, DRDO MTS, state technical posts' },
      { label: 'Best Suited For', a: 'Students targeting degrees and professional careers', b: 'Students wanting quick employment in a skilled trade' },
      { label: 'Long-term Flexibility', a: 'Very high', b: 'Moderate — limited without B.Tech upgrade' },
    ],
  },
  {
    id: 'poly-vs-iti',
    label: 'Polytechnic vs ITI',
    a: { name: 'Polytechnic Diploma', icon: '⚙️' },
    b: { name: 'ITI (Industrial Training)', icon: '🔧' },
    rows: [
      { label: 'Duration', a: '3 years', b: '1–2 years' },
      { label: 'Approx. Cost', a: '₹15,000–40,000/yr (govt)', b: '₹5,000–20,000/yr (govt)' },
      { label: 'Learning Style', a: 'Engineering theory + practical workshops', b: 'Practical-first; simpler theory' },
      { label: 'Further Study', a: 'B.Tech Lateral Entry (bypass JEE)', b: 'Polytechnic → B.Tech (longer route)' },
      { label: 'Job Options', a: 'Junior Engineer, Site Supervisor, CAD Technician', b: 'Electrician, Fitter, Mechanic, COPA' },
      { label: 'Govt Job Path', a: 'SSC JE, RRB JE — diploma is minimum qualification', b: 'Railways Group D, state technical MTS posts' },
      { label: 'Best Suited For', a: 'Students wanting engineering-level jobs or B.Tech later', b: 'Students wanting fastest entry into skilled trade work' },
      { label: 'Long-term Flexibility', a: 'Better — B.Tech path is smoother', b: 'Lower without Polytechnic upgrade' },
    ],
  },
  {
    id: 'open-vs-regular',
    label: 'Open Schooling vs Regular School',
    a: { name: 'Open Schooling (NIOS / TOSS)', icon: '📖' },
    b: { name: 'Regular Intermediate', icon: '🏫' },
    rows: [
      { label: 'Duration', a: 'Flexible — up to 5 years to complete', b: '2 years fixed schedule' },
      { label: 'Approx. Cost', a: 'Very low — ₹2,000–5,000 total', b: '₹10,000–50,000/yr' },
      { label: 'Daily Attendance', a: 'Not required — study from home', b: 'Required (usually 75%+ for exams)' },
      { label: 'Further Study', a: 'Same as regular 12th — all degrees recognised', b: 'All degrees open' },
      { label: 'Govt Job Recognition', a: 'Fully recognised for all govt exams', b: 'Fully recognised' },
      { label: 'Campus Experience', a: 'No campus or peer environment', b: 'Full school community and activities' },
      { label: 'Best Suited For', a: 'Students who work, have health issues, or need flexibility', b: 'Students who can attend full-time regularly' },
      { label: 'Long-term Flexibility', a: 'Same as regular 12th once completed', b: 'High — all paths open' },
    ],
  },
  {
    id: 'govtjob-vs-education',
    label: 'Govt Job Prep vs Continuing Education',
    a: { name: 'Govt Job Preparation (10th level)', icon: '🏛️' },
    b: { name: 'Continuing Education (12th / Diploma)', icon: '🎓' },
    rows: [
      { label: 'Time to Income', a: '1–3 years if selected', b: '3–5 years to degree/diploma then job' },
      { label: 'Competition', a: 'Very high — lakhs of applicants per post', b: 'Moderate (education phase; job market later)' },
      { label: 'Cost', a: 'Low — mostly prep books and coaching', b: 'Course fees apply' },
      { label: 'Starting Salary', a: '₹18,000–25,000/month (Pay Level 1–3)', b: 'Depends heavily on field and degree' },
      { label: 'Career Ceiling', a: 'Limited without further education', b: 'Higher potential — promotions tied to degree' },
      { label: 'Job Security', a: 'Very high — permanent government post', b: 'Depends on employer and sector' },
      { label: 'Best Suited For', a: 'Students who need income early + want long-term security', b: 'Students with longer career vision and family support' },
      { label: 'Can You Do Both?', a: 'Yes — study while preparing (NIOS + exam prep)', b: 'Some do govt exam prep alongside graduation' },
    ],
  },
  {
    id: 'vocational-vs-diploma',
    label: 'Vocational Courses vs Diploma',
    a: { name: 'Vocational / Skill India Courses', icon: '🛠️' },
    b: { name: 'Polytechnic Diploma', icon: '⚙️' },
    rows: [
      { label: 'Duration', a: '3 months – 1 year', b: '3 years' },
      { label: 'Approx. Cost', a: 'Low — often free under PMKVY', b: '₹15,000–40,000/yr (govt)' },
      { label: 'Depth of Training', a: 'Focused single skill (deep but narrow)', b: 'Broader engineering foundation across subjects' },
      { label: 'Certification', a: 'NSQF certificate — nationally recognised', b: 'State Board Diploma — nationally recognised' },
      { label: 'Job Options', a: 'Entry-level in specific sector (IT, beauty, retail, hospitality)', b: 'Junior Engineer, Technician, Supervisor (broader)' },
      { label: 'Govt Job Path', a: 'Limited — mostly private sector roles', b: 'SSC JE, RRB JE, state Junior Engineer posts' },
      { label: 'Best Suited For', a: 'Students wanting fastest possible entry into employment', b: 'Students wanting an engineering career path' },
      { label: 'Long-term Flexibility', a: 'Low without further education', b: 'Good — B.Tech upgrade route available' },
    ],
  },
];

export default function After10thCompare() {
  const [selected, setSelected] = useState(null);
  const active = COMPARISONS.find((c) => c.id === selected);

  return (
    <section className="mt-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-slate-200" />
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Compare Paths</p>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <p className="text-xs text-slate-500 mb-3 leading-snug">
        Not sure which path to choose? Pick a comparison below to see how two options stack up side by side.
      </p>

      {/* Comparison selector chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {COMPARISONS.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(selected === c.id ? null : c.id)}
            className={`text-[11px] font-bold rounded-full px-3 py-1.5 transition-colors border ${
              selected === c.id
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      {active && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-slate-50 border-b border-slate-100">
            <div className="px-3 py-3" />
            <div className="px-3 py-3 border-l border-slate-100">
              <p className="text-base mb-0.5">{active.a.icon}</p>
              <p className="text-[11px] font-black text-brand-700 leading-tight">{active.a.name}</p>
            </div>
            <div className="px-3 py-3 border-l border-slate-100 bg-orange-50">
              <p className="text-base mb-0.5">{active.b.icon}</p>
              <p className="text-[11px] font-black text-orange-700 leading-tight">{active.b.name}</p>
            </div>
          </div>

          {/* Rows */}
          {active.rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_1fr_1fr] border-b border-slate-50 ${i % 2 === 1 ? 'bg-slate-50/50' : ''}`}
            >
              <div className="px-3 py-2.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide leading-tight">{row.label}</p>
              </div>
              <div className="px-3 py-2.5 border-l border-slate-100">
                <p className="text-[11px] text-slate-700 leading-snug">{row.a}</p>
              </div>
              <div className="px-3 py-2.5 border-l border-slate-100">
                <p className="text-[11px] text-slate-700 leading-snug">{row.b}</p>
              </div>
            </div>
          ))}

          <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
            <p className="text-[11px] text-amber-800 leading-snug">
              💡 This comparison is a general guide. Actual fees, job availability, and course quality vary by college and state. Talk to a teacher, career counsellor, or mentor before making your final decision.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
