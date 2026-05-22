import Link from 'next/link';
import { STREAMS } from '@/data/pathways';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function HomePage() {
  const after10Direct = STREAMS.filter((s) => s.stage === '10th');
  const after12Streams = STREAMS.filter((s) => s.stage === '12th' && s.id !== 'defence');
  const defence = STREAMS.find((s) => s.id === 'defence');

  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col shadow-xl">
      <Header />

      <main className="flex-1 px-4 pt-4 pb-28 space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-indigo-900 p-5 text-white">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full bg-indigo-500/10" />
          <p className="text-3xl mb-2 relative">🎓</p>
          <h1 className="text-xl font-black relative leading-tight">
            India Education Pathways
          </h1>
          <p className="text-sm text-slate-300 mt-1 relative">
            Every option after Class 10 & 12 — courses, exams, salaries & careers
          </p>
          <div className="flex flex-wrap gap-2 mt-3 relative">
            {['500+ Courses', 'Entrance Exams', 'Salaries', 'Careers'].map((pill) => (
              <span key={pill} className="text-xs font-semibold bg-white/15 border border-white/20 px-3 py-1 rounded-full">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[['6', 'Streams'], ['40+', 'UG Courses'], ['100+', 'Specializations']].map(([num, label]) => (
            <div key={label} className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-2xl font-black text-indigo-600">{num}</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* ── SECTION: After Class 10 Direct ── */}
        <section>
          <div className="flex items-center gap-2 mb-3 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5">
            <span className="text-xl">🏫</span>
            <div>
              <p className="text-sm font-bold text-orange-800">Just passed Class 10?</p>
              <p className="text-xs text-orange-600 mt-0.5">These start directly — no 12th needed</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {after10Direct.map((stream) => (
              <StreamTile key={stream.id} stream={stream} />
            ))}
            <Link
              href="/streams"
              className="col-span-2 flex items-center gap-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-2xl p-4 active:scale-[0.98] transition-transform"
            >
              <span className="text-3xl">📚</span>
              <div>
                <p className="font-black text-base">Continue to 11th & 12th</p>
                <p className="text-xs text-slate-300 mt-0.5">Choose Science / Commerce / Arts → then college</p>
              </div>
              <span className="ml-auto text-slate-400 text-xl">›</span>
            </Link>
          </div>
        </section>

        {/* ── SECTION: After Class 12 ── */}
        <section>
          <div className="flex items-center gap-2 mb-3 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
            <span className="text-xl">🎓</span>
            <div>
              <p className="text-sm font-bold text-blue-800">Completed Class 12?</p>
              <p className="text-xs text-blue-600 mt-0.5">Choose your stream to see all UG options</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {after12Streams.map((stream) => (
              <StreamTile key={stream.id} stream={stream} />
            ))}
          </div>
        </section>

        {/* ── SECTION: Defence ── */}
        {defence && (
          <section>
            <div className="flex items-center gap-2 mb-3 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
              <span className="text-xl">🎖️</span>
              <div>
                <p className="text-sm font-bold text-green-800">Defence / NDA</p>
                <p className="text-xs text-green-600 mt-0.5">NDA applies in 12th · CDS after graduation</p>
              </div>
            </div>
            <Link
              href={`/stream/${defence.id}`}
              className="flex items-center gap-3 text-white rounded-2xl p-4 active:scale-[0.98] transition-transform"
              style={{ background: `linear-gradient(135deg, ${defence.color}, ${defence.colorLight})` }}
            >
              <span className="text-3xl">{defence.icon}</span>
              <div>
                <p className="font-black text-base">{defence.name} · Army · Navy · Air Force · CAPF</p>
                <p className="text-xs text-white/80 mt-0.5">NDA (after 12th) · CDS (after graduation) · AFCAT · TES</p>
              </div>
              <span className="ml-auto text-white/60 text-xl">›</span>
            </Link>
          </section>
        )}

        {/* ── SECTION: Quick Tools ── */}
        <section>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick tools</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { href: '/guide', icon: '🧭', label: 'Confused?', sub: 'Guide + quiz' },
              { href: '/compare', icon: '⚖️', label: 'Compare', sub: 'BCA vs B.Tech…' },
              { href: '/dual', icon: '🔗', label: 'Dual Courses', sub: 'Integrated degrees' },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col gap-1.5 active:bg-slate-50 transition-colors">
                <span className="text-2xl">{tool.icon}</span>
                <p className="font-black text-xs text-slate-800 leading-tight">{tool.label}</p>
                <p className="text-[10px] text-slate-400 leading-tight">{tool.sub}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SECTION: Quick Search Chips ── */}
        <section>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {[['doctor', '🏥'], ['computer', '💻'], ['teacher', '🏫'], ['army', '🎖️'], ['design', '🎨'], ['finance', '💰'], ['law', '⚖️']].map(([q, ico]) => (
              <Link key={q} href={`/search?q=${q}`} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 active:bg-slate-100 transition-colors shadow-sm">
                <span>{ico}</span>{q}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav active="home" />
    </div>
  );
}

function StreamTile({ stream }) {
  return (
    <Link
      href={`/stream/${stream.id}`}
      className="relative overflow-hidden text-white rounded-2xl p-4 min-h-[90px] flex flex-col justify-between active:scale-[0.97] transition-transform shadow-md"
      style={{ background: `linear-gradient(135deg, ${stream.color}, ${stream.colorLight})` }}
    >
      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
      <span className="text-3xl">{stream.icon}</span>
      <div>
        <p className="font-black text-sm leading-tight">{stream.name}</p>
        <p className="text-xs text-white/75 mt-0.5 leading-tight">{stream.sub}</p>
      </div>
      <span className="absolute top-2.5 right-2.5 text-xs font-bold bg-black/20 rounded-full px-2 py-0.5">
        {stream.courses.length} paths
      </span>
    </Link>
  );
}
