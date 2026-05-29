'use client';
import { useState } from 'react';
import Link from 'next/link';
import { streamContent } from '@/data/streamContent';

function PathFlowBar({ stream, stageSlug }) {
  const stageLabel = stageSlug === 'after_10th' ? 'Class 10' : 'Class 12';
  const steps = [stageLabel, stream.name, 'Choose course', 'Pick branch', 'Career'];
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-1 flex-shrink-0">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap ${
              i === 2
                ? 'bg-brand-100 text-brand-700 border border-brand-200'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && <span className="text-slate-300 text-xs">›</span>}
        </div>
      ))}
    </div>
  );
}

function CourseCard({ course, accentColor, quickMode }) {
  return (
    <Link
      href={`/path/${course.slug}`}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden active:scale-[0.98] transition-transform block"
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: accentColor ?? '#f3efff' }}
        >
          {course.icon ?? '📚'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm text-slate-900 leading-tight">{course.name}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
            {course.duration && (
              <span className="text-[11px] text-slate-500 font-medium">⏱ {course.duration}</span>
            )}
            {course.salary_range && (
              <span className="text-[11px] text-emerald-600 font-bold">{course.salary_range}</span>
            )}
          </div>
        </div>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-slate-300 flex-shrink-0 mt-0.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
      {!quickMode && (
        <>
          {course.description && (
            <p className="text-xs text-slate-500 px-4 pb-3 leading-relaxed line-clamp-2">
              {course.description}
            </p>
          )}
          {course.exam_text && (
            <div className="mx-4 mb-3 flex items-start gap-2 bg-slate-50 rounded-xl px-3 py-2">
              <span className="text-xs">📝</span>
              <p className="text-[11px] text-slate-600 leading-snug">{course.exam_text}</p>
            </div>
          )}
        </>
      )}
    </Link>
  );
}

