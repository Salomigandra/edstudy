'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';

const SYNONYMS = {
  doctor: ['mbbs', 'medicine', 'bds', 'nursing', 'bams', 'ayush', 'physiotherapy', 'bpt'],
  computer: ['software', 'programming', 'coding', 'bca', 'cs', 'data science', 'ai', 'cybersecurity'],
  army: ['nda', 'defence', 'military', 'cds', 'afcat'],
  finance: ['ca', 'accounting', 'bcom', 'money', 'banking', 'cma', 'cs'],
  design: ['nid', 'nift', 'architecture', 'fashion', 'ux'],
  teacher: ['b.ed', 'education', 'ctet', 'teaching', 'ba bed', 'bsc bed', 'integrated teaching'],
  law: ['clat', 'llb', 'nlu', 'legal', 'lawyer', 'ba llb', 'bba llb', 'bcom llb', 'integrated law'],
  pilot: ['aviation', 'flying', 'airline', 'aeronautics'],
  nursing: ['bsc nursing', 'gnm', 'anm', 'healthcare nurse'],
  pharmacy: ['pharma', 'bpharm', 'pharmd', 'drug', 'pharmaceutical', 'gpat'],
  engineering: ['btech', 'be', 'jee', 'mechanical', 'electrical', 'civil', 'cse'],
  biology: ['bipc', 'pcb', 'life science', 'bsc biology', 'botany', 'zoology', 'microbiology'],
  business: ['bba', 'mba', 'bbm', 'bms', 'management', 'entrepreneurship', 'integrated mba'],
  psychology: ['counselling', 'mental health', 'ba psychology', 'clinical psychology'],
  media: ['journalism', 'mass communication', 'media studies', 'advertising', 'pr'],
  hotel: ['hospitality', 'tourism', 'hotel management', 'nchmct', 'catering'],
  dental: ['bds', 'dentist', 'oral health', 'dental surgery'],
  ayurveda: ['bams', 'ayush', 'homeopathy', 'bhms', 'unani', 'naturopathy'],
};

const POPULAR = [
  { label: 'Doctor / MBBS', q: 'doctor' },
  { label: 'Software / BCA', q: 'computer' },
  { label: 'CA / Finance', q: 'finance' },
  { label: 'Law / CLAT', q: 'law' },
  { label: 'Pharmacy', q: 'pharmacy' },
  { label: 'Army / NDA', q: 'army' },
  { label: 'Teacher / B.Ed', q: 'teacher' },
  { label: 'Design / NIFT', q: 'design' },
  { label: 'Business / MBA', q: 'business' },
  { label: 'Nursing', q: 'nursing' },
];

async function searchDB(raw) {
  const q = raw.trim();
  if (q.length < 2) return [];

  const supabase = createBrowserClient();
  const extra = SYNONYMS[q.toLowerCase()] ?? [];

  // Full-text search (uses GIN index on search_vector)
  const ftPromise = supabase
    .from('courses')
    .select('id, slug, name, icon, duration, salary_range, fit_for, streams(name, icon, color, slug)')
    .textSearch('search_vector', q, { type: 'websearch', config: 'english' })
    .eq('is_active', true)
    .limit(15);

  // Trigram / ilike fallback for partial name matches
  const ilikePromise = supabase
    .from('courses')
    .select('id, slug, name, icon, duration, salary_range, fit_for, streams(name, icon, color, slug)')
    .ilike('name', `%${q}%`)
    .eq('is_active', true)
    .limit(10);

  const [{ data: ftData }, { data: ilikeData }] = await Promise.all([ftPromise, ilikePromise]);

  const seen = new Set((ftData ?? []).map((r) => r.id));
  const merged = [
    ...(ftData ?? []),
    ...(ilikeData ?? []).filter((r) => !seen.has(r.id)),
  ];
  return merged;
}

export default function SearchClient({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const data = await searchDB(query);
      setResults(data);
      setLoading(false);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const hasQuery = query.trim().length >= 2;

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="doctor, software, CA, army, design…"
          className="w-full bg-white border-2 border-slate-200 focus:border-brand-400 rounded-2xl pl-10 pr-10 py-3 text-sm outline-none transition-colors shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl leading-none"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Popular chips (when no query) */}
      {!hasQuery && (
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map(({ label, q }) => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full active:bg-brand-50 active:border-brand-200 transition-colors shadow-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4">
            <p className="text-[11px] font-black text-brand-700 uppercase tracking-widest mb-2">
              Tip: use everyday words
            </p>
            <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-xs text-brand-800">
              <span>• "doctor" → MBBS, BDS</span>
              <span>• "computer" → BCA, B.Tech CS</span>
              <span>• "money" → CA, B.Com</span>
              <span>• "army" → NDA, CDS</span>
              <span>• "drawing" → Design, NIFT</span>
              <span>• "teacher" → B.Ed, CTET</span>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {hasQuery && loading && (
        <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
          <div className="w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
          Searching…
        </div>
      )}

      {/* Results */}
      {hasQuery && !loading && (
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-black text-slate-700">No results found</p>
              <p className="text-sm text-slate-400 mt-1 mb-4">Try a simpler or different word</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['doctor', 'software', 'army', 'CA', 'design', 'law'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="bg-white border border-slate-200 text-brand-600 text-xs font-bold px-3 py-1.5 rounded-full"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((course) => {
                const stream = Array.isArray(course.streams) ? course.streams[0] : course.streams;
                return (
                  <Link
                    key={course.id}
                    href={`/path/${course.slug}`}
                    className="block bg-white rounded-2xl p-4 shadow-sm border border-slate-100 active:bg-slate-50 transition-colors overflow-hidden relative"
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                      style={{ background: stream?.color ?? '#6c2ee8' }}
                    />
                    <div className="flex items-start gap-3 pl-2">
                      <span className="text-2xl flex-shrink-0">{course.icon ?? '📚'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-slate-900 leading-tight">{course.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          {stream && (
                            <span className="text-[11px] text-slate-500">
                              {stream.icon} {stream.name}
                            </span>
                          )}
                          {course.duration && (
                            <span className="text-[11px] text-slate-400">· {course.duration}</span>
                          )}
                        </div>
                        {course.salary_range && (
                          <span className="text-[11px] font-bold text-emerald-600 mt-0.5 block">
                            {course.salary_range}
                          </span>
                        )}
                        {course.fit_for && (
                          <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                            {course.fit_for}
                          </p>
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
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
