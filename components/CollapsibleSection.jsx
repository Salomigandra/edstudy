'use client';
import { useState } from 'react';

export default function CollapsibleSection({ icon, title, subtitle, children, accentClass = 'bg-slate-50 border-slate-200', iconBg = 'bg-slate-100' }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 rounded-2xl border px-4 py-4 transition-colors text-left ${accentClass} ${open ? 'rounded-b-none border-b-0' : ''}`}
      >
        <span className={`text-2xl flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl ${iconBg}`}>
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm text-slate-800 leading-tight">{title}</p>
          {subtitle && <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{subtitle}</p>}
        </div>
        <svg
          width="18" height="18" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className={`border rounded-2xl rounded-t-none px-4 pt-3 pb-4 space-y-3 ${accentClass}`}>
          {children}
        </div>
      )}
    </section>
  );
}
