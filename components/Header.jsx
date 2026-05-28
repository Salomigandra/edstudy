'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import Logo from './Logo';

export default function Header({ backHref, title, subtitle }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const supabase = createBrowserClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createBrowserClient();
    if (supabase) await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-100 px-4 py-3 shadow-sm"
      style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}
    >
      <div className="flex items-center gap-3 max-w-3xl lg:max-w-none">

        {/* Left — back button OR full logo (top-level pages, mobile only) */}
        {backHref ? (
          <Link
            href={backHref}
            className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0 active:bg-brand-100 transition-colors"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </Link>
        ) : !title ? (
          /* Top-level pages, mobile only — full logo (badge + wordmark) once.
             Hidden on desktop — the sidebar already carries the logo. */
          <Link href="/" className="flex-shrink-0 lg:hidden" aria-label="Home">
            <Logo size={30} />
          </Link>
        ) : null}

        {/* Centre — title / subtitle (sub-pages) — empty on top-level pages */}
        <div className="flex-1 min-w-0">
          {title && (
            <>
              <h1 className="font-black text-sm text-brand-950 leading-tight truncate">{title}</h1>
              {subtitle && <p className="text-[11px] text-brand-400 mt-0.5 truncate">{subtitle}</p>}
            </>
          )}
        </div>

        {/* Right — search icon + avatar/login */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/search"
            className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 active:bg-brand-100 transition-colors"
            aria-label="Search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </Link>

          {user ? (
            <button
              onClick={handleSignOut}
              title={`${user.email} — click to sign out`}
              className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-black text-xs active:opacity-80 transition-opacity"
            >
              {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="h-9 px-3 rounded-xl bg-brand-gradient text-white font-bold text-xs flex items-center active:opacity-80 transition-opacity"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