// ── After-10th connected path card ──────────────────────────────────────────
function After12PathCard({ path, streamColor }) {
  return (
    <Link
      href={path.slug ? `/path/${path.slug}` : '#'}
      className="bg-white rounded-xl border border-slate-100 shadow-sm px-3 py-3 flex items-start gap-3 active:scale-[0.98] transition-transform"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
        style={{ background: streamColor ? `${streamColor}22` : '#f3efff' }}
      >
        {path.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-black text-sm text-slate-800 leading-tight">{path.label}</p>
        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{path.desc}</p>
      </div>
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-slate-300 flex-shrink-0 mt-1">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </Link>
  );
}

// ── Rich After-10th stream detail ────────────────────────────────────────────
function After10thDetail({ stream, courses, accentColor, streamGradient }) {
  const content = streamContent[stream.slug];
  const [showSubjects, setShowSubjects] = useState(false);

  if (!content) {
    // Fallback for streams without rich content
    return (
      <div className="space-y-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} accentColor={accentColor} quickMode={false} />
        ))}
      </div>
    );
  }

  const streamColor = stream.color ?? '#7c3aed';

  return (
    <div className="space-y-5">

      {/* What is this stream */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">What is {stream.name}?</p>
        <p className="text-sm text-slate-700 leading-relaxed">{content.what}</p>
        {content.tagline && (
          <span
            className="inline-block mt-3 text-[11px] font-bold rounded-full px-3 py-1"
            style={{ background: `${streamColor}18`, color: streamColor }}
          >
            {content.tagline}
          </span>
        )}
      </section>

      {/* Who it's for / not for */}
      <section className="space-y-2">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-start gap-2.5">
          <span className="text-base flex-shrink-0 mt-0.5">✅</span>
          <div>
            <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Good fit if…</p>
            <p className="text-xs text-emerald-900 leading-relaxed">{content.whoFor}</p>
          </div>
        </div>
        {content.notFor && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-base flex-shrink-0 mt-0.5">⚠️</span>
            <div>
              <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">Think carefully if…</p>
              <p className="text-xs text-amber-900 leading-relaxed">{content.notFor}</p>
            </div>
          </div>
        )}
      </section>

      {/* Subjects */}
      {content.subjects?.length > 0 && (
        <section>
          <button
            onClick={() => setShowSubjects(!showSubjects)}
            className="w-full flex items-center justify-between bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3"
          >
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Subjects You'll Study</p>
            <span className={`text-slate-400 text-sm transition-transform duration-200 ${showSubjects ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {showSubjects && (
            <div className="mt-1 bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 space-y-2">
              {content.subjects.map((s) => (
                <div key={s.name} className="flex items-start gap-2.5">
                  <span className="text-xs flex-shrink-0 mt-0.5">📘</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{s.name}</p>
                    <p className="text-[11px] text-slate-500 leading-snug">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Entrance exams */}
      {content.entranceExams?.length > 0 && (
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Key Entrance Exams</p>
          <div className="space-y-1.5">
            {content.entranceExams.map((e) => (
              <div key={e.name} className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-2.5 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-slate-800">{e.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{e.note}</p>
                </div>
                <span className="text-[10px] font-bold bg-brand-50 text-brand-700 rounded-full px-2 py-0.5 flex-shrink-0 whitespace-nowrap">{e.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ITI/Poly trade courses from DB */}
      {courses.length > 0 && (
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Courses / Trades Available</p>
          <div className="space-y-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} accentColor={accentColor} quickMode={false} />
            ))}
          </div>
        </section>
      )}

      {/* After 12th connected paths */}
      {content.after12Paths?.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-slate-200" />
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Where this leads →</p>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <p className="text-xs text-slate-500 mb-3 leading-snug">After completing Class 12 with {stream.name}, you can apply for these degree programmes:</p>
          <div className="space-y-2">
            {content.after12Paths.map((path) => (
              <After12PathCard key={path.label} path={path} streamColor={stream.color} />
            ))}
          </div>
        </section>
      )}

      {/* Extra paths (BAMS, BHMS, etc. — no slug) */}
      {content.extraPaths?.length > 0 && (
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Also Consider</p>
          <div className="grid grid-cols-2 gap-2">
            {content.extraPaths.map((path) => (
              <div key={path.label} className="bg-white rounded-xl border border-slate-100 shadow-sm px-3 py-3">
                <span className="text-xl">{path.icon}</span>
                <p className="font-black text-xs text-slate-800 mt-1 leading-tight">{path.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{path.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Career highlights */}
      {content.careerHighlights?.length > 0 && (
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Possible Careers</p>
          <div className="flex flex-wrap gap-2">
            {content.careerHighlights.map((c) => (
              <span key={c} className="text-[11px] font-bold bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700">
                {c}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Govt job paths */}
      {content.govtJobPaths?.length > 0 && (
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">🏛️ Government Job Paths</p>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 space-y-1.5">
            {content.govtJobPaths.map((g) => (
              <div key={g} className="flex items-start gap-2">
                <span className="text-blue-400 font-bold text-xs flex-shrink-0 mt-0.5">›</span>
                <p className="text-xs text-blue-900 leading-snug">{g}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Things to consider */}
      {content.considerations?.length > 0 && (
        <section>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Things to Know First</p>
          <div className="space-y-2">
            {content.considerations.map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 flex items-start gap-2.5">
                <span className="text-base flex-shrink-0 mt-0.5">💡</span>
                <p className="text-xs text-slate-700 leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function StreamClient({ stream, courses, stageSlug }) {
  const [quickMode, setQuickMode] = useState(false);
  const isAfter10th = stageSlug === 'after_10th';

  const accentColor = stream.color_bg ?? '#f3efff';
  const streamGradient =
    stream.color && stream.color_light
      ? `linear-gradient(135deg, ${stream.color}, ${stream.color_light})`
      : 'linear-gradient(135deg, #6c2ee8, #9468ff)';

  const content = streamContent[stream.slug];

  return (
    <main className="flex-1 px-4 lg:px-8 pt-4 pb-28 lg:pb-10 space-y-4 lg:max-w-3xl lg:mx-auto lg:w-full">
      {/* Stream banner */}
      <div className="rounded-2xl p-4 text-white" style={{ background: streamGradient }}>
        <p className="text-3xl mb-1">{stream.icon ?? '📚'}</p>
        <p className="font-black text-xl">{stream.name}</p>
        {content?.fullName && content.fullName !== stream.name && (
          <p className="text-sm text-white/80 mt-0.5">{content.fullName}</p>
        )}
        {!content?.fullName && stream.alt_name && (
          <p className="text-sm text-white/80 mt-0.5">{stream.alt_name}</p>
        )}
        {isAfter10th && (
          <span className="inline-block mt-2 text-xs font-bold bg-white/20 rounded-full px-3 py-1">
            ✅ Starts directly after Class 10
          </span>
        )}
        {!isAfter10th && (
          <span className="inline-block mt-2 text-xs font-bold bg-white/20 rounded-full px-3 py-1">
            🎓 Apply after completing Class 12
          </span>
        )}
      </div>

      {/* Path flow */}
      <PathFlowBar stream={stream} stageSlug={stageSlug} />

      {/* After-10th: rich content */}
      {isAfter10th ? (
        <After10thDetail
          stream={stream}
          courses={courses}
          accentColor={accentColor}
          streamGradient={streamGradient}
        />
      ) : (
        <>
          {/* After-12th: existing course list with toggle */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              {courses.length} Courses
            </p>
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setQuickMode(true)}
                className={`text-xs font-black px-3 py-1.5 rounded-lg transition-colors ${
                  quickMode ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'
                }`}
              >
                ⚡ Quick
              </button>
              <button
                onClick={() => setQuickMode(false)}
                className={`text-xs font-black px-3 py-1.5 rounded-lg transition-colors ${
                  !quickMode ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'
                }`}
              >
                📖 Full
              </button>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-black text-slate-700">No courses yet</p>
              <p className="text-sm text-slate-400 mt-1">We're adding content for this stream soon.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  accentColor={accentColor}
                  quickMode={quickMode}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
