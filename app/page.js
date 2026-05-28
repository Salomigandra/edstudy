import Link from 'next/link';
import { createPublicClient } from '@/lib/supabaseServer';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

const STAGE_META = {
  after_10th: {
    emoji: '🏫',
    hint: 'ITI · Polytechnic · Intermediate streams',
    gradient: 'from-orange-500 to-rose-500',
    light: 'bg-orange-50 border-orange-200 text-orange-800',
  },
  after_12th: {
    emoji: '🎓',
    hint: 'B.Tech · MBBS · B.Com · BA · Law',
    gradient: 'from-brand-600 to-brand-400',
    light: 'bg-brand-50 border-brand-200 text-brand-800',
  },
  after_ug: {
    emoji: '🎯',
    hint: 'MBA · M.Tech · MS Abroad · UPSC',
    gradient: 'from-emerald-600 to-teal-500',
    light: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  vocational: {
    emoji: '🔧',
    hint: 'Skill India · Short Courses · Trades',
    gradient: 'from-slate-700 to-slate-500',
    light: 'bg-slate-50 border-slate-200 text-slate-700',
  },
};

const POPULAR_SEARCHES = [
  ['doctor', '🏥'],
  ['computer science', '💻'],
  ['army / NDA', '🎖️'],
  ['CA / finance', '💰'],
  ['design', '🎨'],
  ['law', '⚖️'],
  ['nursing', '💉'],
];

export default async function HomePage() {
  const supabase = createPublicClient();

  const [{ data: stages }, { data: streams }, { data: courseCount }] = await Promise.all([
    supabase.from('education_stages').select('id, slug, label, sort_order').order('sort_order'),
    supabase
      .from('streams')
      .select('id, slug, name, icon, color, color_light, stage_id, description, sort_order')
      .order('sort_order'),
    supabase.from('courses').select('id', { count: 'exact', head: true }),
  ]);

  const streamsByStage = {};
  (streams ?? []).forEach((s) => {
    if (!streamsByStage[s.stage_id]) streamsByStage[s.stage_id] = [];
    streamsByStage[s.stage_id].push(s);
  });

  const after12Stage = (stages ?? []).find((s) => s.slug === 'after_12th');
  const after12Streams = after12Stage ? (streamsByStage[after12Stage.id] ?? []) : [];

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
      <Header />

      <main className="flex-1 px-4 lg:px-8 pt-5 pb-28 lg:pb-10 space-y-7 lg:max-w-3xl lg:mx-auto lg:w-full">

        {/* ── Hero ── */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-6 text-white shadow-lg">
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-white/5" />
          <p className="text-[11px] font-bold tracking-widest uppercase text-brand-200 mb-1">EdStudy</p>
          <h1 className="text-[22px] font-black leading-snug relative">
            Discover your path<br />after Class 10 or 12
          </h1>
          <p className="text-sm text-white/80 mt-2 relative max-w-[260px]">
            Courses, entrance exams, salaries & careers — all in one place.
          </p>
          <div className="flex gap-2 mt-4 flex-wrap relative">
            {[
              [`${courseCount ?? '40'}+ Courses`, null],
              ['Salaries', null],
              ['Exams', null],
            ].map(([pill]) => (
              <span key={pill} className="text-[11px] font-bold bg-white/20 border border-white/25 rounded-full px-3 py-1">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* ── Choose Your Stage ── */}
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Where are you now?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(stages ?? []).map((stage) => {
              const meta = STAGE_META[stage.slug] ?? STAGE_META.after_12th;
              const count = (streamsByStage[stage.id] ?? []).length;
              return (
                <Link
                  key={stage.id}
                  href={`/explore?stage=${stage.slug}`}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${meta.gradient} p-4 text-white min-h-[100px] flex flex-col justify-between active:scale-[0.97] transition-transform shadow-md`}
                >
                  <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-white/10" />
                  <span className="text-3xl">{meta.emoji}</span>
                  <div className="relative">
                    <p className="font-black text-sm leading-tight">{stage.label}</p>
                    <p className="text-[10px] text-white/75 mt-0.5 leading-tight">{meta.hint}</p>
                  </div>
                  {count > 0 && (
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-black/20 rounded-full px-2 py-0.5">
                      {count} streams
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Featured After-12th Streams ── */}
        {after12Streams.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                After Class 12
              </p>
              <Link href="/explore?stage=after_12th" className="text-xs font-bold text-brand-600">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {after12Streams.slice(0, 6).map((stream) => (
                <Link
                  key={stream.id}
                  href={`/stream/${stream.slug}`}
                  className="rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center active:scale-[0.97] transition-transform shadow-sm border border-white"
                  style={{ background: stream.color_light ?? '#f3efff' }}
                >
                  <span className="text-2xl">{stream.icon}</span>
                  <p
                    className="text-[11px] font-black leading-tight"
                    style={{ color: stream.color ?? '#6c2ee8' }}
                  >
                    {stream.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Quiz CTA ── */}
        <Link
          href="/quiz"
          className="flex items-center gap-4 bg-white rounded-2xl px-4 py-4 border border-brand-100 shadow-sm active:bg-brand-50 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm text-brand-950">Not sure what to pick?</p>
            <p className="text-xs text-slate-500 mt-0.5">Take our 5-question quiz — get personalised stream suggestions</p>
          </div>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-brand-400 flex-shrink-0">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </Link>

        {/* ── Popular Searches ── */}
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Popular searches
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map(([q, ico]) => (
              <Link
                key={q}
                href={`/search?q=${encodeURIComponent(q)}`}
                className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 active:bg-slate-50 transition-colors shadow-sm"
              >
                <span>{ico}</span>
                {q}
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* ── Legal footer ── */}
      <footer className="px-4 py-4 pb-24 lg:pb-6 text-center lg:max-w-3xl lg:mx-auto lg:w-full">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/legal/terms" className="text-[11px] text-slate-400 hover:text-brand-600 transition-colors">Terms</Link>
          <span className="text-slate-300 text-[11px]">·</span>
          <Link href="/legal/privacy" className="text-[11px] text-slate-400 hover:text-brand-600 transition-colors">Privacy</Link>
          <span className="text-slate-300 text-[11px]">·</span>
          <Link href="/legal/disclaimer" className="text-[11px] text-slate-400 hover:text-brand-600 transition-colors">Disclaimer</Link>
        </div>
        <p className="text-[10px] text-slate-300 mt-2">© 2026 EdStudy. All rights reserved.</p>
      </footer>

      <BottomNav />
    </div>
  );
}
