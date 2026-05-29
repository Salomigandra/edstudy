'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  {
    href: '/',
    label: 'Home',
    match: (p) => p === '/',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    href: '/explore',
    label: 'Explore',
    match: (p) => p.startsWith('/explore') || p.startsWith('/stream'),
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={active ? 'currentColor' : 'none'}/>
      </svg>
    ),
  },
  {
    href: '/compare',
    label: 'Compare',
    match: (p) => p.startsWith('/compare'),
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="9" height="18" rx="2" fill={active ? 'currentColor' : 'none'}/>
        <rect x="13" y="3" width="9" height="18" rx="2" fill={active ? 'currentColor' : 'none'}/>
      </svg>
    ),
  },
  {
    href: '/saved',
    label: 'Saved',
    match: (p) => p.startsWith('/saved'),
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    href: '/profile',
    label: 'Profile',
    match: (p) => p.startsWith('/profile'),
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-brand-100 flex z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 flex flex-col items-center pt-2 pb-2.5 gap-1 transition-colors ${
              active ? 'text-brand-600' : 'text-slate-400'
            }`}
          >
            <span className={`p-1 rounded-xl transition-colors ${active ? 'bg-brand-50' : ''}`}>
              {tab.icon(active)}
            </span>
            <span className={`text-[10px] font-bold tracking-wide ${active ? 'text-brand-600' : 'text-slate-400'}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
