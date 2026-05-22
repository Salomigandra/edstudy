import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'Dual / Integrated Courses — India Education Pathways',
  description: 'All integrated and dual degree options in India — BA LLB, B.Tech+M.Tech, BS-MS, BBA+MBA and more.',
};

const DUAL = [
  {
    name: 'BA LLB / BBA LLB / B.Com LLB',
    years: '5 years',
    combines: 'Humanities / Management / Commerce + Law',
    why: 'Best for students who are clear about a legal career right after Class 12. Saves 1 year vs doing a degree then LLB.',
    exam: 'CLAT · AILET · LSAT India · State Law CETs',
    icon: '⚖️',
  },
  {
    name: 'B.Sc B.Ed / BA B.Ed / B.Com B.Ed',
    years: '4 years',
    combines: 'Subject degree + Teacher training',
    why: 'Best for students sure about teaching. Saves time and integrates both degrees. NCET or state entrance required.',
    exam: 'NCET · ITEP · State B.Ed CET',
    icon: '🏫',
  },
  {
    name: 'B.Tech + M.Tech Integrated (Dual Degree)',
    years: '5 years',
    combines: 'Engineering UG + PG specialization',
    why: 'Available at IITs and some NITs. Better for research, deep specialization or academia. Saves 1 year vs separate.',
    exam: 'JEE Advanced (IIT Dual Degree)',
    icon: '⚙️',
  },
  {
    name: 'BS-MS Integrated (IISER / IISc style)',
    years: '5 years',
    combines: 'Science UG + Research-oriented PG',
    why: 'Excellent for research-minded science students. IISER is world-class for science + maths research careers.',
    exam: 'IISER Aptitude Test · IIT JAM · KVPY',
    icon: '🔭',
  },
  {
    name: 'BBA + MBA Integrated',
    years: '5 years',
    combines: 'Business management UG + MBA',
    why: 'Good for students focused on corporate or business leadership early. Check if college is AICTE/UGC recognized.',
    exam: 'College entrance / CUET / NPAT / SAT',
    icon: '📊',
  },
  {
    name: 'BCA + MCA Integrated',
    years: '5 years',
    combines: 'Computer applications UG + PG',
    why: 'For IT-focused students. Better than separate BCA+MCA if the college is reputed and placement strong.',
    exam: 'College entrance / IPU CET / CUET',
    icon: '💻',
  },
  {
    name: 'B.Pharm + M.Pharm Integrated',
    years: '5–6 years',
    combines: 'Pharmacy UG + PG',
    why: 'For students targeting pharmaceutical industry, drug discovery or regulatory careers.',
    exam: 'State Pharma entrance / NEET (some colleges)',
    icon: '💊',
  },
  {
    name: 'B.Plan / B.Arch (Planning focus)',
    years: '5 years',
    combines: 'Architecture / Urban Planning professional degree',
    why: 'For students who like cities, infrastructure and smart city design. COA/UGC recognized programs.',
    exam: 'NATA · JEE Paper 2 · Institute exams',
    icon: '🏗️',
  },
  {
    name: 'Two degrees simultaneously (UGC rules)',
    years: 'Varies',
    combines: 'One physical + one online/ODL degree',
    why: 'UGC now allows pursuing two full degrees at the same time if one is online/ODL mode and the other is regular. Useful for adding a skill-complementary degree.',
    exam: 'Check UGC 2022 notification + institution rules',
    icon: '🔗',
  },
];

export default function DualPage() {
  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col shadow-xl">
      <Header backHref="/" title="🔗 Dual & Integrated Courses" subtitle="Save time with combined degrees" />

      <main className="flex-1 px-4 pt-4 pb-28 space-y-4">
        {/* Banner */}
        <div className="bg-slate-800 text-white rounded-2xl p-4">
          <p className="font-black text-lg mb-1">Integrated Degrees in India</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            These combine two qualifications into one, typically saving 1 year and offering a focused path. Only choose if you are sure about the field.
          </p>
        </div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 leading-relaxed">
          <strong>Before choosing dual/integrated:</strong> Confirm the college is recognized by UGC/AICTE/BCI, check placement records, and avoid if you are not yet sure about the field.
        </div>

        {/* When to choose */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <p className="text-xs font-black text-green-800 mb-1.5">✅ Choose dual when</p>
            <ul className="text-xs text-green-700 space-y-1 leading-relaxed">
              <li>• You are clear about the field</li>
              <li>• You want to save time</li>
              <li>• College is reputed</li>
              <li>• Placements are strong</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-xs font-black text-red-800 mb-1.5">⚠️ Avoid dual when</p>
            <ul className="text-xs text-red-700 space-y-1 leading-relaxed">
              <li>• You are unsure about field</li>
              <li>• College is weak/unrecognized</li>
              <li>• You want flexibility later</li>
              <li>• Peer says &quot;it&apos;s easier&quot;</li>
            </ul>
          </div>
        </div>

        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">All integrated / dual options</p>

        {/* Cards */}
        <div className="space-y-3">
          {DUAL.map((d) => (
            <div key={d.name} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{d.icon}</span>
                <div className="flex-1">
                  <p className="font-black text-slate-800 text-sm leading-tight">{d.name}</p>
                  <span className="inline-block mt-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-full px-2.5 py-0.5">
                    {d.years}
                  </span>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="bg-slate-50 rounded-xl p-2.5">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">Combines</p>
                  <p className="text-xs text-slate-700 font-semibold">{d.combines}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{d.why}</p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-2">
                  <p className="text-[9px] font-black text-blue-500 uppercase tracking-wider mb-0.5">Entrance exam</p>
                  <p className="text-xs text-blue-700 font-semibold">{d.exam}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
