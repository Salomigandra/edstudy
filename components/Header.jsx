'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';

export default function Header({ backHref, title = 'India Education Pathways', subtitle }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const supabase = createBrowserClient();
    if (!supabase) return; // env vars not set yet — skip silently

    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createBrowserClient();
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 pb-3 shadow-sm" style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}>
      <div className="flex items-center gap-2.5">
        {backHref ? (
          <Link
            href={backHref}
            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold flex-shrink-0 active:bg-slate-200 transition-colors"
          >
            ←
          </Link>
        ) : (
          <Link href="/" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
            🎓
          </Link>
        )}

        <div className="flex-1 min-w-0">
          <h1 className="font-black text-sm text-slate-800 leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5 truncate">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Link
            href="/search"
            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center active:bg-slate-200 transition-colors"
            aria-label="Search"
          >
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </Link>

          {user ? (
            <button
              onClick={handleSignOut}
              title={`Logged in as ${user.email} — tap to log out`}
              className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white font-black text-xs active:bg-slate-700 transition-colors"
            >
              {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="h-9 px-3 rounded-xl bg-slate-800 text-white flex items-center font-bold text-xs active:bg-slate-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
