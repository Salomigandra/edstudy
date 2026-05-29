import { notFound } from 'next/navigation';
import { createCachedClient, createServerClient } from '@/lib/supabaseServer';

export const revalidate = 3600;
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PathRoadMap from '@/components/PathRoadMap';
import MythBusters from '@/components/MythBusters';
import SkillValueIndex from '@/components/SkillValueIndex';
import SaveButton from './SaveButton';
import Link from 'next/link';
import { getPathSupplementary } from '@/data/pathSupplementary';

export async function generateMetadata({ params }) {
  const supabase = createCachedClient();
  const { data: course } = await supabase
    .from('courses')
    .select('name, description')
    .eq('slug', params.slug)
    .single();
  if (!course) return {};
  return {
    title: course.name,
    description: course.description ?? `Everything about ${course.name} in India.`,
  };
}

function buildRoadMapNodes({ course, stream, exams, salaryRanges, specs }) {
  const firstExam = exams.find((e) => e.is_mandatory) ?? exams[0];
  const firstRole = specs?.[0]?.career_roles?.[0]?.name ?? 'Entry-Level Role';
  const fresherSalary = salaryRanges?.[0];
  const seniorSalary = salaryRanges?.[salaryRanges.length - 1];

  return [
    {
      label: stream?.name ?? 'Your Stream',
      sublabel: 'Class 12',
      detail: `You begin from the ${stream?.name ?? ''} stream. The subjects you study here directly connect to what you will specialise in during this degree.`,
      tags: stream?.name ? [stream.name] : [],
    },
    {
      label: firstExam ? firstExam.name : 'Entrance / Admission',
      sublabel: firstExam?.full_name && firstExam.full_name !== firstExam.name ? firstExam.full_name : (firstExam?.level ? `${firstExam.level} level` : 'Admission process'),
      detail: firstExam
        ? `${firstExam.full_name ?? firstExam.name} is the key entrance exam for this path. Clearing it opens the door to good colleges. Preparation typically starts in Class 11.`
        : 'Admission is based on Class 12 marks and/or entrance exams depending on the college.',
      tags: firstExam ? [firstExam.is_mandatory ? 'Mandatory' : 'Optional', firstExam.level ?? ''] : [],
    },
    {
      label: course.name,
      sublabel: course.duration ?? 'Degree programme',
      detail: `This is the core of the journey. ${course.description ?? ''} By the later years you will have a clear sense of which specialisation fits you best.`,
      tags: course.duration ? [course.duration] : [],
    },
    {
      label: firstRole,
      sublabel: fresherSalary ? `Starting: ${fresherSalary.range_text}` : 'First job',
      detail: `After graduating, most students enter as ${firstRole}. ${fresherSalary ? `Fresher salary typically ranges ${fresherSalary.range_text}.` : ''} Real growth comes through skills built on the job, not just the degree.`,
      tags: fresherSalary ? [fresherSalary.label, fresherSalary.range_text] : [],
    },
    {
      label: 'Growth & Mastery',
      sublabel: seniorSalary ? `${seniorSalary.label}: ${seniorSalary.range_text}` : '5–10 years in',
      detail: `With 5–10 years of experience and continuous skill-building, professionals in this field reach senior roles. ${seniorSalary ? `Experienced professionals earn ${seniorSalary.range_text}.` : ''} The ceiling is defined by your skills and initiative — not just your degree.`,
      tags: seniorSalary ? [seniorSalary.label, seniorSalary.range_text] : [],
    },
  ];
}

