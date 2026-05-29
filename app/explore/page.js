import Link from 'next/link';
import { createPublicClient } from '@/lib/supabaseServer';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import After10thCompare from '@/components/After10thCompare';
import After10thQuiz from '@/components/After10thQuiz';
import CollapsibleSection from '@/components/CollapsibleSection';
import { govtJobsAfter10, openEducationOptions, continuationNote } from '@/data/streamContent';

const STAGE_META = {
  after_10th: {
    emoji: '🏫',
    hint: 'ITI · Polytechnic · Intermediate streams',
    gradient: 'from-orange-500 to-rose-500',
    tagBg: 'bg-orange-100 text-orange-700',
  },
  after_12th: {
    emoji: '🎓',
    hint: 'B.Tech · MBBS · B.Com · BA · Law',
    gradient: 'from-brand-600 to-brand-400',
    tagBg: 'bg-brand-100 text-brand-700',
  },
  after_ug: {
    emoji: '🎯',
    hint: 'MBA · M.Tech · MS Abroad · UPSC',
    gradient: 'from-emerald-600 to-teal-500',
    tagBg: 'bg-emerald-100 text-emerald-700',
  },
  vocational: {
    emoji: '🔧',
    hint: 'Skill India · Short Courses · Trades',
    gradient: 'from-slate-700 to-slate-500',
    tagBg: 'bg-slate-100 text-slate-600',
  },
};

export async function generateMetadata({ searchParams }) {
  const stage = searchParams?.stage;
  if (stage) return { title: `Explore ${stage.replace(/_/g, ' ')}` };
  return { title: 'Explore Education Paths' };
}

