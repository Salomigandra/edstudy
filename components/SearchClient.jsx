'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { searchAll } from '@/data/pathways';

export default function SearchClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('q') || '');
  const results = query.trim().length >= 2 ? searchAll(query) : [];

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses, careers, exams…"
          className="w-full bg-white border-2 border-slate-200 focus:border-indigo-400 rounded-2xl pl-10 pr-4 py-3 text-sm outline-none transition-colors"
        />
      </div>

      {/* Quick Suggestions */}
      {!query && (
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {['JEE', 'NEET', 'CA', 'BBA', 'CLAT', 'MBA', 'NDA', 'B.Com', 'Software Engineer', 'Doctor', 'IAS', 'Special Education'].map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="bg-white border border-slate-200 text-slate-600 text-sm font-semibold px-3 py-1.5 rounded-xl active:bg-slate-100 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query.trim().length >= 2 && (
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold">No results found</p>
              <p className="text-sm mt-1">Try: B.Tech, MBBS, CA, BBA, Law, NEET, JEE</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {results.map(({ stream, course }, i) => (
                <Link
                  key={i}
                  href={`/stream/${stream.id}`}
                  className="block bg-white rounded-2xl p-4 shadow-sm border-l-4 active:bg-slate-50 transition-colors"
                  style={{ borderLeftColor: 'rgb(99 102 241)' }}
                >
                  <p className="font-black text-sm text-slate-800">
                    {course.icon} {course.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {stream.icon} {stream.name} &nbsp;·&nbsp; {course.dur} &nbsp;·&nbsp; {course.salary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded-lg">
                      {course.exam.split('·')[0].trim()}
                    </span>
                    {course.specs
                      .filter((sp) =>
                        sp.n.toLowerCase().includes(query.toLowerCase()) ||
                        sp.careers.some((c) => c.toLowerCase().includes(query.toLowerCase()))
                      )
                      .slice(0, 2)
                      .map((sp) => (
                        <span key={sp.n} className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2 py-0.5 rounded-lg">
                          {sp.n}
                        </span>
                      ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
