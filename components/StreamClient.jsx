'use client';
import { useState } from 'react';
import Link from 'next/link';

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
        <svg
          width="16" height="16" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className="text-slate-300 flex-shrink-0 mt-0.5"
        >
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

export default function StreamClient({ stream, courses, stageSlug }) {
  const [quickMode, setQuickMode] = useState(false);

  const accentColor = stream.color_bg ?? '#f3efff';
  const streamGradient =
    stream.color && stream.color_light
      ? `linear-gradient(135deg, ${stream.color}, ${stream.color_light})`
      : 'linear-gradient(135deg, #6c2ee8, #9468ff)';

  return (
    <main className="flex-1 px-4 lg:px-8 pt-4 pb-28 lg:pb-10 space-y-4 lg:max-w-3xl lg:mx-auto lg:w-full">
      {/* Stream banner */}
      <div className="rounded-2xl p-4 text-white" style={{ background: streamGradient }}>
        <p className="text-3xl mb-1">{stream.icon ?? '📚'}</p>
        <p className="font-black text-xl">{stream.name}</p>
        {stream.alt_name && (
          <p className="text-sm text-white/80 mt-0.5">{stream.alt_name}</p>
        )}
        <p className="text-sm text-white/70 mt-1">
          {courses.length} course{courses.length !== 1 ? 's' : ''} available
        </p>
        {stageSlug === 'after_10th' && (
          <span className="inline-block mt-2 text-xs font-bold bg-white/20 rounded-full px-3 py-1">
            ✅ Starts directly after Class 10
          </span>
        )}
        {stageSlug === 'after_12th' && (
          <span className="inline-block mt-2 text-xs font-bold bg-white/20 rounded-full px-3 py-1">
            🎓 Apply after completing Class 12
          </span>
        )}
      </div>

      {/* Path flow */}
      <PathFlowBar stream={stream} stageSlug={stageSlug} />

      {/* Quick / Deep toggle */}
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
    </main>
  );
}