function SpecAccordionClient({ specs }) {
  // Server-rendered accordion — uses CSS peer/details trick, no JS needed
  return (
    <div className="space-y-2">
      {specs.map((spec) => (
        <details key={spec.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none select-none">
            <p className="font-black text-sm text-slate-800 leading-tight">{spec.name}</p>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              {spec.salary_range && (
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
                  {spec.salary_range}
                </span>
              )}
              <span className="text-slate-400 text-sm group-open:rotate-180 transition-transform duration-200 inline-block">▾</span>
            </div>
          </summary>
          {spec.career_roles?.length > 0 && (
            <div className="px-4 pb-3 pt-1 border-t border-slate-50 flex flex-wrap gap-1.5">
              {spec.career_roles.map((role) => (
                <span
                  key={role.id}
                  className="text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-100 rounded-lg px-2 py-1"
                >
                  {role.name}
                </span>
              ))}
            </div>
          )}
        </details>
      ))}
    </div>
  );
}

function QuickFacts({ duration, colleges, fitFor }) {
  const facts = [
    duration && { icon: '⏱', label: 'Duration', value: duration },
    colleges && { icon: '🏛', label: 'Top Colleges', value: colleges },
    fitFor && { icon: '✅', label: 'Best Fit For', value: fitFor },
  ].filter(Boolean);

  if (!facts.length) return null;

  return (
    <section>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Quick Facts</p>
      <div className="grid grid-cols-1 gap-2">
        {facts.map((f) => (
          <div key={f.label} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
            <span className="text-lg flex-shrink-0 mt-0.5">{f.icon}</span>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.label}</p>
              <p className="text-sm text-slate-700 mt-0.5 leading-snug">{f.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CollegeTypeGuide({ note }) {
  if (!note) return null;
  return (
    <section>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">How to Choose a College</p>
      <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-start gap-2.5">
        <span className="text-lg flex-shrink-0 mt-0.5">🏫</span>
        <p className="text-sm text-blue-900 leading-relaxed">{note}</p>
      </div>
    </section>
  );
}

export default async function PathDetailPage({ params }) {
  const supabase = createCachedClient();

  const { data: course } = await supabase
    .from('courses')
    .select(`
      id, slug, name, icon, duration, salary_range, exam_text,
      colleges, description, fit_for, compare_with, pg_options,
      streams!inner(id, slug, name, icon, color, color_light, stage_id),
      salary_ranges(id, label, range_text, sort_order),
      specializations(
        id, name, salary_range, sort_order,
        career_roles(id, name, sort_order)
      ),
      course_entrance_exams(
        is_mandatory,
        entrance_exams(id, name, full_name, level)
      )
    `)
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single();

  if (!course) notFound();

  const sortedSalaryRanges = (course.salary_ranges ?? []).sort((a, b) => a.sort_order - b.sort_order);
  const sortedSpecs = (course.specializations ?? [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((s) => ({
      ...s,
      career_roles: (s.career_roles ?? []).sort((a, b) => a.sort_order - b.sort_order),
    }));

  const stream = Array.isArray(course.streams) ? course.streams[0] : course.streams;
  const exams = (course.course_entrance_exams ?? []).map((ce) => ({
    ...ce.entrance_exams,
    is_mandatory: ce.is_mandatory,
  }));

  const streamColor = stream?.color ?? '#7c3aed';
  const streamGradient =
    stream?.color && stream?.color_light
      ? `linear-gradient(135deg, ${stream.color}, ${stream.color_light})`
      : 'linear-gradient(135deg, #6c2ee8, #9468ff)';

  const supplementary = getPathSupplementary(params.slug);

  const roadMapNodes = buildRoadMapNodes({
    course,
    stream,
    exams,
    salaryRanges: sortedSalaryRanges,
    specs: sortedSpecs,
  });

  let savedPathId = null;
  let userId = null;
  try {
    const serverClient = createServerClient();
    const { data: { user } } = await serverClient.auth.getUser();
    if (user) {
      userId = user.id;
      const { data: saved } = await serverClient
        .from('saved_paths')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .maybeSingle();
      savedPathId = saved?.id ?? null;
    }
  } catch {
    // Not authenticated — save button will prompt login
  }

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
      <Header
        backHref={`/stream/${stream?.slug ?? ''}`}
        title={`${course.icon ?? ''} ${course.name}`}
        subtitle={stream?.name ?? ''}
      />

      <main className="flex-1 px-4 lg:px-8 pt-5 pb-28 lg:pb-10 space-y-6 lg:max-w-3xl lg:mx-auto lg:w-full">

        {/* ── Hero card ── */}
        <div className="rounded-2xl p-5 text-white shadow-lg" style={{ background: streamGradient }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-5xl mb-3">{course.icon ?? '📚'}</p>
              <h1 className="font-black text-2xl leading-tight">{course.name}</h1>
              <p className="text-white/80 text-sm mt-1">{stream?.name ?? ''}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-white/80">
                {course.duration && <span>⏱ {course.duration}</span>}
              </div>
            </div>
            <SaveButton
              courseId={course.id}
              courseName={course.name}
              streamName={stream?.name}
              userId={userId}
              initialSavedId={savedPathId}
            />
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
          <span className="text-base mt-0.5">⚠️</span>
          <p className="text-[11px] text-amber-800 leading-snug">
            Career outcomes depend on college quality, skills, and effort — not just the degree name. Use this as a guide to explore, not a guarantee of any specific outcome.
          </p>
        </div>

        {/* ── Day in the life ── */}
        {supplementary.dayInLife && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">A Day in the Life</p>
            <div className="bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm flex items-start gap-2.5">
              <span className="text-lg flex-shrink-0 mt-0.5">🌅</span>
              <p className="text-sm text-slate-700 leading-relaxed">{supplementary.dayInLife}</p>
            </div>
          </section>
        )}

        {/* ── Road Map ── */}
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Your Journey</p>
          <div className="bg-white rounded-2xl px-4 py-4 border border-slate-100 shadow-sm">
            <PathRoadMap nodes={roadMapNodes} streamColor={streamColor} />
          </div>
        </section>

        {/* ── Skill Value Index ── */}
        <SkillValueIndex
          skills={supplementary.skills}
          marketDirection={supplementary.marketDirection}
          marketNote={supplementary.marketNote}
        />

        {/* ── Entrance Exams ── */}
        {exams.length > 0 && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Entrance Exams</p>
            <div className="space-y-2">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm"
                >
                  <div>
                    <p className="font-black text-sm text-slate-800">{exam.name}</p>
                    {exam.full_name && exam.full_name !== exam.name && (
                      <p className="text-[11px] text-slate-400 mt-0.5">{exam.full_name}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {exam.is_mandatory && (
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-700 rounded-full px-2 py-0.5">
                        Mandatory
                      </span>
                    )}
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 rounded-full px-2 py-0.5 capitalize">
                      {exam.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Specializations ── */}
        {sortedSpecs.length > 0 && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Specialisations & Careers
            </p>
            <SpecAccordionClient specs={sortedSpecs} />
          </section>
        )}

        {/* ── Myth Busters ── */}
        <MythBusters myths={supplementary.myths} />

        {/* ── College Type Guide ── */}
        <CollegeTypeGuide note={supplementary.collegeTypeNote} />

        {/* ── Quick Facts ── */}
        <QuickFacts
          duration={course.duration}
          colleges={course.colleges}
          fitFor={course.fit_for}
        />

        {/* ── Compare CTA ── */}
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Not Sure? Compare It</p>
          <Link
            href={`/compare?a=${params.slug}`}
            className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-brand-100 shadow-sm hover:border-brand-300 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: streamGradient }}>
              ⚖️
            </div>
            <div className="flex-1">
              <p className="font-black text-sm text-slate-800">Compare {course.name} with another course</p>
              <p className="text-xs text-slate-400 mt-0.5">Side-by-side: skills, entry, careers, fit</p>
            </div>
            <span className="text-brand-400 group-hover:translate-x-1 transition-transform">›</span>
          </Link>
        </section>

        {/* ── PG Options ── */}
        {course.pg_options?.length > 0 && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">After Graduation (PG)</p>
            <div className="space-y-2">
              {course.pg_options.map((pg) => (
                <div key={pg} className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
                  <span className="text-slate-400">🎓</span>
                  <p className="text-sm text-slate-700">{pg}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <BottomNav />
    </div>
  );
}
