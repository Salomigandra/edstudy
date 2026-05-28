'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';

const STAGES = [
  { value: '10th', label: 'Just passed Class 10' },
  { value: '12th', label: 'Just passed / in Class 12' },
  { value: 'graduate', label: 'Graduated / in college' },
  { value: 'other', label: 'Other' },
];

export default function ProfileClient({ userId, email, initialProfile, savedCount }) {
  const [profile, setProfile] = useState({
    full_name: initialProfile.full_name ?? '',
    phone: initialProfile.phone ?? '',
    class_stage: initialProfile.class_stage ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    const supabase = createBrowserClient();
    const { error: err } = await supabase
      .from('profiles')
      .update({ full_name: profile.full_name, phone: profile.phone, class_stage: profile.class_stage, updated_at: new Date().toISOString() })
      .eq('id', userId);
    setSaving(false);
    if (err) {
      setError('Could not save. Please try again.');
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const handleSignOut = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const initials = (profile.full_name || email || 'U')[0].toUpperCase();

  return (
    <div className="space-y-5">
      {/* Avatar + email */}
      <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center text-white font-black text-xl flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-slate-900 text-base truncate">
            {profile.full_name || 'Student'}
          </p>
          <p className="text-xs text-slate-500 truncate mt-0.5">{email}</p>
          <p className="text-[11px] text-brand-600 font-bold mt-1">
            {savedCount} saved path{savedCount !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/saved"
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center"
          aria-label="View saved paths"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c2ee8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </Link>
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Edit profile</p>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Full name</label>
          <input
            type="text"
            value={profile.full_name}
            onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))}
            placeholder="Your name"
            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-400 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone (optional)</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
            placeholder="+91 9XXXXXXXXX"
            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-400 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Current stage</label>
          <div className="grid grid-cols-2 gap-2">
            {STAGES.map((s) => (
              <button
                key={s.value}
                onClick={() => setProfile((p) => ({ ...p, class_stage: s.value }))}
                className={`text-xs font-bold rounded-xl px-3 py-2.5 text-left transition-colors border ${
                  profile.class_stage === s.value
                    ? 'bg-brand-50 border-brand-300 text-brand-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full py-3 rounded-xl font-black text-sm transition-all ${
            saved
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-brand-gradient text-white active:opacity-80'
          } disabled:opacity-50`}
        >
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save changes'}
        </button>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
        <Link href="/saved" className="flex items-center gap-3 px-4 py-3.5 active:bg-slate-50 transition-colors">
          <span className="text-lg">🔖</span>
          <p className="text-sm font-bold text-slate-700 flex-1">Saved Paths</p>
          <span className="text-xs font-bold text-brand-600 bg-brand-50 rounded-full px-2 py-0.5">{savedCount}</span>
        </Link>
        <Link href="/quiz" className="flex items-center gap-3 px-4 py-3.5 active:bg-slate-50 transition-colors">
          <span className="text-lg">🧭</span>
          <p className="text-sm font-bold text-slate-700 flex-1">Take the Quiz</p>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-slate-300">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </Link>
        <Link href="/legal/terms" className="flex items-center gap-3 px-4 py-3.5 active:bg-slate-50 transition-colors">
          <span className="text-lg">📄</span>
          <p className="text-sm font-bold text-slate-700 flex-1">Terms & Privacy</p>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-slate-300">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </Link>
      </div>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        className="w-full py-3 rounded-xl border border-rose-200 text-rose-600 font-black text-sm active:bg-rose-50 transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}
