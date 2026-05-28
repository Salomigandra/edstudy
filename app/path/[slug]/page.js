import { notFound } from 'next/navigation';
import { createPublicClient, createServerClient } from '@/lib/supabaseServer';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import SaveButton from './SaveButton';

export async function generateMetadata({ params }) {
  const supabase = createPublicClient();
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

function SalaryBadge({ label, range }) {
  return (
    <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 text-center min-w-[70px]">
      <p className="text-[10px] font-bold text-emerald-700 leading-tight">{label}</p>
      <p className="text-xs font-black text-emerald-800 mt-0.5 leading-tight">{range}</p>
    </div>
  );
}

function SpecCard({ spec }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
        <p className="font-black text-sm text-slate-800 leading-tight">{spec.name}</p>
        {spec.salary_range && (
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5 ml-2 flex-shrink-0">
            {spec.salary_range}
          </span>
        )}
      </div>
      {spec.career_roles?.length > 0 && (
        <div className="px-4 py-3 flex flex-wrap gap-1.5">
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
    </div>
  );
}

export default async function PathDetailPage({ params }) {
  const supabase = createPublicClient();

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

  const streamGradient =
    stream?.color && stream?.color_light
      ? `linear-gradient(135deg, ${stream.color}, ${stream.color_light})`
      : 'linear-gradient(135deg, #6c2ee8, #9468ff)';

  // Try to get auth session for save button
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

      <main className="flex-1 px-4 lg:px-8 pt-5 pb-28 lg:pb-10 space-y-5 lg:max-w-3xl lg:mx-auto lg:w-full">

        {/* ── Hero card ── */}
        <div className="rounded-2xl p-5 text-white shadow-lg" style={{ background: streamGradient }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-4xl mb-2">{course.icon ?? '📚'}</p>
              <h1 className="font-black text-xl leading-tight">{course.name}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-white/80">
                {course.duration && <span>⏱ {course.duration}</span>}
                {course.salary_range && <span className="font-bold text-white">💰 {course.salary_range}</span>}
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
            Salary figures are indicative averages. Actual pay varies by college, city, company, and performance. Use this as a guide, not a guarantee.
          </p>
        </div>

        {/* ── Description ── */}
        {course.description && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">About</p>
            <p className="text-sm text-slate-700 leading-relaxed">{course.description}</p>
          </section>
        )}

        {/* ── Salary stages ── */}
        {sortedSalaryRanges.length > 0 && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Salary Progression</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {sortedSalaryRanges.map((sr) => (
                <SalaryBadge key={sr.id} label={sr.label} range={sr.range_text} />
              ))}
            </div>
          </section>
        )}

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

        {/* ── Colleges ── */}
        {course.colleges && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Top Colleges</p>
            <div className="bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm">
              <p className="text-sm text-slate-700 leading-relaxed">{course.colleges}</p>
            </div>
          </section>
        )}

        {/* ── Who is it for ── */}
        {course.fit_for && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Best Fit For</p>
            <div className="bg-brand-50 border border-brand-100 rounded-2xl px-4 py-3">
              <p className="text-sm text-brand-800 leading-relaxed">✅ {course.fit_for}</p>
            </div>
          </section>
        )}

        {/* ── Specializations ── */}
        {sortedSpecs.length > 0 && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Specializations & Careers
            </p>
            <div className="space-y-3">
              {sortedSpecs.map((spec) => (
                <SpecCard key={spec.id} spec={spec} />
              ))}
            </div>
          </section>
        )}

        {/* ── Compare with ── */}
        {course.compare_with?.length > 0 && (
          <section>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Compare With</p>
            <div className="space-y-2">
              {course.compare_with.map((alt) => (
                <div key={alt} className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
                  <span className="text-slate-400">⚖️</span>
                  <p className="text-sm text-slate-700">{alt}</p>
                </div>
              ))}
            </div>
          </section>
        )}

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
