import { createCachedClient } from '@/lib/supabaseServer';

export const revalidate = 3600;
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ComparePicker from '@/components/ComparePicker';
import Link from 'next/link';
import { getPathSupplementary } from '@/data/pathSupplementary';

export const metadata = {
  title: 'Compare Courses — Pathsy',
  description: 'Pick any two courses and see them side by side — entry, skills, careers, and who each one is right for.',
};

const PRESET_PAIRS = [
  { a: 'science-b-tech-be', b: 'science-bca-b-sc-cs', label: 'B.Tech vs BCA / B.Sc CS', icon: '💻' },
  { a: 'science-b-tech-be', b: 'science-b-sc-science', label: 'B.Tech vs B.Sc Science', icon: '🔬' },
  { a: 'science-mbbs-medical', b: 'science-allied-health-sciences', label: 'MBBS vs Allied Health', icon: '🏥' },
  { a: 'commerce-bba-bms', b: 'commerce-hotel-tourism-hospitality', label: 'BBA vs Hotel Management', icon: '🏨' },
  { a: 'commerce-bba-bms', b: 'commerce-b-com-b-com-hons', label: 'BBA vs B.Com', icon: '💰' },
  { a: 'commerce-ca-cma-cs', b: 'commerce-b-com-b-com-hons', label: 'CA/CMA vs B.Com', icon: '📊' },
  { a: 'arts-ba-honours', b: 'arts-ba-llb-law', label: 'BA Hons vs BA LLB', icon: '⚖️' },
  { a: 'arts-bsw-social-work', b: 'arts-ba-psychology', label: 'Social Work vs Psychology', icon: '🤝' },
  { a: 'arts-journalism-mass-communication', b: 'arts-ba-honours', label: 'Journalism vs BA Honours', icon: '📰' },
  { a: 'arts-ba-psychology', b: 'science-mbbs-medical', label: 'BA Psychology vs MBBS', icon: '🧠' },
];

const DIRECTION_LABEL = {
  growing: { label: 'Growing', color: '#16a34a', bg: '#f0fdf4' },
  stable: { label: 'Stable', color: '#0284c7', bg: '#f0f9ff' },
  shifting: { label: 'Shifting', color: '#d97706', bg: '#fffbeb' },
};

