'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';
import Logo from '@/components/Logo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || document.getElementById('recaptcha-script')) return;
    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const getRecaptchaToken = useCallback(async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || typeof window === 'undefined' || !window.grecaptcha) return null;
    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action: 'login' });
          resolve(token);
        } catch { resolve(null); }
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await getRecaptchaToken();
      if (token) {
        const captchaRes = await fetch('/api/captcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const captchaData = await captchaRes.json();
        if (!captchaData.success) {
          setError(captchaData.error || 'Security check failed. Please try again.');
          setLoading(false);
          return;
        }
      }
      const supabase = createBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (signInError) {
        setError(signInError.message === 'Invalid login credentials'
          ? 'Wrong email or password. Please try again.'
          : signInError.message);
      } else {
        router.push(next);
        router.refresh();
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError('Enter your email address above first, then click Forgot password.');
      return;
    }
    setLoading(true);
    const supabase = createBrowserClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setResetSent(true);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — desktop only ─────────────────────────────────── */}
      <div className="hidden lg:flex w-[480px] flex-shrink-0 bg-gradient-to-br from-brand-800 to-brand-500 flex-col justify-between px-14 py-14">
        <Link href="/">
          <Logo size={52} variant="dark" />
        </Link>

        <div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Find your path.<br />Shape your future.
          </h1>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            India's education path explorer for Class 10, 12, and beyond.
          </p>

          <div className="space-y-3">
            {[
              { icon: '🎓', text: 'Explore 100+ courses and streams' },
              { icon: '🧭', text: 'Take the quiz to find your best fit' },
              { icon: '🔖', text: 'Save favourites and share with parents' },
              { icon: '⚖️', text: 'Compare paths side by side' },
            ].map(({ icon, text, comingSoon }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg flex-shrink-0">
                  {icon}
                </span>
                <span className="text-white/90 text-sm font-medium">
                  {text}
                  {comingSoon && (
                    <span className="ml-2 text-[10px] font-black bg-white/20 text-white/70 rounded-full px-2 py-0.5 uppercase tracking-wide">Coming Soon</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs">© 2026 Pathsy · hello@pathsy.org</p>
      </div>

      {/* ── Right panel — form ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center bg-white px-6 py-10 lg:px-16">
        <div className="w-full max-w-sm mx-auto">

          {/* Mobile: back + logo */}
          <div className="lg:hidden mb-8 flex flex-col gap-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-600 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </Link>
            <Logo size={34} />
          </div>

          {/* Desktop: back link */}
          <Link
            href="/"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-600 transition-colors mb-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </Link>

          <h2 className="text-2xl font-black text-brand-950 mb-1">Welcome back</h2>
          <p className="text-sm text-slate-400 mb-7">Log in to view and manage your saved paths.</p>

          {resetSent && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">
              Password reset email sent! Check your inbox.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Email address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                placeholder="arjun@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Password <span className="text-red-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="current-password"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-14 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors px-1"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gradient disabled:opacity-60 text-white font-black text-sm py-3.5 rounded-2xl active:opacity-80 hover:opacity-90 transition-opacity mt-1"
            >
              {loading ? 'Logging in…' : 'Log in →'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            No account yet?{' '}
            <Link href="/auth/register" className="text-brand-600 font-bold hover:text-brand-700 transition-colors">
              Create one free
            </Link>
          </p>
          <p className="text-center text-xs text-slate-300 mt-3">
            Protected by reCAPTCHA.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginForm />
    </Suspense>
  );
}
