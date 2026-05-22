'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SavedPathsClient({ initialPaths, userId, userEmail }) {
  const [paths, setPaths] = useState(initialPaths);
  const [deleting, setDeleting] = useState(null);
  const [shareMsg, setShareMsg] = useState('');

  const deletePath = async (id) => {
    setDeleting(id);
    try {
      await fetch(`/api/paths?id=${id}`, { method: 'DELETE' });
      setPaths((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('Could not delete. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const sharePath = (path) => {
    const text = `Education path I'm exploring:\n\n${path.path_text}\n\nStream: ${path.stream_name}\nCourse: ${path.course_name}${path.branch_name ? '\nBranch: ' + path.branch_name : ''}\n\nExplore more at edstudy.org`;

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
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🔖</div>
        <p className="font-black text-slate-800 text-lg mb-2">No saved paths yet</p>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Open any course and tap <strong>Save this path</strong> to add it here.
        </p>
        <Link
          href="/"
          className="inline-block bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-2xl"
        >
          Explore courses →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {paths.length} saved path{paths.length !== 1 ? 's' : ''}
      </p>

      {paths.map((path) => (
        <div key={path.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">🔖</span>
            <div className="flex-1">
              <p className="font-black text-slate-800 text-sm leading-tight">{path.course_name}</p>
              {path.branch_name && (
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">{path.branch_name}</p>
              )}
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{path.path_text}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 rounded-full px-2.5 py-1">
              {path.stream_name}
            </span>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 rounded-full px-2.5 py-1">
              Saved {new Date(path.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          {path.notes && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-2 mb-3 text-xs text-amber-700">
              {path.notes}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => sharePath(path)}
              className="flex-1 text-xs font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-xl py-2 active:bg-indigo-100 transition-colors"
            >
              {shareMsg === path.id ? '✓ Copied!' : '📤 Share with parent'}
            </button>
            <button
              onClick={() => deletePath(path.id)}
              disabled={deleting === path.id}
              className="text-xs font-bold text-red-500 border border-red-200 bg-red-50 rounded-xl px-3 py-2 active:bg-red-100 transition-colors disabled:opacity-50"
            >
              {deleting === path.id ? '…' : 'Remove'}
            </button>
          </div>
        </div>
      ))}

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="font-bold text-slate-700 text-sm mb-1">💡 Next steps</p>
        <ul className="text-xs text-slate-500 space-y-1 leading-relaxed">
          <li>1. Compare your saved options with the Compare tab</li>
          <li>2. Research entrance exams for your top choices</li>
          <li>3. Share with parents using the button above</li>
          <li>4. Visit college websites to check cut-offs and fees</li>
        </ul>
      </div>
    </div>
  );
}