async function fetchCourse(supabase, slug) {
  const { data } = await supabase
    .from('courses')
    .select(`
      id, slug, name, icon, duration, description, fit_for, pg_options, colleges,
      streams!inner(id, slug, name, color, color_light),
      salary_ranges(id, label, range_text, sort_order),
      specializations(id, name, sort_order, career_roles(id, name, sort_order)),
      course_entrance_exams(is_mandatory, entrance_exams(id, name, full_name, level))
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  return data;
}

function getTopCareers(course) {
  const specs = (course.specializations ?? []).sort((a, b) => a.sort_order - b.sort_order);
  const careers = [];
  for (const spec of specs.slice(0, 3)) {
    const roles = (spec.career_roles ?? []).sort((a, b) => a.sort_order - b.sort_order);
    careers.push(...roles.slice(0, 2).map(r => r.name));
    if (careers.length >= 5) break;
  }
  return careers.slice(0, 5);
}

function getFirstExam(course) {
  const exams = (course.course_entrance_exams ?? []).map(ce => ({
    ...ce.entrance_exams, is_mandatory: ce.is_mandatory,
  }));
  return exams.find(e => e.is_mandatory) ?? exams[0] ?? null;
}

function CompareRow({ label, icon, aContent, bContent, aColor }) {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <div className="px-4 pt-3 pb-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <span>{icon}</span>{label}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-0">
        <div className="px-4 pb-3 pr-2 border-r border-slate-100" style={{ borderLeftColor: aColor, borderLeftWidth: 3 }}>
          {aContent}
        </div>
        <div className="px-4 pb-3 pl-3">
          {bContent}
        </div>
      </div>
    </div>
  );
}

function SkillChips({ skills }) {
  if (!skills?.length) return <p className="text-xs text-slate-400 italic">Not available</p>;
  return (
    <div className="flex flex-wrap gap-1">
      {skills.slice(0, 4).map((s, i) => (
        <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-lg px-2 py-0.5">
          {s.transferable ? '🔁' : '🎯'} {s.name}
        </span>
      ))}
    </div>
  );
}

export default async function ComparePage({ searchParams }) {
  const slugA = searchParams?.a;
  const slugB = searchParams?.b;

  const supabase = createCachedClient();

  let courseA = null;
  let courseB = null;

  if (slugA && slugB) {
    [courseA, courseB] = await Promise.all([
      fetchCourse(supabase, slugA),
      fetchCourse(supabase, slugB),
    ]);
  }

  const suppA = slugA ? getPathSupplementary(slugA) : null;
  const suppB = slugB ? getPathSupplementary(slugB) : null;

  const streamA = courseA ? (Array.isArray(courseA.streams) ? courseA.streams[0] : courseA.streams) : null;
  const streamB = courseB ? (Array.isArray(courseB.streams) ? courseB.streams[0] : courseB.streams) : null;

  const colorA = streamA?.color ?? '#7c3aed';
  const colorB = streamB?.color ?? '#0284c7';

  const examA = courseA ? getFirstExam(courseA) : null;
  const examB = courseB ? getFirstExam(courseB) : null;

  const careersA = courseA ? getTopCareers(courseA) : [];
  const careersB = courseB ? getTopCareers(courseB) : [];

  const salA = courseA ? (courseA.salary_ranges ?? []).sort((a, b) => a.sort_order - b.sort_order) : [];
  const salB = courseB ? (courseB.salary_ranges ?? []).sort((a, b) => a.sort_order - b.sort_order) : [];

  const dirA = suppA ? DIRECTION_LABEL[suppA.marketDirection] : null;
  const dirB = suppB ? DIRECTION_LABEL[suppB.marketDirection] : null;

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
      <Header backHref="/" title="⚖️ Compare Courses" subtitle="See what each path actually means" />

      <main className="flex-1 px-4 lg:px-8 pt-5 pb-28 lg:pb-10 space-y-5 lg:max-w-3xl lg:mx-auto lg:w-full">

        {/* ── Pick your own ── */}
        <ComparePicker initialA={slugA} initialB={slugB} />

        {/* ── Comparison result ── */}
        {courseA && courseB ? (
          <div className="space-y-5">

            {/* Course headers */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { course: courseA, stream: streamA, color: colorA },
                { course: courseB, stream: streamB, color: colorB },
              ].map(({ course, stream, color }, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 text-white shadow-md"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}
                >
                  <p className="text-3xl mb-2">{course.icon}</p>
                  <p className="font-black text-sm leading-tight">{course.name}</p>
                  <p className="text-[11px] text-white/80 mt-1">{stream?.name}</p>
                  {course.duration && (
                    <p className="text-[11px] text-white/80 mt-0.5">⏱ {course.duration}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Main comparison card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Column header labels */}
              <div className="grid grid-cols-2 border-b border-slate-100">
                <div className="px-4 py-2.5 border-r border-slate-100" style={{ borderTopColor: colorA, borderTopWidth: 3 }}>
                  <p className="text-xs font-black truncate" style={{ color: colorA }}>{courseA.name}</p>
                </div>
                <div className="px-4 py-2.5" style={{ borderTopColor: colorB, borderTopWidth: 3 }}>
                  <p className="text-xs font-black truncate" style={{ color: colorB }}>{courseB.name}</p>
                </div>
              </div>

              <CompareRow
                label="Duration" icon="⏱" aColor={colorA}
                aContent={<p className="text-sm font-bold text-slate-800">{courseA.duration ?? '—'}</p>}
                bContent={<p className="text-sm font-bold text-slate-800">{courseB.duration ?? '—'}</p>}
              />

              <CompareRow
                label="How to get in" icon="📝" aColor={colorA}
                aContent={
                  examA
                    ? <div>
                        <p className="text-xs font-bold text-slate-800">{examA.name}</p>
                        {examA.is_mandatory && <span className="text-[10px] font-bold text-rose-600">Mandatory</span>}
                      </div>
                    : <p className="text-xs text-slate-500">Merit / direct admission</p>
                }
                bContent={
                  examB
                    ? <div>
                        <p className="text-xs font-bold text-slate-800">{examB.name}</p>
                        {examB.is_mandatory && <span className="text-[10px] font-bold text-rose-600">Mandatory</span>}
                      </div>
                    : <p className="text-xs text-slate-500">Merit / direct admission</p>
                }
              />

              <CompareRow
                label="Market demand" icon="📈" aColor={colorA}
                aContent={
                  dirA
                    ? <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: dirA.color, background: dirA.bg }}>
                        {dirA.label}
                      </span>
                    : <p className="text-xs text-slate-400">—</p>
                }
                bContent={
                  dirB
                    ? <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: dirB.color, background: dirB.bg }}>
                        {dirB.label}
                      </span>
                    : <p className="text-xs text-slate-400">—</p>
                }
              />

              <CompareRow
                label="Skills you build" icon="🔁" aColor={colorA}
                aContent={<SkillChips skills={suppA?.skills} />}
                bContent={<SkillChips skills={suppB?.skills} />}
              />

              {(salA.length > 0 || salB.length > 0) && (
                <CompareRow
                  label="Starting salary" icon="💰" aColor={colorA}
                  aContent={
                    salA[0]
                      ? <p className="text-xs font-bold text-emerald-700">{salA[0].range_text}</p>
                      : <p className="text-xs text-slate-400">Varies</p>
                  }
                  bContent={
                    salB[0]
                      ? <p className="text-xs font-bold text-emerald-700">{salB[0].range_text}</p>
                      : <p className="text-xs text-slate-400">Varies</p>
                  }
                />
              )}

              <CompareRow
                label="Top career roles" icon="💼" aColor={colorA}
                aContent={
                  <div className="flex flex-col gap-0.5">
                    {careersA.slice(0, 3).map((c, i) => (
                      <p key={i} className="text-[11px] text-slate-700 leading-snug">• {c}</p>
                    ))}
                  </div>
                }
                bContent={
                  <div className="flex flex-col gap-0.5">
                    {careersB.slice(0, 3).map((c, i) => (
                      <p key={i} className="text-[11px] text-slate-700 leading-snug">• {c}</p>
                    ))}
                  </div>
                }
              />

              {(courseA.pg_options?.length > 0 || courseB.pg_options?.length > 0) && (
                <CompareRow
                  label="After graduation" icon="🎓" aColor={colorA}
                  aContent={
                    <div className="flex flex-col gap-0.5">
                      {(courseA.pg_options ?? []).slice(0, 3).map((p, i) => (
                        <p key={i} className="text-[11px] text-slate-600 leading-snug">• {p}</p>
                      ))}
                    </div>
                  }
                  bContent={
                    <div className="flex flex-col gap-0.5">
                      {(courseB.pg_options ?? []).slice(0, 3).map((p, i) => (
                        <p key={i} className="text-[11px] text-slate-600 leading-snug">• {p}</p>
                      ))}
                    </div>
                  }
                />
              )}
            </div>

            {/* Right for you if */}
            {(courseA.fit_for || courseB.fit_for) && (
              <section>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Right For You If...</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { course: courseA, color: colorA },
                    { course: courseB, color: colorB },
                  ].map(({ course, color }, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-3 border"
                      style={{ background: `${color}12`, borderColor: `${color}40` }}
                    >
                      <p className="text-[11px] font-black mb-1.5 leading-tight" style={{ color }}>{course.name}</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{course.fit_for ?? '—'}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Honest note */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-2.5">
              <span className="text-base flex-shrink-0">⚠️</span>
              <p className="text-xs text-amber-800 leading-relaxed">
                No comparison can decide for you. The right course depends on your interests, budget, exam readiness, and what you want your daily life to look like. Use this as a starting point — not a final answer.
              </p>
            </div>

            {/* Deep dive links */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { course: courseA, color: colorA, slug: slugA },
                { course: courseB, color: colorB, slug: slugB },
              ].map(({ course, color, slug }, i) => (
                <Link
                  key={i}
                  href={`/path/${slug}`}
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black text-white shadow-sm text-center leading-tight"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
                >
                  {course.icon} Full {course.name} details →
                </Link>
              ))}
            </div>
          </div>

        ) : (
          /* ── Preset pairs landing ── */
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Common Comparisons</p>
            <div className="space-y-2">
              {PRESET_PAIRS.map((pair) => (
                <Link
                  key={`${pair.a}-${pair.b}`}
                  href={`/compare?a=${pair.a}&b=${pair.b}`}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-slate-100 shadow-sm hover:border-brand-200 transition-all"
                >
                  <span className="text-xl">{pair.icon}</span>
                  <p className="text-sm font-bold text-slate-800 flex-1">{pair.label}</p>
                  <span className="text-slate-300 text-sm">›</span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      <BottomNav />
    </div>
  );
}
