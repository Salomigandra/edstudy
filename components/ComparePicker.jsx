'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';

export default function ComparePicker({ initialA, initialB }) {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [a, setA] = useState(initialA ?? '');
  const [b, setB] = useState(initialB ?? '');
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const refA = useRef(null);
  const refB = useRef(null);

  useEffect(() => {
    const supabase = createBrowserClient();
    supabase
      .from('courses')
      .select('slug, name, icon, streams(name, color)')
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => {
        if (data) setCourses(data.map(c => ({
          ...c,
          streamName: Array.isArray(c.streams) ? c.streams[0]?.name : c.streams?.name,
          streamColor: Array.isArray(c.streams) ? c.streams[0]?.color : c.streams?.color,
        })));
      });
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (refA.current && !refA.current.contains(e.target)) setOpenA(false);
      if (refB.current && !refB.current.contains(e.target)) setOpenB(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredA = courses.filter(c =>
    c.slug !== b && c.name.toLowerCase().includes(searchA.toLowerCase())
  );
  const filteredB = courses.filter(c =>
    c.slug !== a && c.name.toLowerCase().includes(searchB.toLowerCase())
  );

  const courseA = courses.find(c => c.slug === a);
  const courseB = courses.find(c => c.slug === b);

  function handleCompare() {
    if (a && b) router.push(`/compare?a=${a}&b=${b}`);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pick Any Two Courses</p>

      <div className="grid grid-cols-2 gap-3">
        {/* Picker A */}
        <div ref={refA} className="relative">
          <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1.5">Course A</p>
          <button
            onClick={() => { setOpenA(!openA); setOpenB(false); }}
            className="w-full text-left bg-brand-50 border border-brand-200 rounded-xl px-3 py-2.5 flex items-center gap-2 min-h-[44px]"
          >
            {courseA ? (
              <>
                <span>{courseA.icon}</span>
                <span className="text-xs font-bold text-slate-800 leading-tight line-clamp-2">{courseA.name}</span>
              </>
            ) : (
              <span className="text-xs text-slate-400">Select...</span>
            )}
          </button>
          {openA && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="p-2 border-b border-slate-100">
                <input
                  autoFocus
                  className="w-full text-xs px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-400"
                  placeholder="Search..."
                  value={searchA}
                  onChange={e => setSearchA(e.target.value)}
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredA.map(c => (
                  <button
                    key={c.slug}
                    onClick={() => { setA(c.slug); setOpenA(false); setSearchA(''); }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-base">{c.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{c.name}</p>
                      {c.streamName && <p className="text-[10px] text-slate-400">{c.streamName}</p>}
                    </div>
                  </button>
                ))}
                {filteredA.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-3">No matches</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Picker B */}
        <div ref={refB} className="relative">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Course B</p>
          <button
            onClick={() => { setOpenB(!openB); setOpenA(false); }}
            className="w-full text-left bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 flex items-center gap-2 min-h-[44px]"
          >
            {courseB ? (
              <>
                <span>{courseB.icon}</span>
                <span className="text-xs font-bold text-slate-800 leading-tight line-clamp-2">{courseB.name}</span>
              </>
            ) : (
              <span className="text-xs text-slate-400">Select...</span>
            )}
          </button>
          {openB && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="p-2 border-b border-slate-100">
                <input
                  autoFocus
                  className="w-full text-xs px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-400"
                  placeholder="Search..."
                  value={searchB}
                  onChange={e => setSearchB(e.target.value)}
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredB.map(c => (
                  <button
                    key={c.slug}
                    onClick={() => { setB(c.slug); setOpenB(false); setSearchB(''); }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-base">{c.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{c.name}</p>
                      {c.streamName && <p className="text-[10px] text-slate-400">{c.streamName}</p>}
                    </div>
                  </button>
                ))}
                {filteredB.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-3">No matches</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleCompare}
        disabled={!a || !b}
        className="w-full py-3 rounded-xl font-black text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: a && b ? 'linear-gradient(135deg, #6c2ee8, #9468ff)' : undefined, color: a && b ? 'white' : '#94a3b8', backgroundColor: a && b ? undefined : '#f1f5f9' }}
      >
        {a && b ? '⚖️ Compare These Courses' : 'Select both courses to compare'}
      </button>
    </div>
  );
}