export default async function ExplorePage({ searchParams }) {
  const stageSlug = searchParams?.stage;
  const supabase = createPublicClient();

  if (stageSlug) {
    const [{ data: stage }, { data: allStages }] = await Promise.all([
      supabase.from('education_stages').select('*').eq('slug', stageSlug).single(),
      supabase.from('education_stages').select('id, slug, label').order('sort_order'),
    ]);

    const { data: streams } = stage
      ? await supabase
          .from('streams')
          .select('id, slug, name, icon, color, color_light, color_bg, color_text, description, alt_name')
          .eq('stage_id', stage.id)
          .order('sort_order')
      : { data: [] };

    const meta = STAGE_META[stageSlug] ?? STAGE_META.after_12th;

    return (
      <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
        <Header backHref="/explore" title={`${meta.emoji} ${stage?.label ?? 'Streams'}`} />

        <main className="flex-1 px-4 lg:px-8 pt-5 pb-28 lg:pb-10 space-y-5 lg:max-w-3xl lg:mx-auto lg:w-full">
          {/* Stage tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {(allStages ?? []).map((s) => {
              const m = STAGE_META[s.slug] ?? STAGE_META.after_12th;
              const isActive = s.slug === stageSlug;
              return (
                <Link
                  key={s.id}
                  href={`/explore?stage=${s.slug}`}
                  className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-brand-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  <span>{m.emoji}</span>
                  {s.label}
                </Link>
              );
            })}
          </div>

          {/* After-10th header context */}
          {stageSlug === 'after_10th' && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 flex items-start gap-2.5">
              <span className="text-lg flex-shrink-0 mt-0.5">🏫</span>
              <p className="text-xs text-orange-900 leading-relaxed">
                After Class 10, you have more options than most people realise. Choose a stream below to see everything that path leads to — subjects, entrance exams, degrees, careers, and government job possibilities.
              </p>
            </div>
          )}

          {/* Streams grid */}
          {(streams ?? []).length === 0 ? (
            <div className="text-center py-20 px-6">
              <p className="text-5xl mb-4">🛤️</p>
              <p className="font-black text-xl text-slate-700 mb-2">Coming Soon</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                We're building out this section.<br/>Check back soon — it's going to be worth the wait.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {(streams ?? []).map((stream) => (
                <Link
                  key={stream.id}
                  href={`/stream/${stream.slug}`}
                  className="relative overflow-hidden rounded-2xl p-4 min-h-[110px] flex flex-col justify-between active:scale-[0.97] transition-transform shadow-md text-white"
                  style={{
                    background: stream.color && stream.color_light
                      ? `linear-gradient(135deg, ${stream.color}, ${stream.color_light})`
                      : 'linear-gradient(135deg, #6c2ee8, #9468ff)',
                  }}
                >
                  <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-white/10" />
                  <span className="text-3xl">{stream.icon ?? '📚'}</span>
                  <div className="relative">
                    <p className="font-black text-sm leading-tight">{stream.name}</p>
                    {stream.alt_name && (
                      <p className="text-[10px] text-white/70 mt-0.5">{stream.alt_name}</p>
                    )}
                    {stream.description && !stream.alt_name && (
                      <p className="text-[10px] text-white/70 mt-0.5 leading-tight line-clamp-2">
                        {stream.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {/* ── Government Jobs After 10th (collapsible) ── */}
          {stageSlug === 'after_10th' && (
            <CollapsibleSection
              icon="🏛️"
              title="Government Jobs After Class 10"
              subtitle="Railway, Army, Police, SSC & more — no degree needed"
              accentClass="bg-blue-50 border-blue-200"
              iconBg="bg-blue-100"
            >
              <p className="text-xs text-blue-800 leading-snug -mt-1 mb-1">
                You don't have to wait for a degree to start a government career. These positions are open to Class 10 pass candidates.
              </p>
              {govtJobsAfter10.map((job) => (
                <div key={job.title} className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl flex-shrink-0">{job.icon}</span>
                    <div>
                      <p className="font-black text-sm text-slate-800 leading-tight">{job.title}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-full px-2 py-0.5">{job.salary}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <p><span className="font-bold text-slate-600">Eligibility:</span> <span className="text-slate-500">{job.eligibility}</span></p>
                    <p><span className="font-bold text-slate-600">Age limit:</span> <span className="text-slate-500">{job.age}</span></p>
                    <p><span className="font-bold text-slate-600">Selection:</span> <span className="text-slate-500">{job.process}</span></p>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2 leading-snug border-t border-slate-100 pt-2">{job.note}</p>
                </div>
              ))}
            </CollapsibleSection>
          )}

          {/* ── Open Education Options (collapsible) ── */}
          {stageSlug === 'after_10th' && (
            <CollapsibleSection
              icon="📖"
              title="Open & Flexible Education"
              subtitle="NIOS, TOSS, IGNOU — study from home, at your own pace"
              accentClass="bg-emerald-50 border-emerald-200"
              iconBg="bg-emerald-100"
            >
              <p className="text-xs text-emerald-800 leading-snug -mt-1 mb-1">
                Can't attend regular school right now? These options let you continue your education from home, while working, or on any schedule.
              </p>
              {openEducationOptions.map((opt) => (
                <div key={opt.name} className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                    <p className="font-black text-sm text-slate-800 leading-tight">{opt.name}</p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{opt.what}</p>
                  <div className="space-y-1">
                    {opt.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                        <p className="text-[11px] text-slate-600 leading-snug">{b}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-brand-700 font-semibold mt-2 border-t border-slate-100 pt-2">{opt.note}</p>
                </div>
              ))}
            </CollapsibleSection>
          )}

          {/* ── Compare Paths ── */}
          {stageSlug === 'after_10th' && <After10thCompare />}

          {/* ── Quiz for confused students ── */}
          {stageSlug === 'after_10th' && <After10thQuiz />}

          {/* ── Continuation note ── */}
          {stageSlug === 'after_10th' && (
            <section className="mt-2">
              <div className="bg-gradient-to-br from-brand-600 to-brand-400 rounded-2xl px-5 py-5 text-white shadow-md">
                <p className="text-base font-black leading-tight mb-3">💛 {continuationNote.heading}</p>
                <p className="text-sm text-white/85 leading-relaxed">{continuationNote.message}</p>
              </div>
            </section>
          )}

        </main>

        <BottomNav />
      </div>
    );
  }

  // ── No stage selected: show all 4 stages ──────────────────────────────
  const [{ data: stages }, { data: streamCounts }] = await Promise.all([
    supabase.from('education_stages').select('*').order('sort_order'),
    supabase.from('streams').select('id, stage_id'),
  ]);

  const countByStage = {};
  (streamCounts ?? []).forEach((s) => {
    countByStage[s.stage_id] = (countByStage[s.stage_id] ?? 0) + 1;
  });

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
      <Header title="Explore Paths" subtitle="Pick your current stage" />

      <main className="flex-1 px-4 lg:px-8 pt-5 pb-28 lg:pb-10 space-y-5 lg:max-w-3xl lg:mx-auto lg:w-full">
        <p className="text-sm text-slate-500">
          Select where you are right now to see all your options.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {(stages ?? []).map((stage) => {
            const meta = STAGE_META[stage.slug] ?? STAGE_META.after_12th;
            const count = countByStage[stage.id] ?? 0;
            return (
              <Link
                key={stage.id}
                href={`/explore?stage=${stage.slug}`}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${meta.gradient} p-5 text-white flex items-center gap-4 active:scale-[0.98] transition-transform shadow-md ${count === 0 ? 'opacity-70' : ''}`}
              >
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <span className="text-5xl flex-shrink-0">{meta.emoji}</span>
                <div className="flex-1 relative">
                  <p className="font-black text-lg leading-tight">{stage.label}</p>
                  <p className="text-sm text-white/80 mt-1">{meta.hint}</p>
                  {count > 0 ? (
                    <span className="inline-block mt-2 text-[11px] font-bold bg-black/20 rounded-full px-3 py-0.5">
                      {count} streams
                    </span>
                  ) : (
                    <span className="inline-block mt-2 text-[11px] font-bold bg-white/20 rounded-full px-3 py-0.5">
                      Coming Soon
                    </span>
                  )}
                </div>
                <svg
                  width="20" height="20" fill="none" viewBox="0 0 24 24"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round"
                  className="opacity-60 flex-shrink-0"
                >
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </Link>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
