'use client';
import { useState, useCallback } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Compute difficulty/cost/speed badges from course data
function computeBadges(course) {
  const text = (course.name + ' ' + (course.exam || '') + ' ' + (course.desc || '') + ' ' +
    (course.specs || []).map((s) => s.n).join(' ')).toLowerCase();

  let entry = 'Easy–moderate entry';
  if (text.includes('jee advanced') || text.includes('neet') || text.includes('clat') || text.includes('nata') || text.includes('nda')) {
    entry = 'Highly competitive';
  } else if (text.includes('jee') || text.includes('bitsat') || text.includes('gate') || text.includes('cet')) {
    entry = 'Competitive entry';
  }

  let cost = 'Low–medium cost';
  if (text.includes('mbbs') || text.includes('architecture') || text.includes('design') || text.includes('nid') || text.includes('nift')) {
    cost = 'Varies: low govt / high private';
  } else if (text.includes('b.tech') || text.includes('btech') || text.includes('law') || text.includes('llb')) {
    cost = 'Medium cost';
  }

  let speed = 'Medium — 3–4 years';
  if (text.includes('iti') || text.includes('polytechnic') || text.includes('1–2 year') || text.includes('diploma')) {
    speed = 'Fast — job-ready 1–3 yrs';
  } else if (text.includes('mbbs') || text.includes('5.5') || text.includes('5 year') || text.includes('architecture')) {
    speed = 'Long-term — 5+ years';
  }

  return { entry, cost, speed };
}

const BADGE_COLORS = {
  'Highly competitive': 'bg-red-50 text-red-700 border-red-200',
  'Competitive entry': 'bg-amber-50 text-amber-700 border-amber-200',
  'Easy–moderate entry': 'bg-green-50 text-green-700 border-green-200',
  'Fast — job-ready 1–3 yrs': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Long-term — 5+ years': 'bg-blue-50 text-blue-700 border-blue-200',
  'Medium — 3–4 years': 'bg-slate-50 text-slate-600 border-slate-200',
  'Varies: low govt / high private': 'bg-purple-50 text-purple-700 border-purple-200',
  'Medium cost': 'bg-slate-50 text-slate-600 border-slate-200',
  'Low–medium cost': 'bg-green-50 text-green-700 border-green-200',
};

function SpecItem({ spec, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-indigo-200' : 'border-slate-200'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left bg-white active:bg-slate-50 transition-colors"
      >
        <span className="w-2 h-2 rounded-full flex-shrink-0 opacity-80" style={{ backgroundColor: accent }} />
        <span className="flex-1 text-sm font-bold text-slate-700 leading-tight">{spec.n}</span>
        <span className="text-xs font-bold text-emerald-600 mr-2 flex-shrink-0">{spec.s}</span>
        <span className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-90' : ''}`}>›</span>
      </button>
      {open && (
        <div className="bg-slate-50 border-t border-slate-200 px-3 py-2.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Career Paths</p>
          <div className="flex flex-wrap gap-1.5">
            {spec.careers.map((career) => (
              <span key={career} className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-2 py-1 rounded-lg">
                {career}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SaveButton({ course, streamKey, streamName }) {
  const [status, setStatus] = useState('idle'); // idle | saving | saved | error | login
  const supabase = createBrowserClient();
  const router = useRouter();

  const handleSave = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setStatus('login');
      setTimeout(() => router.push('/auth/login?next=/saved'), 900);
      return;
    }

    setStatus('saving');
    try {
      const pathText = `${streamName} → ${course.name} → Choose branch → Career / Higher studies`;
      const res = await fetch('/api/paths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stream_key: streamKey, stream_name: streamName, course_name: course.name, path_text: pathText }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('saved');
      } else if (res.status === 401) {
        setStatus('login');
        setTimeout(() => router.push('/auth/login?next=/saved'), 900);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }, [course, streamKey, streamName, supabase, router]);

  const labels = { idle: '🔖 Save this path', saving: 'Saving…', saved: '✓ Saved to your list', error: 'Try again', login: 'Login to save →' };
  const styles = { idle: 'bg-slate-800 text-white', saving: 'bg-slate-400 text-white', saved: 'bg-emerald-600 text-white', error: 'bg-red-500 text-white', login: 'bg-indigo-600 text-white' };

  return (
    <button onClick={handleSave} disabled={status === 'saving'} className={`flex-1 text-xs font-black py-2.5 rounded-xl transition-colors active:opacity-80 ${styles[status]}`}>
      {labels[status]}
    </button>
  );
}

function CourseCard({ course, accentColor, accentDot, streamKey, streamName }) {
  const [open, setOpen] = useState(false);
  const badges = computeBadges(course);

  return (
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden border-2 transition-all ${open ? 'border-slate-200 shadow-md' : 'border-transparent'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-4 text-left active:bg-slate-50 transition-colors">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: accentColor || '#f1f5f9' }}>
          {course.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm text-slate-800 leading-tight">{course.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">⏱ {course.dur} &nbsp;·&nbsp; 💰 {course.salary}</p>
        </div>
        <span className={`text-slate-300 text-2xl transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-90' : ''}`}>›</span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-4 pb-4 space-y-4">
          <p className="text-sm text-slate-500 leading-relaxed pt-3">{course.desc}</p>

          {/* Smart Badges */}
          <div className="flex flex-wrap gap-1.5">
            {Object.values(badges).map((val) => (
              <span key={val} className={`text-[10px] font-black border rounded-full px-2.5 py-1 ${BADGE_COLORS[val] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                {val}
              </span>
            ))}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-2">
            <InfoBox label="Duration" value={course.dur} />
            <InfoBox label="Salary range" value={course.salary} green />
            <div className="col-span-2"><InfoBox label="Entrance Exam" value={course.exam} /></div>
            <div className="col-span-2"><InfoBox label="Top Colleges" value={course.colleges} /></div>
          </div>

          {/* Save action */}
          <div className="flex gap-2">
            <SaveButton course={course} streamKey={streamKey} streamName={streamName} />
          </div>

          {/* Specializations */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">🎯 Specializations / Options</p>
            <div className="space-y-1.5">
              {course.specs.map((spec) => (
                <SpecItem key={spec.n} spec={spec} accent={accentDot || '#475569'} />
              ))}
            </div>
          </div>

          {/* PG Options */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">🎓 Postgraduate / Future Options</p>
            <div className="flex flex-wrap gap-1.5">
              {course.pg.map((pg) => (
                <span key={pg} className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1.5 rounded-lg">{pg}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBox({ label, value, green }) {
  return (
    <div className="bg-slate-50 rounded-xl p-2.5">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-xs font-bold leading-snug ${green ? 'text-emerald-600' : 'text-slate-700'}`}>{value}</p>
    </div>
  );
}

export default function CourseList({ courses, accentColor, accentText, accentDot, streamKey, streamName }) {
  return (
    <div className="space-y-3">
      {courses.map((course) => (
        <CourseCard key={course.name} course={course} accentColor={accentColor} accentText={accentText} accentDot={accentDot} streamKey={streamKey || 'unknown'} streamName={streamName || 'Stream'} />
      ))}
    </div>
  );
}
