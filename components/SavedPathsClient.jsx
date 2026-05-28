'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';

export default function SavedPathsClient({ initialPaths, userId }) {
  const [paths, setPaths] = useState(initialPaths);
  const [deleting, setDeleting] = useState(null);
  const [shareMsg, setShareMsg] = useState('');

  const handleDelete = async (id) => {
    setDeleting(id);
    const supabase = createBrowserClient();
    await supabase.from('saved_paths').delete().eq('id', id);
    setPaths((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const handleShare = (path) => {
    const course = Array.isArray(path.courses) ? path.courses[0] : path.courses;
    const text = `Education path I'm exploring on Pathsy:\n\n📚 ${path.course_name}\n🎓 Stream: ${path.stream_name}\n💰 ${course?.salary_range ?? ''}\n\nFind yours at pathsy.org`;
    if (navigator.share) {
      navigator.share({ title: 'My Education Path', text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShareMsg(path.id);
      setTimeout(() => setShareMsg(''), 2000);
    }
  };

  if (paths.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🔖</div>
        <p className="font-black text-slate-800 text-lg mb-2">No saved paths yet</p>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-xs mx-auto">
          Open any course and tap the bookmark icon to save it here.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 bg-brand-gradient text-white font-bold text-sm px-6 py-3 rounded-2xl active:opacity-80 transition-opacity"
        >
          Explore courses →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
        {paths.length} saved path{paths.length !== 1 ? 's' : ''}
      </p>

      {paths.map((path) => {
        const course = Array.isArray(path.courses) ? path.courses[0] : path.courses;
        return (
          <div key={path.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <Link href={`/path/${course?.slug ?? ''}`} className="block p-4 active:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{course?.icon ?? '📚'}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-slate-900 leading-tight">{path.course_name}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                    {path.stream_name && (
                      <span className="text-[11px] text-brand-600 font-bold">{path.stream_name}</span>
                    )}
                    {course?.duration && (
                      <span className="text-[11px] text-slate-400">⏱ {course.duration}</span>
                    )}
                  </div>
                  {course?.salary_range && (
                    <p className="text-[11px] font-bold text-emerald-600 mt-0.5">{course.salary_range}</p>
                  )}
                </div>
                <svg
                  width="16" height="16" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  className="text-slate-300 flex-shrink-0 mt-0.5"
                >
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>

              {path.notes && (
                <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-xs text-amber-800 leading-snug">
                  📝 {path.notes}
                </div>
              )}

              <p className="text-[10px] text-slate-400 mt-2">
                Saved {new Date(path.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </Link>

            <div className="flex border-t border-slate-100">
              <button
                onClick={() => handleShare(path)}
                className="flex-1 text-xs font-bold text-brand-600 py-3 active:bg-brand-50 transition-colors"
              >
                {shareMsg === path.id ? '✓ Copied!' : '📤 Share'}
              </button>
              <div className="w-px bg-slate-100" />
              <button
                onClick={() => handleDelete(path.id)}
                disabled={deleting === path.id}
                className="flex-1 text-xs font-bold text-rose-500 py-3 active:bg-rose-50 transition-colors disabled:opacity-40"
              >
                {deleting === path.id ? '…' : '🗑 Remove'}
              </button>
            </div>
          </div>
        );
      })}

      <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4">
        <p className="font-black text-brand-800 text-sm mb-2">Next steps</p>
        <ul className="text-xs text-brand-700 space-y-1 leading-relaxed">
          <li>1. Open a saved path to see full details</li>
          <li>2. Research entrance exams for your top choices</li>
          <li>3. Share with your parents using the Share button</li>
        </ul>
      </div>
    </div>
  );
}
