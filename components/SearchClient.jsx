'use client';
import { useState } from 'react';
import Link from 'next/link';
import { searchAll, SEARCH_SYNONYMS } from '@/data/pathways';

const POPULAR = [
  { label: 'Doctor / MBBS', q: 'doctor' },
  { label: 'Software Engineer', q: 'software' },
  { label: 'CA / Finance', q: 'finance' },
  { label: 'Teacher / B.Ed', q: 'teacher' },
  { label: 'Army / NDA', q: 'army' },
  { label: 'Design / UX', q: 'design' },
  { label: 'Lawyer / CLAT', q: 'lawyer' },
  { label: 'Business / MBA', q: 'business' },
  { label: 'ITI / Skill', q: 'iti' },
  { label: 'Abroad jobs', q: 'abroad' },
  { label: 'IAS / UPSC', q: 'government' },
  { label: 'Pilot / Aviation', q: 'pilot' },
  { label: 'Nursing', q: 'nursing' },
  { label: 'Fashion / NIFT', q: 'fashion' },
  { label: 'Animation / Film', q: 'animation' },
];

function getSynonymHint(query) {
  const q = query.toLowerCase().trim();
  for (const [key, syns] of Object.entries(SEARCH_SYNONYMS)) {
    if (key === q) return syns.slice(0, 4).join(', ');
    if (syns.some(s => s.toLowerCase() === q)) return `including ${key} and related courses`;
  }
  return null;
}

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const results = query.trim().length >= 2 ? searchAll(query) : [];
  const synonymHint = query.trim().length >= 2 ? getSynonymHint(query) : null;

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
          placeholder="doctor, computer, CA, army, design, teacher…"
          className="w-full bg-white border-2 border-slate-200 focus:border-indigo-400 rounded-2xl pl-10 pr-10 py-3 text-sm outline-none transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Synonym hint */}
      {synonymHint && (
        <div className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2">
          <span className="text-xs">🔍</span>
          <p className="text-xs text-indigo-700">
            <strong>Smart search:</strong> also showing {synonymHint}
          </p>
        </div>
      )}

      {/* Quick Suggestions */}
      {!query && (
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Use simple words — we understand student language
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map(({ label, q }) => (
              <button
                key={q}
                onClick={() => setQuery(q)}
                className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-xl active:bg-slate-100 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">💡 Try searching with everyday words</p>
            <div className="grid grid-cols-2 gap-y-1 gap-x-3 text-xs text-slate-500">
              <span>• "doctor" → MBBS, BDS, nursing</span>
              <span>• "computer" → BCA, B.Tech CS</span>
              <span>• "money" → CA, B.Com, finance</span>
              <span>• "drawing" → design, NID, NIFT</span>
              <span>• "army" → NDA, CDS, AFCAT</span>
              <span>• "abroad" → nursing, welder</span>
              <span>• "teacher" → B.Ed, CTET, TET</span>
              <span>• "lawyer" → CLAT, LLB, NLU</span>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {query.trim().length >= 2 && (
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {results.length} match{results.length !== 1 ? 'es' : ''} for &ldquo;{query}&rdquo;
          </p>
          {results.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-slate-600">No results found</p>
              <p className="text-sm mt-1 mb-4">Try a simpler word:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['doctor', 'software', 'army', 'design', 'CA', 'teacher', 'law', 'abroad'].map((s) => (
                  <button key={s} onClick={() => setQuery(s)}
                    className="bg-white border border-slate-200 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-xl">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {results.map(({ stream, course }, i) => (
                <Link
                  key={i}
                  href={`/stream/${stream.id}`}
                  className="block bg-white rounded-2xl p-4 shadow-sm border-l-4 active:bg-slate-50 transition-colors"
                  style={{ borderLeftColor: stream.color || '#6366f1' }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">{course.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm text-slate-800 leading-tight">{course.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {stream.icon} {stream.name} &nbsp;·&nbsp; {course.dur}
                      </p>
                      {course.fit && (
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                          Fits: {course.fit}
                        </p>
                      )}
                    </div>
                    {course.salaryStages && (
                      <div className="flex-shrink-0 text-right ml-1">
                        <p className="text-[11px] font-black text-emerald-600 leading-tight">{course.salaryStages[0]}</p>
                        <p className="text-[9px] text-slate-400">starting</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-semibold px-2 py-0.5 rounded-lg">
                      📋 {course.exam.split('·')[0].trim()}
                    </span>
                    {course.specs
                      .filter((sp) =>
                        sp.n.toLowerCase().includes(query.toLowerCase()) ||
                        sp.careers.some((c) => c.toLowerCase().includes(query.toLowerCase()))
                      )
                      .slice(0, 2)
                      .map((sp) => (
                        <span key={sp.n} className="bg-indigo-50 text-indigo-600 text-[10px] font-semibold px-2 py-0.5 rounded-lg">
                          {sp.n}
                        </span>
                      ))}
                  </div>
                  <p className="text-[10px] text-indigo-500 font-bold mt-2">Open {stream.name} stream →</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
