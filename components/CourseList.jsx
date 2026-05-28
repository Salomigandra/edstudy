'use client';
import { useState, useCallback } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

// Simple path breadcrumb for a course
function SimplePath({ course, streamStage }) {
  const startClass = streamStage === '10th' ? 'Class 10' : 'Class 12';
  const examStep = course.exam ? course.exam.split('·')[0].trim().split('/')[0].trim() : 'Merit';
  const steps = [startClass, examStep, course.name, 'Choose branch', 'Job / Higher studies'];
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">📍 Your path</p>
      <div className="flex items-center gap-1 flex-wrap">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${i === 2 ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
              {step}
            </span>
            {i < steps.length - 1 && <span className="text-slate-300 text-xs">›</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Salary stages display
function SalaryStages({ stages }) {
  if (!stages || stages.length < 3) return null;
  const labels = ['🌱 Start', '📈 Grow', '🏆 Lead'];
  const colors = ['text-slate-600', 'text-amber-700', 'text-emerald-700'];
  const bgs = ['bg-slate-50', 'bg-amber-50', 'bg-emerald-50'];
  const borders = ['border-slate-200', 'border-amber-200', 'border-emerald-200'];
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">💰 Salary by experience</p>
      <div className="grid grid-cols-3 gap-1.5">
        {stages.map((s, i) => (
          <div key={i} className={`${bgs[i]} border ${borders[i]} rounded-xl p-2 text-center`}>
            <p className="text-[9px] font-bold text-slate-400 mb-0.5">{labels[i]}</p>
            <p className={`text-[11px] font-black ${colors[i]} leading-tight`}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Share with parent modal
function ShareModal({ course, streamName, onClose }) {
  const [copied, setCopied] = useState(false);
  const text = `Hi! I'm considering ${course.name} (${streamName} stream). Duration: ${course.dur}. Starting salary: ${course.salaryStages ? course.salaryStages[0] : course.salary}. Entrance exam: ${course.exam.split('·')[0].trim()}. Colleges: ${course.colleges}. What do you think?`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${course.name} - Education Path`, text });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-t-3xl p-5 pb-8" onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
        <h3 className="font-black text-slate-800 text-base mb-1">📤 Share with parent / guardian</h3>
        <p className="text-xs text-slate-400 mb-4">Send a quick summary of this course for their review</p>
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 leading-relaxed mb-4 border border-slate-200">
          {text}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 bg-green-500 text-white font-black text-sm py-3 rounded-2xl"
          >
            📱 Send on WhatsApp
          </button>
          <button
            onClick={handleShare}
            className="flex-1 bg-slate-800 text-white font-black text-sm py-3 rounded-2xl"
          >
            {copied ? '✓ Copied!' : '📋 Copy text'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Save branch button inside SpecItem
function SaveBranchButton({ course, spec, streamKey, streamName }) {
  const [status, setStatus] = useState('idle');
  const router = useRouter();

  const handleSave = useCallback(async (e) => {
    e.stopPropagation();
    const supabase = createBrowserClient();
    if (!supabase) { router.push('/auth/login?next=/saved'); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setStatus('login');
      setTimeout(() => router.push('/auth/login?next=/saved'), 900);
      return;
    }
    setStatus('saving');
    try {
      const pathText = `${streamName} → ${course.name} → ${spec.n} → Career`;
      const res = await fetch('/api/paths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stream_key: streamKey, stream_name: streamName, course_name: course.name, branch_name: spec.n, path_text: pathText }),
      });
      const data = await res.json();
      if (data.success) setStatus('saved');
      else if (res.status === 401) { setStatus('login'); setTimeout(() => router.push('/auth/login?next=/saved'), 900); }
      else { setStatus('error'); setTimeout(() => setStatus('idle'), 2000); }
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 2000); }
  }, [course, spec, streamKey, streamName, router]);

  const styles = {
    idle: 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50',
    saving: 'text-slate-400',
    saved: 'text-emerald-600 bg-emerald-50',
    error: 'text-red-500',
    login: 'text-indigo-600',
  };
  const labels = { idle: '🔖', saving: '…', saved: '✓', error: '!', login: '🔐' };

  return (
    <button
      onClick={handleSave}
      disabled={status === 'saving'}
      title={status === 'saved' ? 'Saved!' : 'Save this branch'}
      className={`text-xs font-black px-2 py-1 rounded-lg transition-colors flex-shrink-0 ${styles[status]}`}
    >
      {labels[status]}
    </button>
  );
}

function SpecItem({ spec, accent, course, streamKey, streamName, quickMode }) {
  const [open, setOpen] = useState(false);
  if (quickMode) {
    return (
      <div className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
        <span className="flex-1 text-xs font-semibold text-slate-700">{spec.n}</span>
        <span className="text-xs font-bold text-emerald-600">{spec.s}</span>
      </div>
    );
  }
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-indigo-200' : 'border-slate-200'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left bg-white active:bg-slate-50 transition-colors"
      >
        <span className="w-2 h-2 rounded-full flex-shrink-0 opacity-80" style={{ backgroundColor: accent }} />
        <span className="flex-1 text-sm font-bold text-slate-700 leading-tight">{spec.n}</span>
        <span className="text-xs font-bold text-emerald-600 mr-1 flex-shrink-0">{spec.s}</span>
        <SaveBranchButton course={course} spec={spec} streamKey={streamKey} streamName={streamName} />
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
  const [status, setStatus] = useState('idle');
  const router = useRouter();

  const handleSave = useCallback(async () => {
    const supabase = createBrowserClient();
    if (!supabase) { router.push('/auth/login?next=/saved'); return; }
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
      if (data.success) setStatus('saved');
      else if (res.status === 401) { setStatus('login'); setTimeout(() => router.push('/auth/login?next=/saved'), 900); }
      else { setStatus('error'); setTimeout(() => setStatus('idle'), 2000); }
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 2000); }
  }, [course, streamKey, streamName, router]);

  const labels = { idle: '🔖 Save this path', saving: 'Saving…', saved: '✓ Saved to your list', error: 'Try again', login: 'Login to save →' };
  const styles = { idle: 'bg-slate-800 text-white', saving: 'bg-slate-400 text-white', saved: 'bg-emerald-600 text-white', error: 'bg-red-500 text-white', login: 'bg-indigo-600 text-white' };

  return (
    <button onClick={handleSave} disabled={status === 'saving'} className={`flex-1 text-xs font-black py-2.5 rounded-xl transition-colors active:opacity-80 ${styles[status]}`}>
      {labels[status]}
    </button>
  );
}

function CourseCard({ course, accentColor, accentText, accentDot, streamKey, streamName, streamStage, quickMode }) {
  const [open, setOpen] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const badges = computeBadges(course);

  if (quickMode) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
        <div className="flex items-center gap-3 p-3.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: accentColor || '#f1f5f9' }}>
            {course.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm text-slate-800 leading-tight">{course.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">⏱ {course.dur}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-black text-emerald-600">{course.salaryStages ? course.salaryStages[0] : course.salary}</p>
            <p className="text-[9px] text-slate-400">starting</p>
          </div>
        </div>
        <div className="px-3.5 pb-3 border-t border-slate-50">
          <p className="text-[10px] text-slate-400 mt-2 mb-1">📋 Exam: {course.exam.split('·')[0].trim()}</p>
          <div className="flex flex-wrap gap-1">
            {course.specs.slice(0, 3).map(sp => (
              <span key={sp.n} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg">{sp.n}</span>
            ))}
            {course.specs.length > 3 && (
              <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg">+{course.specs.length - 3} more</span>
            )}
          </div>
          <Link href={`/stream/${streamKey}`} className="block text-center text-[10px] font-bold text-indigo-600 mt-2 py-1">
            Tap for full details →
          </Link>
        </div>
      </div>
    );
  }

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
          {/* Description */}
          <p className="text-sm text-slate-500 leading-relaxed pt-3">{course.desc}</p>

          {/* May fit section */}
          {course.fit && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">✨ May fit you if you...</p>
              <p className="text-xs text-indigo-800 font-semibold leading-snug">{course.fit}</p>
            </div>
          )}

          {/* Smart Badges */}
          <div className="flex flex-wrap gap-1.5">
            {Object.values(badges).map((val) => (
              <span key={val} className={`text-[10px] font-black border rounded-full px-2.5 py-1 ${BADGE_COLORS[val] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                {val}
              </span>
            ))}
          </div>

          {/* Salary Stages */}
          {course.salaryStages && <SalaryStages stages={course.salaryStages} />}

          {/* Simple Path */}
          <SimplePath course={course} streamStage={streamStage} />

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-2">
            <InfoBox label="Duration" value={course.dur} />
            <InfoBox label="Salary range" value={course.salary} green />
            <div className="col-span-2"><InfoBox label="Entrance Exam" value={course.exam} /></div>
            <div className="col-span-2"><InfoBox label="Top Colleges" value={course.colleges} /></div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <SaveButton course={course} streamKey={streamKey} streamName={streamName} />
            <button
              onClick={() => setShowShare(true)}
              className="px-4 text-xs font-black py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 active:bg-slate-50 transition-colors"
            >
              📤 Share
            </button>
          </div>

          {/* Compare suggestions */}
          {course.compare && course.compare.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">⚖️ Compare with</p>
              <div className="flex flex-wrap gap-1.5">
                {course.compare.map((c) => (
                  <span key={c} className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Specializations */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">🎯 Specializations / Options</p>
            <div className="space-y-1.5">
              {course.specs.map((spec) => (
                <SpecItem key={spec.n} spec={spec} accent={accentDot || '#475569'} course={course} streamKey={streamKey} streamName={streamName} />
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

      {showShare && <ShareModal course={course} streamName={streamName} onClose={() => setShowShare(false)} />}
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

export default function CourseList({ courses, accentColor, accentText, accentDot, streamKey, streamName, streamStage, quickMode }) {
  return (
    <div className="space-y-3">
      {courses.map((course) => (
        <CourseCard
          key={course.name}
          course={course}
          accentColor={accentColor}
          accentText={accentText}
          accentDot={accentDot}
          streamKey={streamKey || 'unknown'}
          streamName={streamName || 'Stream'}
          streamStage={streamStage}
          quickMode={quickMode}
        />
      ))}
    </div>
  );
}
